# Definição do MVP — ZeloGO

**Status:** decisões iniciais confirmadas  
**Piloto:** Brasília, Distrito Federal, Brasil  
**Data:** 22 de setembro de 2026  
**Autor:** Manus AI

## Proposta

O ZeloGO conecta clientes a estabelecimentos e profissionais de lavagem e cuidados automotivos. A primeira vertical é lavagem automotiva, com validação específica para carros e motocicletas. O cliente pode solicitar atendimento em uma unidade física ou em seu próprio endereço. A plataforma sugere preliminarmente as opções mais próximas, apresenta serviços e horários e registra uma solicitação de agendamento.

O parceiro publica sua grade de horários. No MVP, o horário solicitado fica pendente até que o parceiro confirme. O pagamento é realizado diretamente no local do atendimento, sem intermediação financeira pela plataforma.

## Escopo implementado na primeira fatia

A interface pública identifica a localização do cliente mediante permissão do navegador. Caso a permissão não seja concedida, usa a região central de Brasília como referência. Os parceiros são ordenados pela distância aproximada e podem ser filtrados entre atendimento no estabelecimento e atendimento móvel.

Cada parceiro apresenta avaliação, bairro, modalidades, serviços, preços e próximos horários. O cliente escolhe uma oferta e envia nome, telefone e descrição do veículo. Para atendimento móvel, o endereço é obrigatório. A solicitação é criada com o estado `pending_partner`.

## Regras confirmadas

| Tema | Decisão do MVP |
|---|---|
| Região piloto | Brasília, Distrito Federal |
| Modalidades | No estabelecimento e no endereço do cliente |
| Ordenação | Proximidade aproximada em relação ao cliente |
| Disponibilidade | Grade publicada pelo parceiro |
| Confirmação | Manual pelo parceiro |
| Pagamento | Diretamente no atendimento |
| Banco de dados | PostgreSQL gerenciado na nuvem |
| Execução de desenvolvimento | Aplicação local |

## Critérios de aceite da busca

A aplicação deve funcionar mesmo quando o usuário recusar a localização. Nesse caso, os resultados usam uma coordenada padrão de Brasília. Quando a localização for autorizada, a busca deve ser refeita e ordenar os parceiros pela distância calculada.

O filtro de modalidade deve ocultar ofertas incompatíveis. Um parceiro só aparece quando possui ao menos um serviço ativo na modalidade selecionada. Cada resultado deve informar que a distância é aproximada.

## Critérios de aceite do agendamento

O agendamento deve exigir parceiro, serviço, horário, nome, telefone e veículo. Atendimento móvel também exige endereço. A API deve rejeitar horário inexistente, encerrado ou sem capacidade.

A reserva deve incrementar a ocupação do horário dentro da mesma transação que cria o agendamento. O estado inicial deve ser `pending_partner`, e a resposta deve informar ao cliente que o parceiro ainda precisa confirmar.

## Limitações conhecidas

O cálculo inicial usa distância em linha reta e não considera rotas ou trânsito. A interface ainda não autentica clientes nem parceiros. O modo sem banco usa dados demonstrativos e não preserva solicitações depois que o processo é reiniciado. Os parceiros apresentados no seed são exemplos de desenvolvimento, não estabelecimentos validados comercialmente.

## Próximo incremento

O próximo incremento deve acrescentar autenticação e papéis, portal do parceiro, gestão da grade, confirmação ou rejeição do agendamento e painel administrativo. Também deve substituir os dados demonstrativos por parceiros reais do piloto e definir termos, política de cancelamento e tratamento de dados pessoais.

## Referências

Não foram utilizadas fontes externas para definir o produto. As decisões registradas neste documento foram fornecidas pelo responsável do projeto.
