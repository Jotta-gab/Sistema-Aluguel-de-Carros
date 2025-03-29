function listarVeiculosDisponiveis() {
  fetch("http://localhost:8080/admin/veiculosDisponiveis")
    .then((response) => response.json())
    .then((data) => {
      const veiculosDisponiveisDiv = document.getElementById(
        "veiculosDisponiveis"
      );
      veiculosDisponiveisDiv.innerHTML = "";

      if (data.length > 0) {
        data.forEach((veiculo) => {
          veiculosDisponiveisDiv.innerHTML += `
                                <div class="veiculo">
                                    <p><strong>Ano:</strong> ${veiculo.ano}</p>
                                    <p><strong>Marca:</strong> ${veiculo.marca}</p>
                                    <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
                                    <p><strong>Placa:</strong> ${veiculo.placa}</p>
                                    <p><strong>Preço da Diária:</strong> R$ ${veiculo.precoDiaria}</p>
                                    <button class="btn-alugar" onclick="alterarStatus(${veiculo.id}, 'Alugado')">Alterar Status para Alugado</button>
                                </div>
                            `;
        });
      } else {
        veiculosDisponiveisDiv.innerHTML =
          "<p>Não há veículos disponíveis.</p>";
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao carregar veículos disponíveis.");
    });
}

function listarVeiculosAlugados() {
  fetch(" http://localhost:8080/admin/veiculosAlugados")
    .then((response) => response.json())
    .then((data) => {
      const veiculosAlugadosDiv = document.getElementById("veiculosAlugados");
      veiculosAlugadosDiv.innerHTML = "";

      if (data.length > 0) {
        data.forEach((veiculo) => {
          veiculosAlugadosDiv.innerHTML += `
                                <div class="veiculo">
                                    <p><strong>Ano:</strong> ${veiculo.ano}</p>
                                    <p><strong>Marca:</strong> ${veiculo.marca}</p>
                                    <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
                                    <p><strong>Placa:</strong> ${veiculo.placa}</p>
                                    <p><strong>Preço da Diária:</strong> R$ ${veiculo.precoDiaria}</p>
                                    <button class="btn-devolver" onclick="alterarStatus(${veiculo.id}, 'Disponível')">Alterar Status para Disponível</button>
                                </div>
                            `;
        });
      } else {
        veiculosAlugadosDiv.innerHTML = "<p>Não há veículos alugados.</p>";
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao carregar veículos alugados.");
    });
}

// Função para alterar o status do veículo
function alterarStatus(id, novoStatus) {
  fetch(
    ` http://localhost:8080/admin/alterarStatus/${id}?status=${novoStatus}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      alert(`Status alterado para ${novoStatus}!`);
      listarVeiculosDisponiveis();
      listarVeiculosAlugados();
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao alterar o status do veículo.");
    });
}

window.onload = function () {
  listarVeiculosDisponiveis();
  listarVeiculosAlugados();
};
