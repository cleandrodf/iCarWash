# Registro de Evidências — Discovery e Concierge

**Regra central:** registrar comportamento observado e resultado verificável. Declaração hipotética não deve ser tratada como transação.

## 1. Tipos de evidência

| Tipo | Definição | Exemplo |
|---|---|---|
| Entrevista | Relato sobre comportamento recente ou restrição operacional | Cliente contratou lavagem no último mês e descreve a busca |
| Oferta | Parceiro informa serviço, preço, capacidade e disponibilidade | Parceiro aceita avaliar dois horários em uma microrregião |
| Busca qualificada | Cliente informa serviço, modalidade, cluster e janela | Busca que permite verificar alternativas |
| Solicitação | Cliente pede um serviço real e autoriza o contato operacional | Pedido com necessidade concreta |
| Resposta | Parceiro aceita, rejeita ou não responde | Resposta registrada com horário e motivo |
| Conclusão | Serviço ocorreu e foi marcado como concluído ou não concluído | Atendimento concluído com avaliação |
| Economia | Custo, receita ou esforço observado | Minutos de operação por solicitação |
| Incidente | Falha, dano, reclamação, risco ou exceção | Cancelamento, no-show ou reclamação registrada |

## 2. Registro de evidência

| ID | Data | Tipo | Público ou parceiro | Microrregião | Hipótese afetada | Fato observado | Fonte controlada | Confiança | Implicação | Próxima ação |
|---|---|---|---|---|---|---|---|---|---|---|
| EV-001 |  |  |  |  |  |  |  | Baixa/Média/Alta |  |  |

## 3. Registro de busca qualificada

| ID | Data/hora | Microrregião | Serviço | Modalidade | Janela | Alternativas viáveis | Solicitação criada | Resultado | Observação |
|---|---|---|---|---|---|---:|---|---|---|
| BQ-001 |  |  |  |  |  |  |  |  |  |

## 4. Registro de intervenção manual

| ID | Data | Solicitação | Atividade | Canal | Início | Fim | Responsável | Resultado | Custo ou esforço aproximado | Repetível? |
|---|---|---|---|---|---|---|---|---|---|---|
| INT-001 |  |  |  |  |  |  |  |  |  |  |

## 5. Registro de transação

| ID | Solicitação | Parceiro | Serviço | Aceite | Atendimento | Conclusão | Avaliação cliente | Avaliação parceiro | Incidente | Observação |
|---|---|---|---|---|---|---|---:|---:|---|---|
| TX-001 |  |  |  |  |  |  |  |  |  |  |

## 6. Regras de qualidade

Cada registro deve utilizar identificador, não nome completo. Endereço completo, telefone e dados sensíveis devem permanecer fora do repositório. A fonte controlada pode ser um arquivo local protegido, sistema autorizado ou instrumento de pesquisa com acesso restrito.

Uma evidência só poderá apoiar o Gate G0 ou G1 quando tiver data, contexto, fonte, hipótese afetada e implicação registrada. Registros incompletos permanecem como pendências.
