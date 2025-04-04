
const mp = new MercadoPago('TEST-13567e25-7500-49d1-9d7b-fe3ed8624fbc', {
  locale: 'pt-BR'
});


let contratoAtual = null;

const modal = document.getElementById("payment-modal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function buscarPedidos() {
  const cpfCliente = document.getElementById("cpfCliente").value;

  if (!cpfCliente) {
    alert("Por favor, digite seu CPF.");
    return;
  }

  fetch(`http://localhost:8080/cliente/meusPedidosCpf?cpf=${cpfCliente}`)
    .then((response) => response.json())
    .then((pedidos) => {
      const table = document.getElementById("pedidosTable");
      table.innerHTML = "";

      if (pedidos && pedidos.length > 0) {
        pedidos.forEach((pedido) => {
          fetch(`http://localhost:8080/admin/contrato/${cpfCliente}`)
            .then(response => response.json())
            .then(contrato => {
              contratoAtual = contrato;
              let row = document.createElement("tr");
              row.innerHTML = `
                              <td>
                                  <span class="status ${getStatusClass(pedido.status)}">
                                      ${pedido.status}
                                  </span>
                              </td>
                              <td>${pedido.veiculo.modelo}</td>
                              <td>${pedido.justificativa}</td>
                              <td>${pedido.condicoes}</td>
                              <td class="actions">
                                  ${pedido.status === "Em Análise" ?
                  `<button class="btn btn-cancel" onclick="cancelarPedido(${pedido.id})">
                                          <i class="fas fa-times"></i> Cancelar
                                      </button>` : ''}
                                  ${pedido.status === "Aprovado" && contrato ?
                  `<div class="payment-actions">
                                          <button class="btn btn-download" onclick="gerarContratoPDF('${cpfCliente}')">
                                              <i class="fas fa-download"></i> Contrato
                                          </button>
                                          <button class="btn btn-payment" onclick="iniciarPagamento(${pedido.id}, ${contrato.valorTotalAluguel})">
                                              <i class="fas fa-credit-card"></i> Pagar
                                          </button>
                                      </div>` : ''}
                              </td>
                          `;
              table.appendChild(row);
            })
            .catch(() => {
              let row = document.createElement("tr");
              row.innerHTML = `
                              <td>
                                  <span class="status ${getStatusClass(pedido.status)}">
                                      ${pedido.status}
                                  </span>
                              </td>
                              <td>${pedido.veiculo.modelo}</td>
                              <td>${pedido.justificativa}</td>
                              <td>${pedido.condicoes}</td>
                              <td class="actions">
                                  ${pedido.status === "Em Análise" ?
                  `<button class="btn btn-cancel" onclick="cancelarPedido(${pedido.id})">
                                          <i class="fas fa-times"></i> Cancelar
                                      </button>` : ''}
                              </td>
                          `;
              table.appendChild(row);
            });
        });
      } else {
        let row = document.createElement("tr");
        row.innerHTML = `<td colspan="5">Nenhum pedido encontrado</td>`;
        table.appendChild(row);
      }
    })
    .catch((error) => console.error("Erro ao carregar pedidos:", error));
}

function getStatusClass(status) {
  switch (status) {
    case 'Aprovado': return 'status-approved';
    case 'Reprovado': return 'status-rejected';
    case 'Em Análise': return 'status-pending';
    default: return '';
  }
}

