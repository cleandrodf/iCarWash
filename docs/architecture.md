# Arquitetura inicial do ZeloGO

**Status:** aprovado para o MVP  
**Data:** 22 de setembro de 2026  
**Autor:** Manus AI

## Decisão principal

A aplicação será executada localmente durante o desenvolvimento e usará **PostgreSQL gerenciado na nuvem**. O frontend será construído com React e Vite. A API será implementada com Node.js e Express. O acesso ao banco usará Drizzle ORM, com migrações SQL versionadas no repositório.

A primeira versão cobre uma fatia vertical do ZeloGO: localização do cliente, busca de parceiros por proximidade aproximada, filtro entre atendimento no estabelecimento e atendimento móvel, consulta de serviços e horários, e solicitação de agendamento pendente de confirmação pelo parceiro. A vertical inicial é lavagem e cuidados automotivos. O pagamento permanece no local.

## Alternativas avaliadas

| Abordagem | Trocas envolvidas | Custo inicial | Complexidade de preparação |
|---|---|---:|---|
| React + Express + PostgreSQL no Neon | Mantém a aplicação portátil, oferece PostgreSQL padrão, suspensão automática e ramificações de banco. O plano gratuito limita cada projeto a 0,5 GB e não oferece acordo de disponibilidade. | Gratuito dentro dos limites | Baixa |
| React + Express + PostgreSQL na Aiven | Oferece 1 GB, PostGIS e backups no plano gratuito. A instância gratuita é de nó único e pode ser desligada após inatividade. | Gratuito dentro dos limites | Baixa |
| React + Supabase | Agrega PostgreSQL, autenticação, armazenamento e APIs. Reduz trabalho inicial, mas aumenta o acoplamento à plataforma e projetos gratuitos pausam após uma semana de inatividade. | Gratuito dentro dos limites | Média |

O **Neon** foi selecionado para o desenvolvimento do MVP. Ele mantém a camada de dados próxima de PostgreSQL padrão, oferece `PostGIS` quando a busca geoespacial precisar evoluir e simplifica ambientes de desenvolvimento com ramificações. Seu plano gratuito permanente inclui 100 horas de unidade computacional por projeto, 0,5 GB de armazenamento e suspensão automática após cinco minutos de inatividade.[1]

A Aiven permanece como alternativa caso o limite de armazenamento ou a disponibilidade de backup do plano gratuito se torne mais importante. Seu plano gratuito informa 1 GB de armazenamento, 1 GB de memória, uma CPU e extensões como PostGIS.[2] O Supabase é uma alternativa apropriada se autenticação e armazenamento integrados passarem a ser prioridades; seu plano gratuito oferece banco de 500 MB, dois projetos ativos e pausa após uma semana de inatividade.[3]

## Organização da aplicação

O diretório `client` contém a interface pública. O diretório `server` contém a API, regras de consulta e serviços de domínio. O diretório `drizzle` mantém o modelo relacional e as migrações. Contratos compartilhados ficam em `shared`.

A aplicação entra em **modo demonstrativo** quando `DATABASE_URL` não está definida. Nesse modo, parceiros e horários de Brasília são carregados em memória, o que permite desenvolver a interface sem dependência externa. Quando a variável é configurada, consultas e agendamentos usam o PostgreSQL remoto.

## Proximidade no MVP

A localização do cliente é obtida pela API de geolocalização do navegador, mediante permissão. O frontend envia latitude e longitude à API. Nesta primeira versão, a API calcula a distância em linha reta pela fórmula de Haversine e ordena os parceiros.

Esse cálculo é adequado para uma sugestão preliminar. Ele não representa distância viária nem tempo de deslocamento. Uma evolução deverá usar PostGIS para filtragem eficiente e um serviço de rotas para calcular distância real por vias.

## Segurança e privacidade

Credenciais nunca são versionadas. O arquivo `.env` está ignorado pelo Git e somente `.env.example` faz parte do repositório. A API valida entradas com Zod e limita o corpo JSON. A criação do agendamento bloqueia o horário em uma transação para reduzir dupla reserva.

O MVP ainda não possui autenticação. Antes de disponibilizar o sistema a clientes reais, serão necessárias autenticação, autorização por papéis, consentimento de localização, política de privacidade, trilha de auditoria e revisão dos dados pessoais coletados em relação à Lei Geral de Proteção de Dados Pessoais.

## Evolução prevista

A próxima etapa deve implementar autenticação, portal do parceiro, confirmação e rejeição de agendamentos, bloqueio de agenda e painel administrativo. Em seguida, a busca poderá migrar para PostGIS, mantendo coordenadas com índice geoespacial e raio de atendimento para parceiros móveis.

## Referências

[1]: https://neon.com/pricing "Neon Pricing Plans"
[2]: https://aiven.io/free-postgresql-database "Free managed PostgreSQL database"
[3]: https://supabase.com/pricing "Supabase Pricing"
