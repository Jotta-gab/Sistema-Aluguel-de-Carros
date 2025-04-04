document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Vehicle Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vehicleGrid = document.querySelector('.vehicle-grid');
    
    // Dados dos veículos
    const vehicles = [
        {
            marca: 'Chevrolet',
            modelo: 'Onix',
            ano: '2023',
            preco: 120,
            tipo: 'popular',
            imagem: 'https://garagem360.com.br/wp-content/uploads/2023/09/Chevrolet-Onix-LT-1.0-2024-2.jpg'
        },
        {
            marca: 'Volkswagen',
            modelo: 'Gol',
            ano: '2022',
            preco: 110,
            tipo: 'popular',
            imagem: 'https://www.otempo.com.br/content/dam/otempo/editorias/autotempo/2019/4/autotempo-eb098a80079169f8b4bb4f0c2e92bf79ljpg-1708402999.jpeg'
        },
        {
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: '2024',
            preco: 250,
            tipo: 'sedan',
            imagem: 'https://www.toyotacomunica.com.br/wp-content/uploads/2023/09/pagina-24_COROLLA-2024_GR-S_2.png'
        },
        {
            marca: 'Honda',
            modelo: 'Civic',
            ano: '2023',
            preco: 230,
            tipo: 'sedan',
            imagem: 'https://s2-autoesporte.glbimg.com/Dp4LcpaI94nP_6U05jwTnQwKaQg=/0x0:990x593/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2024/9/e/KdzyFGTwe3xeoGLKPHhA/honda-civic-rs.jpg'
        },
        {
            marca: 'Toyota',
            modelo: 'SW4',
            ano: '2024',
            preco: 350,
            tipo: 'suv',
            imagem: 'https://www.webmotors.com.br/imagens/prod/348919/TOYOTA_HILUX_SW4_2.8_D4D_TURBO_DIESEL_GRS_7L_4X4_AUTOMATICO_34891920073251290.webp'
        },
        {
            marca: 'BMW',
            modelo: '320i',
            ano: '2024',
            preco: 500,
            tipo: 'luxo',
            imagem: 'https://www.webmotors.com.br/imagens/prod/379788/BMW_320I_2.0_16V_TURBO_FLEX_M_SPORT_10TH_ANNIVERSARY_EDITION_AUTOMATICO_37978816361668197.webp'
        },
        {
            marca: 'Honda',
            modelo: 'Biz',
            ano: '2024',
            preco: 80,
            tipo: 'motos',
            imagem: 'https://www.honda.com.br/motos/sites/hda/files/2024-08/imagem-home-honda-biz-125-ex-lateral-azul.webp'
        }
    ];
    
    // Exibir veículos
    function displayVehicles(filter = 'all') {
        vehicleGrid.innerHTML = '';
        
        const filteredVehicles = filter === 'all' 
            ? vehicles 
            : vehicles.filter(vehicle => vehicle.tipo === filter);
        
        filteredVehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.className = 'vehicle-card';
            vehicleCard.innerHTML = `
                <div class="vehicle-image" style="background-image: url('${vehicle.imagem}')"></div>
                <div class="vehicle-details">
                    <h3>${vehicle.marca} ${vehicle.modelo}</h3>
                    <div class="vehicle-meta">
                        <span>${vehicle.ano}</span>
                        <span>${vehicle.tipo.toUpperCase()}</span>
                    </div>
                    <div class="vehicle-price">R$ ${vehicle.preco.toFixed(2)}/dia</div>
                    <div class="vehicle-type">${formatVehicleType(vehicle.tipo)}</div>
                </div>
            `;
            vehicleGrid.appendChild(vehicleCard);
        });
    }
    
    // Formatar tipo do veículo
    function formatVehicleType(type) {
        const types = {
            'popular': 'Popular',
            'sedan': 'Sedan',
            'suv': 'SUV',
            'luxo': 'Luxo',
            'motos': 'Moto'
        };
        return types[type] || type;
    }
    
    // Filtro de veículos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.category;
            displayVehicles(filter);
        });
    });
    
    // Inicializar veículos
    displayVehicles();
    
    // =============================================
    // Mapa com Leaflet.js (OpenStreetMap) - GRATUITO
    // =============================================
    function initMap() {
        // Configuração inicial do mapa (coordenadas de Brasília como fallback)
        const map = L.map('map').setView([-15.7889, -47.8792], 12);
        
        // Adiciona o tile layer do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        // Tenta obter a localização do usuário
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLatLng = [position.coords.latitude, position.coords.longitude];
                    
                    // Atualiza a view do mapa
                    map.setView(userLatLng, 15);
                    
                    // Atualiza o texto da localização
                    const userLocationElement = document.getElementById('user-location');
                    userLocationElement.innerHTML = `Você está próximo a: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                    
                    // Adiciona marcador do usuário
                    const userMarker = L.marker(userLatLng, {
                        icon: L.icon({
                            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41]
                        })
                    }).addTo(map);
                    
                    userMarker.bindPopup("<b>Sua localização</b>").openPopup();
                    
                    // Adiciona filiais fictícias próximas (substitua com suas coordenadas reais)
                    const branches = [
                        {
                            name: "Filial Centro",
                            coords: [userLatLng[0] + 0.01, userLatLng[1] + 0.01]
                        },
                        {
                            name: "Filial Zona Sul",
                            coords: [userLatLng[0] - 0.01, userLatLng[1] - 0.01]
                        }
                    ];
                    
                    branches.forEach(branch => {
                        L.marker(branch.coords).addTo(map)
                            .bindPopup(`<b>${branch.name}</b><br>Venha nos visitar!`);
                    });
                },
                function(error) {
                    console.log("Erro ao obter localização:", error);
                    const userLocationElement = document.getElementById('user-location');
                    userLocationElement.textContent = 'Localização não disponível - Ative a geolocalização para uma experiência completa';
                    
                    // Adiciona marcadores padrão (filiais)
                    L.marker([-15.7889, -47.8792]).addTo(map)
                        .bindPopup("<b>Filial Principal</b><br>Brasília - DF");
                }
            );
        } else {
            alert("Seu navegador não suporta geolocalização.");
        }
    }
    
    // Inicializa o mapa após carregar a biblioteca Leaflet
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        console.error("Leaflet.js não carregou corretamente");
    }
    
    // Suavizar rolagem para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});