function cancelarPedido(id) {
  if (confirm("Tem certeza que deseja cancelar este pedido?")) {
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
}

function gerarContratoPDF(cpfCliente) {
  fetch(`http://localhost:8080/admin/contrato/${cpfCliente}`)
    .then(response => response.json())
    .then(contrato => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.addImage('/img/Todecarro.png', 'PNG', 20, 10, 150, 20);

      doc.setFontSize(18);
      doc.text('CONTRATO DE ALUGUEL DE VEÍCULO', 105, 70, { align: 'center' });

      doc.setFontSize(12);
      doc.text(`Nº do Contrato: ${contrato.id}`, 20, 90);
      doc.text(`Data: ${new Date(contrato.dataInicioAluguel).toLocaleDateString()}`, 20, 100);

      doc.setFontSize(14);
      doc.text('DADOS DAS PARTES CONTRATANTES', 105, 120, { align: 'center' });

      doc.setFontSize(12);
      doc.text('LOCADOR: Tô de Carro Aluguel de Veículos LTDA', 20, 135);
      doc.text('CNPJ: 00.000.000/0001-00', 20, 145);

      doc.text('LOCATÁRIO:', 20, 160);
      doc.text(`Nome: ${contrato.nomeCliente}`, 30, 170);
      doc.text(`CPF: ${contrato.cpfCliente}`, 30, 180);
      doc.text(`Telefone: ${contrato.telefoneCliente}`, 30, 190);

      doc.setFontSize(14);
      doc.text('DADOS DO VEÍCULO', 105, 210, { align: 'center' });

      doc.setFontSize(12);
      doc.text(`Modelo: ${contrato.modeloCarro}`, 20, 225);
      doc.text(`Placa: ${contrato.placaCarro}`, 20, 235);

      doc.setFontSize(14);
      doc.text('TERMOS E CONDIÇÕES', 105, 255, { align: 'center' });

      doc.setFontSize(10);
      const termos = [
        '1. O veículo será utilizado exclusivamente pelo Locatário, sendo vedada sua sublocação.',
        '2. O período de locação terá início em ' + new Date(contrato.dataInicioAluguel).toLocaleDateString() +
        ' e término em ' + new Date(contrato.dataFimAluguel).toLocaleDateString() + '.',
        '3. O valor total do aluguel é de R$ ' + contrato.valorTotalAluguel.toFixed(2) + ', ' +
        'sendo ' + contrato.quantidadeDiarias + ' diárias a R$ ' + contrato.precoDiaria.toFixed(2) + ' cada.',
        '4. Forma de pagamento: ' + contrato.formaPagamento + '.',
        '5. O veículo deverá ser devolvido no mesmo estado em que foi entregue.'
      ];

      let y = 270;
      termos.forEach(termo => {
        doc.text(termo, 20, y, { maxWidth: 170 });
        y += 10;
      });

      doc.setFontSize(12);
      doc.text('_________________________________________', 30, 350);
      doc.text('Assinatura do Locador', 65, 360);

      doc.text('_________________________________________', 130, 350);
      doc.text('Assinatura do Locatário', 165, 360);

      doc.save(`Contrato_${contrato.id}_${contrato.nomeCliente}.pdf`);
    })
    .catch(error => {
      console.error('Erro ao gerar contrato:', error);
      alert('Erro ao gerar contrato. Tente novamente.');
    });
}

function iniciarPagamento(pedidoId, valorTotal) {
  modal.style.display = "block";
  document.getElementById("payment-container").innerHTML = "<p>Carregando opções de pagamento...</p>";


  fetch('/payment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pedidoId: pedidoId,
      valor: valorTotal,
      descricao: 'Pagamento do aluguel de veículo'
    })
  })
    .then(response => response.json())
    .then(preference => {
      renderPaymentButton(preference.id);
    })
    .catch(error => {
      console.error('Erro ao criar pagamento:', error);
      document.getElementById("payment-container").innerHTML = `
          <p class="error">Erro ao carregar opções de pagamento.</p>
          <button class="btn" onclick="iniciarPagamento(${pedidoId}, ${valorTotal})">
              Tentar novamente
          </button>
      `;
    });
}

function renderPaymentButton(preferenceId) {

  document.getElementById("payment-container").innerHTML = '';


  mp.checkout({
    preference: {
      id: preferenceId
    },
    render: {
      container: '#payment-container',
      label: 'Pagar Agora',
      type: 'wallet'
    }
  });
}