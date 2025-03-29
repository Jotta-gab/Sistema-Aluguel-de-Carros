function buscarPedidos() {
  const cpfCliente = document.getElementById("cpfCliente").value;

  if (!cpfCliente) {
    alert("Por favor, digite seu CPF.");
    return;
  }

  fetch(`http://localhost:8080/cliente/meusPedidosCpf?cpf=${cpfCliente}`)
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById("pedidosTable");
      table.innerHTML = "";

      if (data && data.length > 0) {
        data.forEach((pedido) => {
          let row = document.createElement("tr");
          row.innerHTML = `
                                <td>${pedido.status}</td>
                                <td>${pedido.veiculo.modelo}</td>
                                <td>${pedido.justificativa}</td>
                                <td>${pedido.condicoes}</td>
                                <td>
                                    ${
                                      pedido.status === "Em Análise"
                                        ? '<button onclick="cancelarPedido(' +
                                          pedido.id +
                                          ')">Cancelar</button>'
                                        : ""
                                    }
                                </td>
                            `;
          table.appendChild(row);
        });
      } else {
        let row = document.createElement("tr");
        row.innerHTML = `<td colspan="5">Nenhum pedido encontrado</td>`;
        table.appendChild(row);
      }
    })
    .catch((error) => console.error("Erro ao carregar pedidos:", error));
}

function cancelarPedido(id) {
  fetch(`http://localhost:8080/cliente/cancelarPedido/${id}`, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao cancelar o pedido.");
      }
      return response.text();
    })
    .then((message) => {
      alert(message);
      buscarPedidos();
    })
    .catch((err) => alert("Erro ao cancelar pedido."));
}
