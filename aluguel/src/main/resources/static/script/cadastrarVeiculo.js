document
  .getElementById("cadastroVeiculoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let ano = document.getElementById("ano").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let placa = document.getElementById("placa").value;
    let precoDiaria = document.getElementById("precoDiaria").value;
    let tipo = document.getElementById("tipo").value;

    fetch("http://localhost:8080/admin/cadastrarVeiculo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ano: ano,
        marca: marca,
        modelo: modelo,
        placa: placa,
        precoDiaria: precoDiaria,
        tipo: tipo
      }),
    })

      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      })
      .then((data) => {
        alert("Veículo cadastrado com sucesso!");
        window.location.href = "visualizarVeiculos.html";
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao cadastrar o veículo. Tente novamente.");
      });
  });
