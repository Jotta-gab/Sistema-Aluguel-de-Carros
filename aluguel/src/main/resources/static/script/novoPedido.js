document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/cliente/veiculosDisponiveis")
    .then((response) => response.json())
    .then((veiculos) => {
      const veiculoSelect = document.getElementById("veiculo");
      veiculos.forEach((veiculo) => {
        const option = document.createElement("option");
        option.value = veiculo.id;
        option.textContent = veiculo.modelo;
        veiculoSelect.appendChild(option);
      });
    });

  document.getElementById("condicoes").addEventListener("change", function () {
    const condicoes = this.value;
    const parcelasDiv = document.getElementById("parcelasDiv");
    if (condicoes === "Cartão de Crédito" || condicoes === "Boleto") {
      parcelasDiv.style.display = "block";
    } else {
      parcelasDiv.style.display = "none";
    }
  });

  document
    .getElementById("novoPedidoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const veiculoId = document.getElementById("veiculo").value;
      const justificativa = document.getElementById("justificativa").value;
      const diasAluguel = document.getElementById("diasAluguel").value;
      const condicoes = document.getElementById("condicoes").value;
      const parcelas =
        condicoes === "Cartão de Crédito" || condicoes === "Boleto"
          ? document.getElementById("parcelas").value
          : 1;
      const cpf = document.getElementById("cpf").value;
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;

      const pedido = {
        veiculo: { id: veiculoId },
        justificativa: justificativa,
        diasAluguel: diasAluguel,
        condicoes: condicoes,
        parcelas: parcelas,
        cpf: cpf,
        nome: nome,
        email: email,
        telefone: telefone,
      };

      fetch("http://localhost:8080/cliente/criarPedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Pedido enviado com sucesso!");
          window.location.href = "meusPedidos.html";
        })
        .catch((error) => console.error("Erro ao enviar pedido:", error));
    });
});
