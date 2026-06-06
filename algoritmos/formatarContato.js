// =============================================
// ALGORITMO DE FORMATAÇÃO DE CONTATO - PetMatch
// =============================================

// ---------------------------
// FUNÇÃO: Formatar o campo de contato enquanto o usuário digita e enviar no formato correto para o banco
// ---------------------------
// O formato exibido para o usuário é: +55 (XX) XXXXX-XXXX
// O formato salvo no banco é apenas números: 55XXXXXXXXXXX
// ---------------------------

const contatoInput = document.getElementById("contato");

if (contatoInput) {
  contatoInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    // Limita a 13 dígitos (55 + DDD + 9 dígitos)
    valor = valor.slice(0, 13);

    let formatado = "";

    if (valor.length > 0) {
      formatado += "+" + valor.slice(0, 2);
    }

    if (valor.length > 2) {
      formatado += " (" + valor.slice(2, 4);
    }

    if (valor.length >= 4) {
      formatado += ")";
    }

    if (valor.length > 4) {
      formatado += " " + valor.slice(4, 9);
    }

    if (valor.length > 9) {
      formatado += "-" + valor.slice(9, 13);
    }

    e.target.value = formatado;
  });
}

/**
 * Use esta função ao salvar no banco.
 * Exemplo:
 * const contato = obterContatoParaBanco();
 */
function obterContatoParaBanco() {
  return contatoInput.value.replace(/\D/g, "");
}

// Disponibiliza globalmente para cadastro.js
window.obterContatoParaBanco = obterContatoParaBanco;
