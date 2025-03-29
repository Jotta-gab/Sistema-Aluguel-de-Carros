document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('contratosTableBody');
    const btnMostrarTodos = document.getElementById('btnMostrarTodos');
    const btnMostrarAtivos = document.getElementById('btnMostrarAtivos');

    carregarContratos('/admin/contratos');

    btnMostrarTodos.addEventListener('click', () => {
        carregarContratos('/admin/contratos/todos');
    });

    btnMostrarAtivos.addEventListener('click', () => {
        carregarContratos('/admin/contratos');
    });

    function carregarContratos(endpoint) {
        fetch(endpoint)
            .then(response => response.json())
            .then(contratos => {
                tableBody.innerHTML = '';
                contratos.forEach(contrato => {
                    const row = criarLinhaContrato(contrato);
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar contratos:', error));
    }

    function criarLinhaContrato(contrato) {
        const row = document.createElement('tr');

        const dataInicio = new Date(contrato.dataInicioAluguel).toLocaleDateString();
        const dataFim = new Date(contrato.dataFimAluguel).toLocaleDateString();

        const status = contrato.ativo ? 'Ativo' : 'Cancelado';
        const statusClass = contrato.ativo ? 'status-ativo' : 'status-inativo';

        row.innerHTML = `
            <td>${contrato.id}</td>
            <td>${contrato.nomeCliente}</td>
            <td>${contrato.cpfCliente}</td>
            <td>${contrato.modeloCarro} (${contrato.placaCarro})</td>
            <td>${dataInicio} a ${dataFim}</td>
            <td>R$ ${contrato.valorTotalAluguel.toFixed(2)}</td>
            <td class="${statusClass}">${status}</td>
            <td>
                ${contrato.ativo ?
                `<button onclick="cancelarContrato(${contrato.id})" class="btn btn-warning btn-sm btn-action">Cancelar</button>` :
                ''
            }
                <button onclick="excluirContrato(${contrato.id})" class="btn btn-danger btn-sm btn-action">Excluir</button>
            </td>
        `;

        return row;
    }
});

function cancelarContrato(id) {
    if (confirm('Tem certeza que deseja cancelar este contrato?')) {
        fetch(`/admin/contrato/cancelar/${id}`, {
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                    alert('Contrato cancelado com sucesso!');
                    location.reload();
                } else {
                    alert('Erro ao cancelar contrato');
                }
            })
            .catch(error => console.error('Erro:', error));
    }
}

function excluirContrato(id) {
    if (confirm('Tem certeza que deseja EXCLUIR permanentemente este contrato?')) {
        fetch(`/admin/contrato/excluir/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Contrato excluído com sucesso!');
                    location.reload();
                } else {
                    alert('Erro ao excluir contrato');
                }
            })
            .catch(error => console.error('Erro:', error));
    }
}