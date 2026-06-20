# SimulAI - Frontend 

<div style="margin: 0 auto;">
  <img src="src\assets\icons\simulai_logo_full.png" alt="SimulAI Logo">
</div>

Bem-vindo ao repositório Front-End do **SimulAI**, uma plataforma inovadora que utiliza Inteligência Artificial para revolucionar a preparação para entrevistas de emprego. Este projeto representa a refatoração e aprimoramento de um Trabalho de Conclusão de Curso (TCC), elevando-o a um padrão de mercado com as melhores práticas de desenvolvimento.

## 🎓 Contexto Acadêmico e Evolução

Originalmente concebido como um Trabalho de Conclusão de Curso (TCC) em um curso técnico, o projeto SimulAI já demonstrava grande potencial. No entanto, esta versão que você explora agora é o resultado de um esforço dedicado de refatoração. O objetivo foi transformar um bom projeto acadêmico em uma aplicação robusta, componentizada e alinhada com os padrões de desenvolvimento de software modernos. Cada linha de código foi revisada, otimizada e estruturada para garantir escalabilidade, manutenibilidade e uma experiência de usuário superior.

---

O projeto originalmente foi desenvolvido por um grupo de cinco alunos do curso de Desenvolvimento de Sistemas na ETEC, sendo eles: Gabriel Crepaldi, Nicolas Dias, Eduardo Oliveira, Rogério Fernandes e eu, Gabriel William. O desenvolvimento aconteceu em 2024 durante o último semestre do curso. A versão atual é uma refatoração do projeto original, feita por mim.

## 🎯 Propósito de Negócio: Preparação Inteligente para Entrevistas

O SimulAI nasceu da necessidade de oferecer aos candidatos a emprego uma ferramenta eficaz e acessível para aprimorar suas habilidades em entrevistas. Em um mercado de trabalho cada vez mais competitivo, a capacidade de se comunicar de forma clara e confiante é crucial. Nosso aplicativo móvel, alimentado por Inteligência Artificial, permite:

- **Simulações Realistas**: Os usuários podem praticar entrevistas de emprego em um ambiente simulado.
- **Coleta e Análise de Respostas**: A IA coleta as respostas dos candidatos e as analisa em tempo real.
- **Feedback Personalizado**: Feedback detalhado e métricas de desempenho são fornecidos instantaneamente, ajudando o usuário a identificar pontos fortes e áreas de melhoria.

O site, por sua vez, complementa a experiência do aplicativo, servindo como:

- **Landing Page Institucional**: Apresenta o aplicativo, seus benefícios e direciona para o download.
- **Área do Usuário**: Permite que os usuários acompanhem seu progresso, revisem feedbacks e gerenciem suas informações.
- **Área Administrativa**: Oferece aos administradores ferramentas para gerenciar usuários, treinar a IA com novos dados (áudios/PDFs) e monitorar o feedback geral do sistema.

## 🏗️ Análise Técnica e Arquitetura

Esta seção detalha a arquitetura e as escolhas técnicas que impulsionam o Front-End do SimulAI, garantindo performance, escalabilidade e uma experiência de desenvolvimento agradável.

### ⚛️ Stack Principal

- **React**: Biblioteca JavaScript para construção de interfaces de usuário, focada na componentização e reatividade.
- **Vite**: Ferramenta de build de próxima geração que oferece um ambiente de desenvolvimento extremamente rápido e otimizado para produção.

### 🛣️ Roteamento Avançado

O roteamento da aplicação foi cuidadosamente planejado e implementado utilizando as novas APIs do **React Router DOM** (`createBrowserRouter` e `RouterProvider`). A estrutura de rotas é modular e segura, dividida em:

- **`userRoutes`**: Rotas públicas acessíveis a todos os visitantes (e.g., Landing Page, Login, Registro).
- **`authRoutes`**: Rotas restritas que exigem autenticação do usuário (e.g., Dashboard do Usuário, Perfil).
- **`adminRoutes`**: Rotas exclusivas para administradores, com controle de acesso rigoroso (e.g., Gerenciamento de IA, Relatórios).

### 🎨 Estilização com CSS Modules e Responsividade

