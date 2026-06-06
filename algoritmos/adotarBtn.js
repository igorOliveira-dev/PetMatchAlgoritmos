// =============================================
// ALGORITMO DE BOTÃO DE ADOÇÃO - PetMatch
// =============================================

// ---------------------------
// FUNÇÃO: Redirecionar para WhatsApp do respectivo doador com mensagem pré-formatada
// ---------------------------

document.getElementById("btn-adotar").addEventListener("click", () => {
  if (!animalSelecionado) return;

  const telefone = animalSelecionado.contato;

  const mensagem = `Olá! Tenho interesse em adotar ${animalSelecionado.nome}.`;

  window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`, "_blank");
});
