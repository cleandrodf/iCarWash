# LavaMarket

Marketplace de serviços de lavagem automotiva para Brasília. O MVP permite localizar parceiros próximos, filtrar atendimento no estabelecimento ou no endereço do cliente, consultar serviços e horários e solicitar um agendamento com pagamento no local.

## Estado atual

A primeira fatia funcional está pronta para desenvolvimento local. Sem banco configurado, a aplicação usa dados demonstrativos de Brasília. Com `DATABASE_URL`, parceiros, horários e agendamentos passam a usar PostgreSQL remoto.

## Arquitetura

- **Frontend:** React 19, Vite e TypeScript
- **API:** Node.js, Express e Zod
- **Banco:** PostgreSQL gerenciado no Neon
- **Persistência:** Drizzle ORM e migrações SQL
- **Busca inicial:** geolocalização do navegador e distância de Haversine

As decisões técnicas e a comparação de provedores estão em [`docs/architecture.md`](docs/architecture.md). A definição funcional está em [`docs/product.md`](docs/product.md).

## Executar localmente

É necessário Node.js 22 e pnpm.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

A interface ficará disponível em `http://localhost:5173` e a API em `http://localhost:3001`.

Para experimentar sem banco, remova ou deixe vazia a variável `DATABASE_URL` no `.env`. A tela indicará que está usando o ambiente demonstrativo.

## Configurar o PostgreSQL na nuvem

Crie um projeto gratuito no [Neon](https://neon.com/), copie a URL de conexão agrupada e salve-a somente no `.env`:

```dotenv
DATABASE_URL=postgresql://usuario:senha@host/banco?sslmode=verify-full
```

Em seguida, gere e aplique o esquema e carregue os dados iniciais:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

O arquivo `.env` nunca deve ser enviado ao GitHub. Quando um projeto Neon temporário for transferido para outra conta, a senha antiga é revogada; copie a nova URL de conexão do painel e atualize o arquivo local.

## Validação

```bash
pnpm check
pnpm test
pnpm build
```

## Endpoints iniciais

| Método | Caminho | Finalidade |
|---|---|---|
| GET | `/api/health` | Verifica a API e informa se o banco está configurado |
| GET | `/api/partners/nearby?lat=&lng=&mode=` | Lista parceiros ordenados por distância aproximada |
| POST | `/api/bookings` | Cria uma solicitação pendente de confirmação |

## Próximos incrementos

1. Autenticação e autorização para cliente, parceiro e administrador.
2. Portal do parceiro com grade de horários e confirmação de solicitações.
3. Painel administrativo e entrada de parceiros reais.
4. Busca geoespacial com PostGIS e distância por rota.
5. Notificações e política de cancelamento.

## Aviso sobre os dados de demonstração

Nomes, endereços, preços, avaliações e horários do seed são fictícios e servem apenas para desenvolvimento. Eles não representam ofertas comerciais reais.