A estilização é um ponto forte do projeto, utilizando **CSS Modules** para garantir que os estilos sejam encapsulados, evitando conflitos globais e promovendo a manutenibilidade. Cada componente possui seus estilos isolados, resultando em um código CSS limpo e escalável. A responsividade é total, com um design adaptável a qualquer dispositivo móvel, alcançado através do uso inteligente de `clamp()` para tipografia e espaçamento fluidos, e `media queries` consistentes para ajustes de layout.

### 🔄 Gerenciamento de Estado com Context API

Para um gerenciamento de estado eficiente e nativo do React, a aplicação faz uso extensivo da **Context API**. Dois contextos principais foram implementados:

- **`LoadingContext`**: Gerencia o estado global de carregamento da aplicação, ativando e desativando spinners de feedback visual para o usuário.
- **`AuthContext`**: Responsável por gerenciar a sessão do usuário, incluindo informações de autenticação, tokens JWT e permissões de acesso.

### 📡 Comunicação com o Back-End: Axios Interceptors

A comunicação com a API de Back-End é orquestrada pelo **Axios**, uma biblioteca HTTP client baseada em Promises. Um dos aspectos mais sofisticados dessa implementação são os **interceptors**:

- **Injeção de JWT**: Automaticamente injetam o token JWT nas requisições, garantindo que todas as chamadas autenticadas sejam válidas.
- **Atualização de JWT**: Gerenciam a renovação de tokens expirados, garantindo uma sessão contínua e segura.
- **Controle de Loading**: Ativam e desativam os spinners globais de loading antes e depois de cada requisição, proporcionando uma experiência de usuário fluida.

### 📝 Gerenciamento e Validação de Formulários

Para lidar com formulários complexos e garantir a integridade dos dados, o projeto integra:

- **React Hook Form**: Uma biblioteca performática e flexível para gerenciamento de formulários no React.
- **Validator**: Utilizado em conjunto com o React Hook Form para validação robusta e personalizável dos campos de formulário.

### 🔔 Notificações e Feedback Visual

- **React Hot Toast**: Proporciona pop-ups e alertas elegantes e não intrusivos para feedback ao usuário sobre ações, erros ou sucessos.

### 📁 Estrutura de Código Organizada

A organização do código segue um padrão de responsabilidades bem definidas, facilitando a navegação, o desenvolvimento e a manutenção:

- `/api/services`: Lógica de requisições e interação com a API de Back-End.
- `/components`: Componentes React reutilizáveis e genéricos.
- `/context`: Definições e implementações dos Contexts da aplicação.
- `/css`: Arquivos CSS globais e variáveis de estilo.
- `/hooks`: Custom Hooks React para lógica reutilizável.
- `/pages`: Componentes de página, que representam as diferentes telas da aplicação.
- `/routes`: Definição e organização das rotas da aplicação.

## ✨ Funcionalidades Principais

### Para Usuários (Landing Page e Área do Usuário):

- **Download do Aplicativo**: Acesso direto para baixar o aplicativo móvel SimulAI.
- **Visualização de Progresso**: Acompanhamento detalhado do desempenho em simulações de entrevistas.
- **Revisão de Feedback**: Acesso aos feedbacks gerados pela IA após cada simulação.
- **Gerenciamento de Perfil**: Atualização de informações pessoais e configurações da conta.

### Para Administradores (Área Administrativa):

- **Gerenciamento de Usuários**: Visualização, edição e controle de contas de usuários.
- **Treinamento da IA**: Ferramentas para upload de áudios e PDFs para aprimorar o modelo de Inteligência Artificial.
- **Monitoramento de Feedback**: Acompanhamento dos comentários e sugestões dos usuários sobre o sistema.
- **Relatórios e Métricas**: Acesso a dados e análises sobre o uso da plataforma e desempenho da IA.

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto SimulAI Front-End em sua máquina local.

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e o npm (ou yarn) instalados em seu sistema.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd simul-ai-frontend # ou o nome da pasta do seu projeto
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (exemplo):
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    # Outras variáveis de ambiente necessárias...
    ```
    _Certifique-se de que a URL da API de Back-End esteja correta._

### Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, conforme indicado pelo Vite).

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar bugs, sinta-se à vontade para abrir uma issue ou enviar um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
