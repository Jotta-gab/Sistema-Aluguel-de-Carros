const API_URL = 'http://localhost:8080/clientes';

document.addEventListener("DOMContentLoaded", () => {

    loadClients();


    const addClientForm = document.getElementById('addClientForm');
    if (addClientForm) {
        addClientForm.addEventListener('submit', addClient);
    }
});


function loadClients() {
    fetch(API_URL)
        .then(response => response.json())
        .then(clients => {
            const tableBody = document.querySelector("#clientsTable tbody");
            tableBody.innerHTML = "";

            clients.forEach(client => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${client.id}</td>
                    <td>${client.nome}</td>
                    <td>${client.cpf}</td>
                    <td>${client.rg}</td>
                    <td>${client.endereco}</td>
                    <td>
                        <button onclick="deleteClient(${client.id})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function addClient(event) {
    event.preventDefault();

    const clientData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        endereco: document.getElementById('endereco').value,
        profissao: document.getElementById('profissao').value,
        empregador: document.getElementById('empregador').value,
        rendimento: parseFloat(document.getElementById('rendimento').value)
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
    })
        .then(response => response.json())
        .then(data => {
            alert("Cliente adicionado com sucesso!");
            loadClients();
            hideAddForm();
        })
        .catch(error => console.error("Erro ao adicionar cliente:", error));
}


function deleteClient(id) {
    if (confirm("Você tem certeza que deseja excluir este cliente?")) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert("Cliente excluído com sucesso!");
                    loadClients();
                } else {
                    alert("Erro ao excluir cliente.");
                }
            })
            .catch(error => console.error("Erro ao excluir cliente:", error));
    }
}


function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}
