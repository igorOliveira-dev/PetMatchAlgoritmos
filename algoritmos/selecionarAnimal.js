// =============================================
// ALGORITMO DE SELEÇÃO DE ANIMAIS - PetMatch
// =============================================

// ---------------------------
// FUNÇÃO: selecionar animal para visualizar detalhes
// ---------------------------
// Quando o usuário clica em um animal da lista, esta função é chamada para preencher os detalhes na tela
// ---------------------------

let animalSelecionado = null;

function abrirDetalhes(animal) {
  animalSelecionado = animal;

  document.getElementById("animal-nome").textContent = animal.nome;

  document.getElementById("animal-especie").textContent = animal.especie;

  document.getElementById("animal-sexo").textContent = animal.sexo;

  document.getElementById("animal-porte").textContent = animal.porte;

  document.getElementById("animal-idade").textContent = animal.idade + (animal.idade === 1 ? " ano" : " anos");

  document.getElementById("animal-cidade").textContent = animal.cidade;

  document.getElementById("animal-instituicao").textContent = animal.instituicao || "-";

  updateCarouselTo(1);
}
