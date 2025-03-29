function consultarPedido() {
  const cpf = document.getElementById("cpfCliente").value;
  fetch(`http://localhost:8080/admin/pedido/${cpf}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("nomeCliente").textContent = data.nome;
        document.getElementById("modeloCarro").textContent = data.modelo;
        document.getElementById("justificativa").textContent =
          data.justificativa;
        document.getElementById("condicoes").textContent = data.condicoes;
        document.getElementById("status").textContent = data.status;
        document.getElementById("informacoesPedido").style.display = "block";
        document.getElementById("formularioContrato").style.display = "block";

        document.getElementById("nomeClienteContrato").value = data.nome;
        document.getElementById("modeloCarroContrato").value = data.modelo;
      } else {
        alert("Pedido não encontrado.");
      }
    })
    .catch((error) => alert("Erro ao consultar o pedido: " + error));
}

function calcularTotal() {
  const precoDiaria = parseFloat(document.getElementById("precoDiaria").value);
  const quantidadeDiarias = parseInt(
    document.getElementById("quantidadeDiarias").value
  );

  if (!isNaN(precoDiaria) && !isNaN(quantidadeDiarias)) {
    const valorTotal = precoDiaria * quantidadeDiarias;
    document.getElementById("valorTotal").value = valorTotal.toFixed(2);
  }
}

function criarContrato() {
  const contrato = {
    nomeCliente: document.getElementById("nomeClienteContrato").value,
    cpfCliente: document.getElementById("cpfCliente").value,
    telefoneCliente: document.getElementById("telefoneCliente").value,
    modeloCarro: document.getElementById("modeloCarroContrato").value,
    dataInicioAluguel: document.getElementById("dataInicioAluguel").value,
    dataFimAluguel: document.getElementById("dataFimAluguel").value,
    precoDiaria: parseFloat(document.getElementById("precoDiaria").value),
    quantidadeDiarias: parseInt(
      document.getElementById("quantidadeDiarias").value
    ),
    valorTotalAluguel: parseFloat(document.getElementById("valorTotal").value),
    formaPagamento: document.getElementById("formaPagamento").value,
    tipoContrato: document.getElementById("tipoContrato").value,
    contratoCredito:
      document.querySelector('input[name="contratoCredito"]:checked').value ===
      "sim",
    instituicaoCredito: document.getElementById("instituicaoCredito").value,
  };

  fetch("http://localhost:8080/admin/cadastrarContrato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contrato),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Contrato criado com sucesso!");
    })
    .catch((error) => alert("Erro ao criar contrato: " + error));
}

document.querySelectorAll('input[name="contratoCredito"]').forEach((input) => {
  input.addEventListener("change", function () {
    document.getElementById("instituicaoCreditoDiv").style.display =
      this.value === "sim" ? "block" : "none";
  });
});
