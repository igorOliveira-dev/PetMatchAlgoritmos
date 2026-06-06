// =============================================
// ALGORITMO DE FILTRO DE ANIMAIS - PetMatch
// =============================================

// ---------------------------
// FUNÇÃO: Montar a URL de busca
// ---------------------------

function montarUrlDeBusca() {
  // Lê o valor de cada campo do formulário
  // Se o campo estiver vazio, o valor será ""
  const especie = document.getElementById("especie").value;
  const sexo = document.getElementById("sexo").value;
  const porte = document.getElementById("porte").value;
  const cidade = document.getElementById("cidade-filtro").value.trim();
  const idadeMin = document.getElementById("idade-min").value;
  const idadeMax = document.getElementById("idade-max").value;

  // Começa a lista de parâmetros com os obrigatórios
  const parametros = ["select=*", "order=nome.asc"];

  // Para cada filtro: só adiciona se o usuário preencheu
  // (campo vazio = não filtrar por esse campo)
  if (especie !== "") parametros.push("especie=eq." + especie);
  if (sexo !== "") parametros.push("sexo=eq." + sexo);
  if (porte !== "") parametros.push("porte=eq." + porte);
  if (cidade !== "") {
    parametros.push("cidade=ilike.*" + encodeURIComponent(cidade) + "*");
  }
  if (idadeMin !== "") parametros.push("idade=gte." + idadeMin); // gte = maior ou igual
  if (idadeMax !== "") parametros.push("idade=lte." + idadeMax); // lte = menor ou igual

  // Junta todos os parâmetros com "&" e retorna a URL final
  return "animais?" + parametros.join("&");
}

// ---------------------------
// FUNÇÃO: Exibir lista de animais na tela
// ---------------------------
// Recebe uma lista de animais e cria um card HTML para cada um

function exibirAnimaisNaTela(listaDeAnimais) {
  const elementoLista = document.getElementById("animals-list");

  if (listaDeAnimais.length === 0) {
    elementoLista.innerHTML = "Nenhum animal encontrado.";
    return;
  }

  elementoLista.innerHTML = "";

  listaDeAnimais.forEach((animal) => {
    const card = document.createElement("div");

    card.className = "animal-item";

    const idadeFormatada = animal.idade + (animal.idade === 1 ? " ano" : " anos");

    card.innerHTML = `
      <strong>${animal.nome}</strong>
      <span>
        ${animal.especie} • ${animal.sexo} • porte ${animal.porte} • ${idadeFormatada}
      </span>
      <span>
        ${animal.cidade}
        ${animal.instituicao ? " — " + animal.instituicao : ""}
      </span>
    `;

    card.addEventListener("click", () => {
      abrirDetalhes(animal);
    });

    elementoLista.appendChild(card);
  });
}

// ---------------------------
// FUNÇÃO: Buscar animais no banco de dados
// ---------------------------
// Essa função é assíncrona pois precisa esperar a resposta do servidor

async function buscarAnimais(url) {
  const elementoLista = document.getElementById("animals-list");
  elementoLista.innerHTML = '<p class="list-empty">Carregando...</p>';

  try {
    // Faz a requisição ao Supabase com a URL montada
    const listaDeAnimais = await supabaseFetch(url);

    // Com os dados em mãos, exibe na tela
    exibirAnimaisNaTela(listaDeAnimais);
  } catch (erro) {
    // Se der qualquer erro na comunicação com o banco, avisa o usuário
    elementoLista.innerHTML = '<p class="list-empty">Erro ao buscar animais.</p>';
    console.error("Erro na busca:", erro);
  }
}

// ---------------------------
// EVENTO: Clique no botão Filtrar
// ---------------------------
// Quando o usuário clica no botão, monta a URL com os filtros
// preenchidos e faz uma nova busca no banco

document.getElementById("btn-filtrar").addEventListener("click", function () {
  const urlComFiltros = montarUrlDeBusca();
  buscarAnimais(urlComFiltros);
});

// ---------------------------
// INÍCIO: Carrega todos os animais ao abrir a página
// ---------------------------
// Chama a busca sem filtros para já exibir a lista completa

const urlSemFiltros = "animais?select=*&order=nome.asc";
buscarAnimais(urlSemFiltros);
