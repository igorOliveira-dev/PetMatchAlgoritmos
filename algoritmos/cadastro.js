// =============================================
// ALGORITMO DE CADASTRO DE ANIMAIS - PetMatch
// =============================================

// ---------------------------
// FUNÇÃO: cadastrar animal
// ---------------------------

async function cadastrarAnimal() {
  const nome = document.getElementById("nome").value;
  const especie = document.getElementById("especie-cad").value;
  const sexo = document.getElementById("sexo-cad").value;
  const porte = document.getElementById("porte-cad").value;
  const idade = document.getElementById("idade-cad").value;
  const cidade = document.getElementById("cidade").value;
  const instituicaoTutor = document.getElementById("instituicao").value;
  const contato = obterContatoParaBanco();

  const msg = document.getElementById("cadastro-msg");

  // validação simples
  if (!nome || !especie || !sexo || !porte || !idade || !cidade || !instituicaoTutor || !contato) {
    msg.innerText = "Preencha todos os campos obrigatórios.";
    return;
  }

  const novoAnimal = {
    nome,
    especie,
    sexo,
    porte,
    idade: Number(idade),
    cidade,
    contato,
    instituicao: instituicaoTutor || null, // se estiver vazio, salva como null no banco
  };

  try {
    msg.innerText = "Cadastrando...";

    // aqui usamos o mesmo padrão do seu outro JS
    await supabaseFetch("animais", {
      method: "POST",
      body: JSON.stringify(novoAnimal),
    });

    msg.innerText = "Animal cadastrado com sucesso!";

    // limpa formulário
    document.querySelectorAll(".form-grid input").forEach((i) => (i.value = ""));
    document.querySelectorAll(".form-grid select").forEach((s) => (s.value = ""));
  } catch (erro) {
    console.error(erro);
    msg.innerText = "Erro ao cadastrar animal.";
  }
}

// ---------------------------
// EVENTO DO BOTÃO
// ---------------------------

document.getElementById("btn-cadastrar").addEventListener("click", cadastrarAnimal);
