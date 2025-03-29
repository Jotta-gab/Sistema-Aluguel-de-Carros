// Função para carregar todos os pedidos
function carregarTodosPedidos() {
  fetch("http://localhost:8080/cliente/todosPedidos")
    .then((response) => response.json())
    .then((data) => {
      let tabelaEmAnalise = document.getElementById("pedidosEmAnaliseList");
      let tabelaOutros = document.getElementById("pedidosOutrosList");
      tabelaEmAnalise.innerHTML = "";
      tabelaOutros.innerHTML = "";

      data.forEach((pedido) => {
        let row = `
                            <td>${pedido.id}</td>
                            <td>${pedido.nome || "Não informado"}</td>
                            <td>${
                              pedido.veiculo
                                ? pedido.veiculo.modelo +
                                  " - " +
                                  pedido.veiculo.placa
                                : "Não informado"
                            }</td>
                            <td>${pedido.justificativa || "Não informado"}</td>
                            <td>${pedido.condicoes || "Não informado"}</td>
                            <td>${pedido.status || "Não informado"}</td>
                            <td>
    <button onclick="aprovarPedido(${pedido.id})">Aprovar</button>
    <button onclick="reprovarPedido(${pedido.id})">Reprovar</button>
    ${
      pedido.status === "Aprovado"
        ? `<button onclick="window.location.href='cadastrarContrato.html'">Cadastrar Contrato</button>`
        : ""
    }
</td>

                        `;

        if (pedido.status === "Em Análise") {
          let rowEmAnalise = tabelaEmAnalise.insertRow();
          rowEmAnalise.innerHTML = row;
        } else {
          let rowOutros = tabelaOutros.insertRow();
          rowOutros.innerHTML = row;
        }
      });
    })
    .catch((error) => console.error("Erro ao carregar pedidos:", error));
}

function aprovarPedido(id) {
  fetch(`http://localhost:8080/cliente/aprovarPedido/${id}`, { method: "POST" })
    .then((response) => response.text())
    .then((message) => {
      alert(message);
      carregarTodosPedidos();
    });
}

function reprovarPedido(id) {
  fetch(`http://localhost:8080/cliente/reprovarPedido/${id}`, {
    method: "POST",
  })
    .then((response) => response.text())
    .then((message) => {
      alert(message);
      carregarTodosPedidos();
    });
}

window.onload = carregarTodosPedidos;
