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

## Metas de referência para discussão

O plano macro propõe, para validação no piloto, pelo menos 10 parceiros ativados, 100 solicitações válidas, 70% de confirmação, 80% de conclusão sobre confirmados, mediana de confirmação inferior a 15 minutos no horário comercial e satisfação média igual ou superior a 4,2 em uma escala de 1 a 5.

Esses valores são hipóteses de gestão. A equipe deve confirmar se a amostra, o período e a capacidade operacional tornam as metas interpretáveis. Uma meta não deve ser aprovada sem indicar qual decisão será tomada quando ela não for atingida.

## Eventos mínimos a instrumentar

`partner_viewed`, `service_viewed`, `booking_started`, `booking_created`, `booking_confirmed`, `booking_rejected`, `booking_cancelled`, `booking_completed`, `notification_sent`, `notification_failed` e `review_submitted`.

## Referências

[1]: https://github.com/cleandrodf/iCarWash/blob/main/docs/plano-macro-zelogo.md "Plano Macro do Projeto ZeloGO"
