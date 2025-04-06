document.addEventListener('DOMContentLoaded', function () {
    const veiculosContainer = document.getElementById('veiculos-container');
    const filtroMarca = document.getElementById('filtro-marca');
    const buscarMarcaBtn = document.getElementById('buscar-marca');
    const precoMinInput = document.getElementById('preco-min');
    const precoMaxInput = document.getElementById('preco-max');
    const aplicarPrecoBtn = document.getElementById('aplicar-preco');
    const limparFiltrosBtn = document.getElementById('limpar-filtros');
    const buscaGeralInput = document.getElementById('busca-geral');
    const botaoBusca = document.getElementById('botao-busca');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let veiculos = [];
    let carImages = {};
    let filtrosAtivos = {
        tipo: null,
        marca: null,
        precoMin: null,
        precoMax: null
    };


    async function carregarDados() {
        try {

            const response = await fetch('imagens.json');
            carImages = await response.json();

            const veiculosResponse = await fetch('http://localhost:8080/admin/todosVeiculos');
            veiculos = await veiculosResponse.json();

            exibirVeiculos(veiculos);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);

            carImages = {
                'default': 'https://via.placeholder.com/300x150?text=Imagem+Indispon%C3%ADvel'
            };
            exibirVeiculos(veiculos);
        }
    }


    function exibirVeiculos(veiculosParaExibir) {
        veiculosContainer.innerHTML = '';

        if (veiculosParaExibir.length === 0) {
            veiculosContainer.innerHTML = '<p class="no-vehicles">Nenhum veículo encontrado com os filtros aplicados.</p>';
            return;
        }

        veiculosParaExibir.forEach(veiculo => {
            const card = criarCardVeiculo(veiculo);
            veiculosContainer.appendChild(card);
        });
    }


    function obterImagemVeiculo(veiculo) {

        if (carImages[veiculo.modelo]) {
            return carImages[veiculo.modelo];
        }


        const primeiraPalavraModelo = veiculo.modelo.split(' ')[0];
        if (carImages[primeiraPalavraModelo]) {
            return carImages[primeiraPalavraModelo];
        }


        if (carImages[veiculo.marca + ' ' + primeiraPalavraModelo]) {
            return carImages[veiculo.marca + ' ' + primeiraPalavraModelo];
        }

        return `https://via.placeholder.com/300x150?text=${encodeURIComponent(veiculo.marca + ' ' + veiculo.modelo)}`;
    }


    function criarCardVeiculo(veiculo) {
        const card = document.createElement('div');
        card.className = 'vehicle-card';

        const imagem = document.createElement('div');
        imagem.className = 'vehicle-image';
        imagem.style.backgroundImage = `url('${obterImagemVeiculo(veiculo)}')`;

        const details = document.createElement('div');
        details.className = 'vehicle-details';

        const title = document.createElement('h3');
        title.textContent = `${veiculo.marca} ${veiculo.modelo}`;

        const meta = document.createElement('div');
        meta.className = 'vehicle-meta';
        meta.innerHTML = `
        <span>${veiculo.ano}</span>
        <span>${veiculo.placa}</span>
    `;


        const pedioButton = document.createElement('button');
        pedioButton.className = 'btn-cadastrar-pedido';
        pedioButton.textContent = 'Alugar';
        pedioButton.onclick = function () {
            window.location.href = 'novoPedido.html';
        };

        const price = document.createElement('div');
        price.className = 'vehicle-price';
        price.textContent = `R$ ${veiculo.precoDiaria.toFixed(2)}/dia`;

        const type = document.createElement('div');
        type.className = 'vehicle-type';
        type.textContent = formatarTipo(veiculo.tipo);


        details.appendChild(title);
        details.appendChild(meta);
        details.appendChild(price);
        details.appendChild(type);
        details.appendChild(pedioButton);

        card.appendChild(imagem);
        card.appendChild(details);

        return card;
    }



    function formatarTipo(tipo) {
        const tipos = {
            'popular': 'Popular',
            'servico': 'Serviço',
            'luxo': 'Luxo',
            'picapes': 'Picapes',
            'sedan': 'Sedan',
            'suv': 'SUV',
            'motos': 'Motos',
            'eletrico': 'Elétrico',
            'hibrido': 'Híbrido'
        };
        return tipos[tipo] || tipo;
    }


    function aplicarFiltros() {
        let veiculosFiltrados = [...veiculos];


        if (filtrosAtivos.tipo) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.tipo === filtrosAtivos.tipo);
        }


        if (filtrosAtivos.marca) {
            veiculosFiltrados = veiculosFiltrados.filter(v =>
                v.marca.toLowerCase().includes(filtrosAtivos.marca.toLowerCase())
            );
        }

        if (filtrosAtivos.precoMin) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.precoDiaria >= filtrosAtivos.precoMin);
        }

        if (filtrosAtivos.precoMax) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.precoDiaria <= filtrosAtivos.precoMax);
        }

        exibirVeiculos(veiculosFiltrados);
    }

    function buscarGeral(termo) {
        if (!termo) {
            aplicarFiltros();
            return;
        }

        const veiculosFiltrados = veiculos.filter(veiculo =>
            veiculo.marca.toLowerCase().includes(termo.toLowerCase()) ||
            veiculo.modelo.toLowerCase().includes(termo.toLowerCase()) ||
            veiculo.placa.toLowerCase().includes(termo.toLowerCase()) ||
            veiculo.ano.toLowerCase().includes(termo.toLowerCase()) ||
            veiculo.tipo.toLowerCase().includes(termo.toLowerCase())
        );

        exibirVeiculos(veiculosFiltrados);
    }


    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tipo = this.dataset.tipo;
            const filtro = this.dataset.filtro;


            filterBtns.forEach(b => b.classList.remove('active'));

            if (tipo) {
                this.classList.add('active');
                filtrosAtivos.tipo = tipo;
            } else if (filtro === 'preco-menor') {
                filtrosAtivos.precoMin = null;
                filtrosAtivos.precoMax = null;
                veiculos.sort((a, b) => a.precoDiaria - b.precoDiaria);
                exibirVeiculos(veiculos);
                return;
            } else if (filtro === 'preco-maior') {
                filtrosAtivos.precoMin = null;
                filtrosAtivos.precoMax = null;
                veiculos.sort((a, b) => b.precoDiaria - a.precoDiaria);
                exibirVeiculos(veiculos);
                return;
            }

            aplicarFiltros();
        });
    });

    buscarMarcaBtn.addEventListener('click', function () {
        const marca = filtroMarca.value.trim();
        filtrosAtivos.marca = marca || null;
        aplicarFiltros();
    });

    aplicarPrecoBtn.addEventListener('click', function () {
        const precoMin = parseFloat(precoMinInput.value);
        const precoMax = parseFloat(precoMaxInput.value);

        filtrosAtivos.precoMin = isNaN(precoMin) ? null : precoMin;
        filtrosAtivos.precoMax = isNaN(precoMax) ? null : precoMax;

        aplicarFiltros();
    });

    limparFiltrosBtn.addEventListener('click', function () {

        filtrosAtivos = {
            tipo: null,
            marca: null,
            precoMin: null,
            precoMax: null
        };

        filtroMarca.value = '';
        precoMinInput.value = '';
        precoMaxInput.value = '';


        filterBtns.forEach(btn => btn.classList.remove('active'));


        exibirVeiculos(veiculos);
    });

    botaoBusca.addEventListener('click', function () {
        buscarGeral(buscaGeralInput.value.trim());
    });

    buscaGeralInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            buscarGeral(this.value.trim());
        }
    });


    carregarDados();
});