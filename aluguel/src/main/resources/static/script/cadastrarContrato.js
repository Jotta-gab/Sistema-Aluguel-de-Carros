function consultarPedido() {
  const cpf = document.getElementById("cpfCliente").value;


  fetch(`http://localhost:8080/admin/pedido/${cpf}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Pedido não encontrado');
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("nomeCliente").textContent = data.nome;
      document.getElementById("modeloCarro").textContent = data.veiculo.modelo;
      document.getElementById("justificativa").textContent = data.justificativa;
      document.getElementById("condicoes").textContent = data.condicoes;
      document.getElementById("status").textContent = data.status;

      document.getElementById("nomeClienteContrato").value = data.nome;
      document.getElementById("modeloCarroContrato").value = data.veiculo.modelo;

      document.getElementById("informacoesPedido").style.display = "block";
      document.getElementById("formularioContrato").style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao consultar pedido:", error);
      alert("Erro ao consultar pedido: " + error.message);
    });
}

function calcularTotal() {
  const precoDiaria = parseFloat(document.getElementById("precoDiaria").value);
  const quantidadeDiarias = parseInt(document.getElementById("quantidadeDiarias").value);

  if (!isNaN(precoDiaria) && !isNaN(quantidadeDiarias)) {
    const valorTotal = precoDiaria * quantidadeDiarias;
    document.getElementById("valorTotal").value = valorTotal.toFixed(2);
  }
}

function formatarPlaca(placa) {

  placa = placa.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();


  if (placa.length > 3) {
    placa = placa.substring(0, 3) + '-' + placa.substring(3);
  }

  return placa.substring(0, 8);
}

function validarPlaca(placa) {

  const regexPlaca = /^[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}$/;
  return regexPlaca.test(placa);
}

function criarContrato() {

  const placaCarro = formatarPlaca(document.getElementById("placaCarro").value);


  if (!validarPlaca(placaCarro)) {
    alert("Por favor, insira uma placa válida no formato AAA-0000 ou AAA-0A00");
    return;
  }


  const contrato = {
    nomeCliente: document.getElementById("nomeClienteContrato").value,
    cpfCliente: document.getElementById("cpfCliente").value,
    telefoneCliente: document.getElementById("telefoneCliente").value,
    modeloCarro: document.getElementById("modeloCarroContrato").value,
    placaCarro: placaCarro,
    dataInicioAluguel: document.getElementById("dataInicioAluguel").value,
    dataFimAluguel: document.getElementById("dataFimAluguel").value,
    precoDiaria: parseFloat(document.getElementById("precoDiaria").value),
    quantidadeDiarias: parseInt(document.getElementById("quantidadeDiarias").value),
    valorTotalAluguel: parseFloat(document.getElementById("valorTotal").value),
    formaPagamento: document.getElementById("formaPagamento").value,
    tipoContrato: document.getElementById("tipoContrato").value,
    contratoCredito: document.querySelector('input[name="contratoCredito"]:checked').value === "sim",
    instituicaoCredito: document.getElementById("instituicaoCredito").value
  };

  if (!contrato.nomeCliente || !contrato.cpfCliente || !contrato.modeloCarro || !contrato.placaCarro ||
    !contrato.dataInicioAluguel || !contrato.dataFimAluguel || isNaN(contrato.precoDiaria) ||
    isNaN(contrato.quantidadeDiarias)) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  fetch("http://localhost:8080/admin/cadastrarContrato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contrato),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao criar contrato');
      }
      return response.json();
    })
    .then(data => {
      alert("Contrato criado com sucesso!");

      document.getElementById("formularioContrato").reset();
    })
    .catch(error => {
      console.error("Erro ao criar contrato:", error);
      alert("Erro ao criar contrato: " + error.message);
    });
}

document.getElementById("placaCarro").addEventListener("input", function (e) {
  this.value = formatarPlaca(this.value);
});

document.querySelectorAll('input[name="contratoCredito"]').forEach((input) => {
  input.addEventListener("change", function () {
    document.getElementById("instituicaoCreditoDiv").style.display =
      this.value === "sim" ? "block" : "none";
  });
});