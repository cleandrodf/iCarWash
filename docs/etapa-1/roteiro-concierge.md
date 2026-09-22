# Roteiro Operacional do Concierge MVP

**Uso:** preparar a operação das semanas 3 e 4 após autorização do G0.  
**Escopo inicial:** carros, em uma microrregião aprovada.  
**Pagamento:** diretamente no atendimento; a plataforma não processará pagamentos.

## 1. Pré-condições

O Concierge só começa depois que o G0 aprovar a microrregião, os parceiros-design, os critérios do G1 e os controles mínimos de segurança e privacidade. Não se deve anunciar disponibilidade antes de confirmar capacidade com o parceiro.

## 2. Preparação do parceiro

Para cada parceiro-design, registrar serviço para carros, preço ou regra de preço, duração estimada, modalidade, região atendida, janelas disponíveis, tempo esperado de resposta, canal de contato, pessoa responsável e restrições de capacidade.

A homologação inicial não representa certificação comercial definitiva. Ela indica apenas que as informações mínimas foram verificadas para o experimento controlado.

## 3. Fluxo de atendimento

1. Receber uma necessidade real de cliente.
2. Confirmar serviço, tipo de carro, região, modalidade e janela.
3. Consultar somente alternativas cuja disponibilidade possa ser confirmada.
4. Apresentar preço ou regra de preço, duração, modalidade e próximo passo.
5. Registrar a solicitação e o horário do acionamento.
6. Acionar o parceiro pelo canal definido.
7. Registrar aceite, rejeição, ausência de resposta ou pedido de esclarecimento.
8. Informar o cliente sem prometer confirmação antes do aceite.
9. Acompanhar o atendimento até conclusão, cancelamento ou falha.
10. Coletar avaliação do cliente e percepção de valor do parceiro.
11. Registrar intervenção manual, tempo, incidente e aprendizado.

## 4. Regras de segurança

No modo móvel, o atendimento só será considerado elegível quando houver orientação de acesso, canal de suporte e entendimento das condições do local. Endereço completo deve ser compartilhado apenas quando necessário e pelo canal controlado. Qualquer dano, comportamento inadequado, suspeita de fraude ou risco físico deve ser escalado e registrado antes de novos atendimentos.

## 5. Estados mínimos

`captured` → `qualified` → `partner_contacted` → `accepted` ou `rejected`/`no_response` → `scheduled` → `completed` ou `cancelled`/`failed`.

Os estados poderão ser ajustados após o primeiro ciclo, mas toda mudança deve preservar data, responsável, motivo e origem do evento.

## 6. Encerramento de cada atendimento

Um atendimento só será marcado como concluído quando o parceiro ou a operação confirmar que o serviço ocorreu. A avaliação do cliente deve ser coletada depois do atendimento. Um atendimento cancelado ou falho deve conter motivo classificável e ação tomada.

## 7. Medição do Concierge

A equipe deverá medir número de buscas qualificadas, alternativas viáveis, solicitações, respostas, confirmações, conclusões, cancelamentos, reclamações, tempo de operação e custo aproximado por solicitação. O custo da intervenção manual é parte do resultado do experimento, não um detalhe administrativo.

## 8. Saída para o G1

O relatório do G1 deve responder se o Concierge provocou transações reais, se os clientes e parceiros perceberam valor, quais gargalos justificam automação e quais riscos impedem a continuidade. O resultado pode ser construir, ajustar, repetir, mudar de cluster, pivotar ou interromper.
