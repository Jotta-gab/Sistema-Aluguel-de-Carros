<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=3498db&height=120&section=header"/>

[![Typing SVG](https://readme-typing-svg.herokuapp.com/?color=fff&size=35&center=true&vCenter=true&width=1000&lines=Tô+de+Carro)](https://git.io/typing-svg)

# Sobre o projeto
O Sistema de Aluguel de Carros é uma plataforma desenvolvida para facilitar a gestão de aluguéis de automóveis, permitindo que clientes realizem pedidos, alterações e cancelamentos de forma simples e rápida pela internet. Além disso, agentes como empresas e bancos podem avaliar e aprovar contratos de aluguel com base em critérios financeiros.

O sistema registra informações essenciais sobre os contratantes, veículos e contratos de crédito, garantindo um processo seguro e organizado. Com uma interface intuitiva, ele proporciona uma experiência eficiente tanto para clientes quanto para agentes envolvidos no processo.

# Diagrama de Caso de Uso
<img width="2992" alt="Image" src="/Artefatos/Diagramas/diagrama caso de uso.png" />

# Diagrama de Pacotes
<img width="2992" alt="Image" src="/Artefatos/Diagramas/Diagrama de Pacotes.png" />

# Diagrama de Componentes
<img width="2992" alt="Image" src="/Artefatos/Diagramas/Diagrama de Componentes Pds.png" />

# Histórias de Usuário
| ID  | História de Usuário |
|----|--------------------|
| UC1  | Como cliente, quero poder me cadastrar no sistema, para que eu possa acessar as funcionalidades de pedido de aluguel. |
| UC2  | Como cliente, quero poder introduzir um pedido de aluguel, para que eu possa solicitar um automóvel de forma prática. |
| UC3  | Como cliente, quero poder modificar os detalhes do meu pedido de aluguel, para corrigir ou ajustar informações caso necessário. |
| UC4  |Como cliente, quero poder consultar o status do meu pedido de aluguel, para acompanhar seu andamento e saber se foi aprovado. |
| UC5  |Como cliente, quero poder cancelar um pedido de aluguel em aberto, para evitar cobranças indevidas ou mudanças de planos. |
| UC6  | Como agente, quero poder modificar os detalhes de um pedido de aluguel, para garantir que ele esteja completo e correto antes da avaliação. |
| UC7  | Como agente, quero poder avaliar financeiramente os pedidos de aluguel, para verificar se o cliente tem condições de arcar com o pagamento. |
| UC8  | Como Administrador, quero gerenciar os pedidos e contratos de aluguel, para que todas as informações fiquem organizadas e acessíveis. | 
| UC9  | Como Administrador, quero registrar e armazenar dados de clientes, automóveis e contratos, para garantir que as informações estejam sempre disponíveis e seguras. | 


# Diagrama de Classes
<img width="2512" alt="Image" src="/Artefatos/Diagramas/diagrama de classes.png" />

# Estrutura dos Diretórios

```
aluguel/
│
└── src/
    │
    └── main/
        │
        ├── java/
        │   └── com/
        │       └── todecarro/
        │           └── aluguel/
        │               │
        │               ├── config/
        │               │   └── CorsConfig.java
        │               │
        │               ├── controller/
        │               │   └── AuthController.java
        │               │   └── ContratoController.java
        │               │   └── PaymentController.java
        │               │   └── PedidoController.java
        │               │   └── VeiculoController.java
        │               │
        │               ├── model/
        │               │   └── Contrato.java
        │               │   └── Pedido.java
        │               │   └── Usuario.java
        │               │   └── Veiculo.java
        │               │
        │               ├── repository/
        │               │   └── ContratoRepository.java
        │               │   └── PedidoRepository.java
        │               │   └── UsuarioRepository.java
        │               │   └── VeiculoRepository.java
        │               │
        │               ├── service/
        │               │   └── ContratoService.java
        │               │   └── PedidoService.java
        │               │   └── UsuarioService.java
        │               │   └── VeiculoService.java
        │               │
        │               └── AluguelApplication.java
        │
        └── resources/
            │
            ├── application.properties
            │
            ├── static/
            │   ├── administrador.html
            │   ├── agente.html
            │   ├── avaliacao.html
            │   ├── cadastrar.html
            │   ├── cadastrarContrato.html
            │   ├── cadastrarVeiculo.html
            │   ├── cliente.html
            │   ├── imagens.json
            │   ├── index.html
            │   ├── listarContratos.html
            │   ├── login.html
            │   ├── meusPedidos.html
            │   ├── nossosVeiculos.html
            │   ├── novoPedido.html
            │   ├── visualizarVeiculos.html
            │   │
            │   ├── css/
            │   │   ├── administrador.css
            │   │   ├── agente.css
            │   │   ├── avaliacao.css
            │   │   ├── cadastrar.css
            │   │   ├── cadastrarContrato.css
            │   │   ├── cadastrarVeiculo.css
            │   │   ├── cliente.css
            │   │   ├── listarContratos.css
            │   │   ├── login.css
            │   │   ├── meusPedidos.css
            │   │   ├── navbar.css
            │   │   ├── nossosVeiculos.css
            │   │   ├── novoPedido.css
            │   │   ├── style.css
            │   │   └── visualizarVeiculos.css
            │   │
            │   ├── img/
            │   │   ├── cta.jpg
            │   │   ├── hero.jpg
            │   │   ├── icone-logo.png
            │   │   └── Todecarro.png
            │   │
            │   └── script/
            │       ├── avaliacao.js
            │       ├── cadastrar.js
            │       ├── cadastrarContrato.js
            │       ├── cadastrarVeiculo.js
            │       ├── listarContratos.js
            │       ├── login.js
            │       ├── meusPedidos.js
            │       ├── nossosVeiculos.js
            │       ├── novoPedido.js
            │       ├── script.js
            │       └── visualizarVeiculos.js
```

# Apresentação com Slides
Link do slide: https://www.canva.com/design/DAGjza3u5nM/nRT9KQ1WIoqQIX6oNUa5pg/edit?utm_content=DAGjza3u5nM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
  
<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=3498db&height=120&section=footer"/>
