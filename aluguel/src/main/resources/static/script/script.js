document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar-links');
    const navbar = document.querySelector('.admin-navbar');
    
    if (hamburger && navLinks && navbar) {
      hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        const icon = hamburger.querySelector('i');
        if (icon) {
          if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
          } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
          }
        }
      });

let lastScroll = 0;
const navbar = document.querySelector('.admin-navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
    navbar.classList.add('hidden');
  } 
  else if (currentScroll < lastScroll) {
    navbar.classList.remove('hidden');
  }
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i), 100);
        }
    }

    const heroTitle = document.querySelector('.hero h1');
    heroTitle.innerHTML = '';
    typeWriter(heroTitle, 'Alugue seu carro ideal!');

    const filterBtns = document.querySelectorAll('.filter-btn');
    const vehicleGrid = document.querySelector('.vehicle-grid');

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
            imagem: 'https://cdn.motor1.com/images/mgl/YAAopq/s1/volkswagen-gol-1.0-2023.webp'
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

    function displayVehicles(filter = 'all') {
        vehicleGrid.innerHTML = '';
        
        const filteredVehicles = filter === 'all' 
          ? vehicles 
          : vehicles.filter(vehicle => vehicle.tipo === filter);
        
        filteredVehicles.forEach((vehicle) => {
          const vehicleCard = document.createElement('div');
          vehicleCard.className = 'vehicle-card compact';
          vehicleCard.innerHTML = `
            <div class="vehicle-image" style="background-image: url('${vehicle.imagem}')">
              <div class="vehicle-type">${formatVehicleType(vehicle.tipo)}</div>
            </div>
            <div class="vehicle-details">
              <h3>${vehicle.marca} ${vehicle.modelo}</h3>
              <div class="vehicle-meta">
                <span>${vehicle.ano}</span>
                <span>R$ ${vehicle.preco.toFixed(2)}/dia</span>
              </div>
            </div>
          `;
          vehicleGrid.appendChild(vehicleCard);
        });
      }

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
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.category;
            displayVehicles(filter);
        });
    });
    
    displayVehicles();
    
    function initMap() {
        const map = L.map('map').setView([-15.7889, -47.8792], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLatLng = [position.coords.latitude, position.coords.longitude];

                    map.setView(userLatLng, 15);

                    const userLocationElement = document.getElementById('user-location');
                    userLocationElement.innerHTML = `Você está próximo a: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;

                    const userMarker = L.marker(userLatLng, {
                        icon: L.icon({
                            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41]
                        })
                    }).addTo(map);
                    
                    userMarker.bindPopup("<b>Sua localização</b>").openPopup();

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

                    L.marker([-15.7889, -47.8792]).addTo(map)
                        .bindPopup("<b>Filial Principal</b><br>Brasília - DF");
                }
            );
        } else {
            alert("Seu navegador não suporta geolocalização.");
        }
    }

    if (typeof L !== 'undefined') {
        initMap();
    } else {
        console.error("Leaflet.js não carregou corretamente");
    }

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
  
            if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              const icon = hamburger.querySelector('i');
              if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
              }
              document.body.style.overflow = '';
            }
          }
        });
      });

      const observerOptions = {
        threshold: 0.1
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, observerOptions);
  
      document.querySelectorAll('.feature-card, .vehicle-showcase, .location, .cta').forEach(section => {
        observer.observe(section);
      });
    }

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
  
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  });