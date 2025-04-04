document.addEventListener('DOMContentLoaded', function() {
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
    let carImages = {}; // Objeto para armazenar as imagens dos carros
    let filtrosAtivos = {
        tipo: null,
        marca: null,
        precoMin: null,
        precoMax: null
    };

    // Carregar todos os veículos e as imagens
    async function carregarDados() {
        try {
            // Carrega as imagens primeiro
            const response = await fetch('imagens.json');
            carImages = await response.json();
            
            // Depois carrega os veículos
            const veiculosResponse = await fetch('http://localhost:8080/admin/todosVeiculos');
            veiculos = await veiculosResponse.json();
            
            exibirVeiculos(veiculos);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            // Configura fallback caso o JSON não carregue
            carImages = {
                'default': 'https://via.placeholder.com/300x150?text=Imagem+Indispon%C3%ADvel'
            };
            exibirVeiculos(veiculos);
        }
    }

    // Exibir veículos na tela
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

    // Função para obter a URL da imagem com fallback inteligente
    function obterImagemVeiculo(veiculo) {
        // Tenta encontrar pelo modelo completo primeiro
        if (carImages[veiculo.modelo]) {
            return carImages[veiculo.modelo];
        }
        
        // Tenta encontrar pela primeira palavra do modelo
        const primeiraPalavraModelo = veiculo.modelo.split(' ')[0];
        if (carImages[primeiraPalavraModelo]) {
            return carImages[primeiraPalavraModelo];
        }
        
        // Tenta encontrar pela marca (para casos como Fiat Uno)
        if (carImages[veiculo.marca + ' ' + primeiraPalavraModelo]) {
            return carImages[veiculo.marca + ' ' + primeiraPalavraModelo];
        }
        
        // Fallback: usa placeholder com informações do carro
        return `https://via.placeholder.com/300x150?text=${encodeURIComponent(veiculo.marca + ' ' + veiculo.modelo)}`;
    }

    // Criar card de veículo
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

        card.appendChild(imagem);
        card.appendChild(details);

        return card;
    }

    // Formatador de tipo
    function formatarTipo(tipo) {
        const tipos = {
            'popular': 'Popular',
            'servico': 'Serviço',
            'luxo': 'Luxo',
            'picapes': 'Picapes',
            'sedan': 'Sedan',
            'suv': 'SUV',
            'motos': 'Motos'
        };
        return tipos[tipo] || tipo;
    }

    // Aplicar filtros
    function aplicarFiltros() {
        let veiculosFiltrados = [...veiculos];

        // Filtro por tipo
        if (filtrosAtivos.tipo) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.tipo === filtrosAtivos.tipo);
        }

        // Filtro por marca
        if (filtrosAtivos.marca) {
            veiculosFiltrados = veiculosFiltrados.filter(v => 
                v.marca.toLowerCase().includes(filtrosAtivos.marca.toLowerCase())
            );
        }

        // Filtro por preço
        if (filtrosAtivos.precoMin) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.precoDiaria >= filtrosAtivos.precoMin);
        }

        if (filtrosAtivos.precoMax) {
            veiculosFiltrados = veiculosFiltrados.filter(v => v.precoDiaria <= filtrosAtivos.precoMax);
        }

        exibirVeiculos(veiculosFiltrados);
    }

    // Busca geral
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

    // Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tipo = this.dataset.tipo;
            const filtro = this.dataset.filtro;

            // Remover classe active de todos os botões
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

    buscarMarcaBtn.addEventListener('click', function() {
        const marca = filtroMarca.value.trim();
        filtrosAtivos.marca = marca || null;
        aplicarFiltros();
    });

    aplicarPrecoBtn.addEventListener('click', function() {
        const precoMin = parseFloat(precoMinInput.value);
        const precoMax = parseFloat(precoMaxInput.value);

        filtrosAtivos.precoMin = isNaN(precoMin) ? null : precoMin;
        filtrosAtivos.precoMax = isNaN(precoMax) ? null : precoMax;

        aplicarFiltros();
    });

    limparFiltrosBtn.addEventListener('click', function() {
        // Limpar filtros
        filtrosAtivos = {
            tipo: null,
            marca: null,
            precoMin: null,
            precoMax: null
        };

        // Limpar inputs
        filtroMarca.value = '';
        precoMinInput.value = '';
        precoMaxInput.value = '';

        // Remover classe active dos botões
        filterBtns.forEach(btn => btn.classList.remove('active'));

        // Exibir todos os veículos
        exibirVeiculos(veiculos);
    });

    botaoBusca.addEventListener('click', function() {
        buscarGeral(buscaGeralInput.value.trim());
    });

    buscaGeralInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            buscarGeral(this.value.trim());
        }
    });

    // Inicializar
    carregarDados();
});