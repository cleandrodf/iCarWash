# Dicionário Inicial de Indicadores do Piloto

**Projeto:** ZeloGO
**Etapa:** Mobilização e descoberta  
**Última atualização:** 22 de setembro de 2026

Os indicadores abaixo são uma proposta inicial. As metas, fontes definitivas e responsáveis devem ser aprovados no Gate G1. Nenhum indicador deve ser usado para decisão executiva sem definição de período, população, filtros e limitações.

| Indicador | Definição | Fórmula | Fonte inicial | Frequência | Responsável |
|---|---|---|---|---|---|
| Parceiros convidados | Parceiros contatados para participar | Contagem de contatos válidos | Registro de prospecção | Semanal | Operações |
| Parceiros ativados | Parceiros com perfil, serviço e agenda válidos | Contagem de parceiros ativos | PostgreSQL | Diário | Operações |
| Horários publicados | Slots disponíveis para reserva | Contagem de slots ativos | PostgreSQL | Diário | Operações |
| Solicitações válidas | Pedidos com dados obrigatórios aceitos | Contagem de bookings válidos | API/PostgreSQL | Diário | Produto |
| Taxa de confirmação | Pedidos confirmados entre solicitações | Confirmados / solicitações | API/PostgreSQL | Diário e semanal | Operações |
| Tempo de confirmação | Tempo entre criação e resposta do parceiro | Mediana e p90 em minutos | Eventos de status | Diário e semanal | Produto |
| Taxa de conclusão | Serviços concluídos entre confirmados | Concluídos / confirmados | API/PostgreSQL | Semanal | Operações |
| Taxa de cancelamento | Pedidos cancelados entre confirmados | Cancelados / confirmados | API/PostgreSQL | Semanal | Operações |
| Satisfação | Avaliação média pós-serviço | Soma das notas / respostas válidas | Avaliações | Semanal | Produto |
| Retorno em 30 dias | Clientes que fazem novo pedido | Clientes recorrentes / clientes atendidos | PostgreSQL | Mensal | Produto |
| Erros da API | Requisições com erro não esperado | Erros 5xx / requisições | Logs | Diário | Tecnologia |
| Disponibilidade | Tempo em que o serviço responde adequadamente | Minutos disponíveis / minutos observados | Monitoramento | Diário e mensal | Tecnologia |
| Taxa de alternativas viáveis | Buscas qualificadas com pelo menos três alternativas viáveis | Buscas com 3+ alternativas / buscas qualificadas | Registro de buscas | Diário e semanal | Produto/Operações |
| Parceiros transacionando | Parceiros que receberam e responderam a uma solicitação real | Contagem de parceiros transacionando | Registro de transações | Semanal | Operações |
| Receita incremental do parceiro | Receita atribuível ao ZeloGO que não ocorreria sem a plataforma | Receita atribuível observada | Entrevista e registro do parceiro | Por coorte | Negócio |
| Ocupação incremental | Horários ociosos preenchidos pelo ZeloGO | Horários preenchidos / horários ociosos elegíveis | Agenda e registro do parceiro | Semanal | Operações |
| Retorno líquido do parceiro | Receita incremental menos tarifas, descontos e custos incrementais | Receita incremental − custos incrementais | Registro econômico | Por experimento | Negócio/Finanças |
| Custo por serviço concluído | Custos incrementais de aquisição, suporte e operação por conclusão | Custos incrementais / serviços concluídos | Log operacional e financeiro | Semanal | Gerente/Finanças |

## Metas de referência para discussão

O plano macro propõe, para validação no piloto, pelo menos 10 parceiros ativados, 100 solicitações válidas, 70% de confirmação, 80% de conclusão sobre confirmados, mediana de confirmação inferior a 15 minutos no horário comercial e satisfação média igual ou superior a 4,2 em uma escala de 1 a 5.

Esses valores são hipóteses de gestão. A equipe deve confirmar se a amostra, o período e a capacidade operacional tornam as metas interpretáveis. Uma meta não deve ser aprovada sem indicar qual decisão será tomada quando ela não for atingida.

## Eventos mínimos a instrumentar

`partner_viewed`, `service_viewed`, `qualified_search`, `booking_started`, `booking_created`, `partner_contacted`, `booking_confirmed`, `booking_rejected`, `booking_cancelled`, `booking_completed`, `manual_intervention_logged`, `notification_sent`, `notification_failed` e `review_submitted`.

## Referências

[1]: https://github.com/cleandrodf/iCarWash/blob/main/docs/Plano-Macro-Projeto-ZeloGO-v1.2.docx "Plano Macro do Projeto ZeloGO — Versão 1.2"
