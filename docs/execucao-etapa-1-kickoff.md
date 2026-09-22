# Execução da Etapa 1 — Mobilização e Descoberta

**Projeto:** iCarWash  
**Etapa:** 1 de 8 — Mobilização e descoberta  
**Status:** em execução  
**Data de início:** 22 de setembro de 2026  
**Duração de referência:** 2 semanas  
**Região piloto:** Brasília, Distrito Federal  
**Versão:** 1.0

## 1. Objetivo desta etapa

A Etapa 1 transforma a proposta preliminar do iCarWash em uma linha de base executiva suficientemente clara para autorizar a construção do MVP operacional. O trabalho não pretende validar toda a operação comercial em duas semanas. Ele deve reduzir as incertezas que poderiam gerar desenvolvimento sem demanda, oferta insuficiente, regras inviáveis ou tratamento inadequado de dados.

Ao final da etapa, o projeto deverá ter uma visão de produto validável, partes interessadas identificadas, hipóteses priorizadas, critérios de sucesso mensuráveis, backlog inicial, riscos registrados e decisões pendentes com responsáveis e prazos. O resultado será submetido ao **Gate G1 — autorização para construir**.

A etapa segue a orientação de adaptação do método ao contexto do projeto. O PMBOK® Guide trata domínios de desempenho como áreas de atividades críticas para produzir resultados e enfatiza a necessidade de ajustar práticas ao ambiente real.[1] [2]

## 2. Situação de partida

A base técnica já existe. O produto dispõe de interface pública, API Node.js, PostgreSQL gerenciado, descoberta preliminar por proximidade, filtros por modalidade e solicitação de agendamento com estado `pending_partner`. A aplicação está publicada no endereço de produção atual e o repositório está versionado no GitHub.

A base ainda é um MVP técnico. Não há autenticação, portal do parceiro, painel administrativo, termos de uso, política de privacidade formalizada, parceiros comerciais validados ou processo de suporte. Portanto, o foco imediato não será adicionar funcionalidades indiscriminadamente. O foco será confirmar **quem deve usar a solução, qual problema tem prioridade, qual operação é possível e quais condições precisam existir antes do piloto real**.

## 3. Resultado esperado da etapa

A Etapa 1 será considerada concluída quando os seguintes resultados estiverem disponíveis:

1. Termo de abertura refinado, com patrocinador, Product Owner, gerente do projeto, tolerâncias e autoridade de decisão designados.
2. Mapa das partes interessadas, incluindo clientes, parceiros, operação, tecnologia, jurídico, fornecedores e canais de aquisição.
3. Pelo menos cinco entrevistas ou sessões de validação com clientes potenciais e cinco com parceiros potenciais, ou justificativa formal para a amostra alternativa.
4. Mapa das jornadas atuais e desejadas para cliente, parceiro e suporte.
5. Proposta de valor e hipóteses priorizadas por impacto e incerteza.
6. Backlog inicial de produto com critérios de aceite para o primeiro ciclo de construção.
7. Indicadores de sucesso do piloto aprovados, com fonte de dados e responsável por cada indicador.
8. Registro de riscos atualizado, com respostas para os riscos altos.
9. Decisões pendentes registradas com proprietário e data limite.
10. Ata do Gate G1 com decisão de construir, ajustar, pausar ou encerrar.

## 4. Escopo de trabalho das duas semanas

| Frente | Trabalho desta etapa | Não será feito nesta etapa |
|---|---|---|
| Produto | Entrevistas, hipóteses, proposta de valor, jornadas e priorização | Construção completa do portal do parceiro |
| Operação | Regras preliminares de cadastro, confirmação, cancelamento e suporte | Operação aberta para clientes reais |
| Tecnologia | Revisão da base, riscos técnicos, eventos necessários e backlog técnico | Migração definitiva para arquitetura de escala |
| Dados e privacidade | Inventário inicial de dados e perguntas para revisão jurídica | Aprovação jurídica definitiva sem responsável designado |
| Mercado | Definição de perfil de parceiro e bairros do piloto | Campanha comercial ampla |
| Gestão | Linha de base, riscos, indicadores, governança e Gate G1 | Aprovação de mudanças fora da autoridade do projeto |

## 5. Plano de trabalho por dia útil

As datas abaixo são uma referência operacional. O gerente do projeto pode reorganizá-las sem alterar o resultado esperado da etapa.

| Dia | Atividade | Evidência de conclusão |
|---:|---|---|
| 1 | Reunião de kickoff e confirmação de papéis | Ata, decisões iniciais e lista de participantes |
| 2 | Revisão do produto atual e análise das hipóteses | Inventário de capacidades, lacunas e perguntas abertas |
| 3 | Preparação e teste do roteiro de entrevistas | Roteiros aprovados e critérios de seleção |
| 4–6 | Entrevistas com clientes potenciais | Registros anonimizados e padrões observados |
| 4–7 | Entrevistas com parceiros potenciais | Necessidades, restrições e objeções registradas |
| 7 | Mapeamento das jornadas e blueprint inicial | Jornada cliente-parceiro-suporte |
| 8 | Priorização de hipóteses, riscos e oportunidades | Matriz de impacto e incerteza |
| 9 | Refinamento do backlog e dos indicadores | Backlog do Ciclo 1 e dicionário de métricas |
| 10 | Comitê de Gate G1 | Ata, decisão e plano da Etapa 2 |

## 6. Papéis e responsabilidades iniciais

Os nomes ainda não foram designados. Até a formalização, os papéis serão tratados por função. Não se deve presumir que a pessoa que atualmente administra o repositório também tenha autoridade para aprovar orçamento, privacidade ou lançamento.

| Papel | Responsabilidade nesta etapa | Estado |
|---|---|---|
| Patrocinador | Aprovar objetivos, tolerâncias, metas e Gate G1 | A designar |
| Gerente do projeto | Coordenar trabalho, decisões, riscos, cronograma e comunicação | A designar |
| Product Owner | Priorizar valor, participar das entrevistas e aceitar backlog | A designar |
| Líder técnico | Avaliar arquitetura, dados, riscos e esforço | A designar |
| Líder de operações | Definir onboarding, atendimento, confirmação e suporte | A designar |
| Responsável por privacidade | Revisar dados, finalidades e controles da LGPD | A designar |
| Parceiros potenciais | Informar capacidade, restrições e disposição de adoção | A convidar |
| Clientes potenciais | Validar problema, linguagem, confiança e intenção de uso | A convidar |

## 7. Registro inicial de partes interessadas

O registro será atualizado após cada entrevista. A classificação inicial indica a estratégia de relacionamento, não uma conclusão sobre a pessoa ou organização.

| Parte interessada | Necessidade ou interesse | Influência | Estratégia inicial | Próxima ação |
|---|---|---:|---|---|
| Patrocinador | Valor, custo, prazo e risco | Alta | Decisões por marco | Designar e realizar kickoff |
| Product Owner | Clareza de problema e priorização | Alta | Participação semanal | Designar e validar backlog |
| Lava-rápidos locais | Demanda, agenda e retorno | Alta | Cocriação e piloto assistido | Selecionar entrevistados |
| Prestadores móveis | Área de atendimento, deslocamento e margem | Alta | Cocriação e teste de regras | Selecionar entrevistados |
| Proprietários de veículos | Conveniência, preço e confiança | Alta | Entrevistas e testes de jornada | Selecionar entrevistados |
| Atendimento e suporte | Resolução de falhas e conflitos | Média | Blueprint e simulações | Definir processo inicial |
| Jurídico e privacidade | Finalidade, contratos e direitos | Alta | Consulta antecipada | Designar responsável |
| Tecnologia | Viabilidade, qualidade e segurança | Alta | Refinamento técnico | Estimar backlog |
| Provedores de nuvem | Limites, disponibilidade e custo | Média | Monitoramento contratual | Registrar dependências |
| Canais de aquisição | Alcance e custo por cliente | Média | Pesquisa de alternativas | Levantar hipóteses |

## 8. Roteiro de descoberta com clientes

As entrevistas devem durar entre 30 e 45 minutos. O objetivo é entender o comportamento atual, não vender uma solução nem induzir respostas positivas. Os registros devem evitar dados pessoais desnecessários e utilizar identificadores anônimos.

Perguntas principais:

1. Quando foi a última vez que você precisou lavar o carro e como resolveu?
2. O que foi mais difícil na busca, comparação ou contratação?
3. Como você escolheu o estabelecimento ou profissional?
4. Com que antecedência costuma agendar?
5. Você prefere levar o carro ao estabelecimento ou receber o serviço no endereço? Em quais situações?
6. O que precisa saber antes de confiar em um prestador?
7. Como prefere receber confirmação, lembrete e aviso de alteração?
8. O que faria você abandonar uma solicitação?
9. Como avalia preço, tempo, distância e qualidade na decisão?
10. O que tornaria provável o uso recorrente de uma plataforma desse tipo?

As respostas serão agrupadas por comportamento observado, dor recorrente, linguagem utilizada, solução atual, objeção e evidência de intenção. Declarações hipotéticas como “eu usaria” terão peso menor do que relatos de comportamento recente.

## 9. Roteiro de descoberta com parceiros

As entrevistas com parceiros devem incluir estabelecimentos físicos e prestadores móveis. O roteiro deve distinguir o que é problema de gestão da agenda, aquisição de clientes, execução do serviço e recebimento.

Perguntas principais:

1. Como chegam atualmente novos clientes?
2. Como a disponibilidade é controlada e quem pode alterá-la?
3. Quais serviços, preços, durações e tipos de veículo são oferecidos?
4. Quais horários e bairros têm maior ou menor demanda?
5. Como são tratados atrasos, cancelamentos, ausência e retrabalho?
6. Quanto tempo é aceitável para responder a uma nova solicitação?
7. Quais informações do cliente são necessárias para aceitar um pedido?
8. O que impediria o uso diário de um portal ou aplicativo?
9. Qual modelo de cobrança seria compreensível e aceitável?
10. Que evidência faria o parceiro confiar na plataforma durante um piloto?

A pesquisa deverá confirmar se o parceiro aceita uma agenda publicada, uma confirmação manual e o pagamento no local. Se esses elementos forem rejeitados, o backlog e a proposta de valor deverão ser reavaliados antes da construção.

## 10. Hipóteses a validar

| ID | Hipótese | Evidência desejada | Prioridade |
|---|---|---|---:|
| H1 | Clientes valorizam encontrar opções próximas com horário disponível | Relatos recentes e teste de jornada | 1 |
| H2 | A diferença entre estabelecimento e atendimento móvel é relevante | Preferência contextual e intenção de uso | 1 |
| H3 | Parceiros aceitarão publicar horários se puderem confirmar manualmente | Entrevistas e teste de protótipo | 1 |
| H4 | O pagamento no local reduz a barreira inicial do MVP | Objeções ao pagamento online | 2 |
| H5 | Confirmação em até 15 minutos é percebida como adequada | Expectativa de clientes e parceiros | 2 |
| H6 | Avaliação, fotos e transparência de preço aumentam confiança | Teste de conceitos | 2 |
| H7 | Brasília possui concentração inicial de oferta suficiente para um piloto | Mapeamento de parceiros por bairro | 1 |
| H8 | O parceiro prefere receber demanda qualificada a administrar uma agenda complexa | Entrevistas e simulação operacional | 1 |
| H9 | O modelo de monetização pode ser testado sem pagamento online | Conversas com parceiros e teste de proposta | 3 |

Uma hipótese será considerada validada somente quando houver evidência observável e critério definido. Hipóteses não confirmadas serão reformuladas, não tratadas como falha pessoal dos entrevistados.

## 11. Backlog inicial orientado a resultado

O backlog abaixo é a entrada recomendada para a primeira construção após o Gate G1. A prioridade poderá mudar conforme as entrevistas.

| ID | Item | Resultado esperado | Critério de aceite inicial | Prioridade |
|---|---|---|---|---:|
| B01 | Autenticação e papéis | Usuários acessam apenas o que lhes compete | Cliente, parceiro e administrador têm permissões separadas e testes de autorização | 1 |
| B02 | Perfil e veículo do cliente | Pedido pode ser feito sem redigitação recorrente | Cliente mantém dados mínimos e pode editar ou remover veículo | 1 |
| B03 | Onboarding de parceiro | Oferta real entra na plataforma com controle | Parceiro informa identidade comercial, contato, modalidade e dados de atendimento | 1 |
| B04 | Catálogo do parceiro | Cliente entende oferta e preço | Serviço contém nome, duração, preço, modalidade e status ativo | 1 |
| B05 | Agenda e bloqueios | Disponibilidade publicada reflete capacidade real | Parceiro cria, bloqueia e altera horários sem dupla reserva | 1 |
| B06 | Confirmação e rejeição | Pedido tem ciclo de vida completo | Parceiro confirma ou rejeita e cliente vê o novo estado | 1 |
| B07 | Cancelamento e reagendamento | Exceções são tratadas de forma previsível | Regras e motivos ficam registrados para cliente e parceiro | 2 |
| B08 | Notificações básicas | Pessoas sabem quando precisam agir | Pedido, confirmação, rejeição e cancelamento geram aviso | 2 |
| B09 | Painel administrativo | Operação consegue intervir com rastreabilidade | Administrador consulta e registra ações sem editar dados silenciosamente | 1 |
| B10 | Eventos e métricas | Funil e operação podem ser medidos | Eventos críticos têm nome, propriedade e fonte documentados | 1 |
| B11 | Política de privacidade e consentimento | Tratamento de dados é transparente | Usuário acessa política e registra escolhas aplicáveis | 1 |
| B12 | Avaliação pós-serviço | Qualidade pode ser acompanhada | Cliente avalia atendimento concluído uma vez | 3 |

## 12. Indicadores que serão definidos nesta etapa

A equipe deverá aprovar um dicionário de métricas com definição, fórmula, fonte, periodicidade, responsável e ação associada. A lista inicial é:

| Indicador | Fórmula resumida | Fonte inicial | Decisão apoiada |
|---|---|---|---|
| Parceiros convidados | Quantidade de parceiros contatados | CRM ou planilha controlada | Ritmo de aquisição |
| Parceiros ativados | Parceiros com oferta e agenda válidas | Banco de produção | Cobertura de oferta |
| Horários publicados | Slots ativos disponíveis | Banco de produção | Liquidez da agenda |
| Solicitações | Pedidos criados com dados válidos | API e banco | Demanda |
| Taxa de confirmação | Pedidos confirmados / solicitações | API e banco | Qualidade da operação |
| Tempo de confirmação | Mediana entre pedido e resposta | Eventos de pedido | SLA e treinamento |
| Taxa de conclusão | Serviços concluídos / confirmados | API e banco | Entrega de valor |
| Cancelamento | Cancelados / pedidos confirmados | API e banco | Confiabilidade |
| Satisfação | Média das avaliações válidas | Avaliações | Qualidade percebida |
| Retorno | Clientes com novo pedido em 30 dias | Banco e eventos | Retenção |

As metas de referência do plano macro — 10 parceiros, 100 solicitações válidas, 70% de confirmação, 80% de conclusão sobre confirmados, mediana de confirmação inferior a 15 minutos e satisfação mínima de 4,2 — serão tratadas como hipóteses de meta até serem aprovadas no Gate G1.

## 13. Registro inicial de riscos e respostas imediatas

| ID | Risco | Exposição inicial | Resposta na Etapa 1 | Proprietário provisório |
|---|---|---:|---|---|
| R1 | Não haver oferta suficiente por bairro | Alta | Mapear parceiros e definir cobertura mínima | Operações |
| R2 | Parceiro não responder rapidamente | Alta | Validar SLA e desenhar alertas e expiração | Produto |
| R3 | Usuário não confiar em parceiro desconhecido | Alta | Testar prova social, preço, fotos e políticas | Produto |
| R4 | Regras de cancelamento serem ambíguas | Alta | Entrevistar casos reais e definir cenários | Operações/Jurídico |
| R5 | Dados de localização e endereço serem excessivos | Alta | Inventariar dados e revisar finalidade | Privacidade |
| R6 | Papéis de decisão permanecerem indefinidos | Alta | Designar patrocinador, gerente e Product Owner | Patrocinador |
| R7 | Construção começar sem critérios de sucesso | Média | Aprovar dicionário de métricas no G1 | Gerente |
| R8 | Plano gratuito não suportar operação comercial | Média | Definir gatilhos de migração e orçamento | Tecnologia |
| R9 | Escopo crescer para pagamentos antes da validação | Média | Manter pagamento no local e controlar mudanças | Product Owner |
| R10 | Dados demonstrativos serem confundidos com parceiros reais | Média | Separar ambientes e rotular dados | Tecnologia/Operações |

## 14. Critérios para o Gate G1

O Gate G1 não exige que todas as incertezas desapareçam. Ele exige que as incertezas relevantes estejam visíveis e que o custo de continuar seja justificável.

A recomendação de **aprovar a construção** dependerá de:

- patrocinador, gerente e Product Owner designados;
- segmento inicial de cliente e perfil de parceiro definidos;
- pelo menos uma dor relevante confirmada em cada lado do marketplace;
- cobertura inicial de parceiros suficiente para o bairro ou conjunto de bairros escolhido;
- hipótese de valor compreensível e testável;
- backlog do primeiro ciclo estimado e compatível com a capacidade da equipe;
- riscos jurídicos e de privacidade sem bloqueio desconhecido;
- metas do piloto, fontes de dados e responsáveis aprovados;
- decisão explícita sobre manter pagamento no local no próximo incremento;
- plano de comunicação e cadência de decisão estabelecidos.

Se um critério crítico não for atendido, o Gate G1 deve aprovar uma etapa adicional de descoberta, limitar o escopo ou pausar a construção. A aprovação não deve ser presumida apenas porque a base técnica já está disponível.

## 15. Comunicação e registro de evidências

Cada entrevista terá um identificador, data, perfil geral do participante, consentimento para registro quando aplicável, síntese dos fatos observados e implicações para o produto. Dados pessoais desnecessários não serão copiados para o repositório.

O gerente manterá um diário de decisões com a seguinte estrutura:

| Campo | Conteúdo |
|---|---|
| ID | Identificador sequencial da decisão |
| Data | Data da decisão |
| Contexto | Problema ou oportunidade |
| Alternativas | Opções consideradas |
| Decisão | Escolha realizada |
| Responsável | Autoridade que decidiu |
| Impacto | Escopo, prazo, custo, risco ou dados |
| Revisão | Data ou condição para reavaliar |

O status semanal deverá apresentar progresso, entregas concluídas, evidências obtidas, riscos novos, decisões necessárias e plano da semana seguinte. Esse status será curto e orientado a ação.

## 16. Decisões necessárias do patrocinador

Para que a execução avance sem criar autoridade implícita, ficam abertas as seguintes decisões:

1. Confirmar o patrocinador do projeto.
2. Confirmar quem exercerá o papel de gerente do projeto.
3. Confirmar o Product Owner.
4. Aprovar a amostra e o método de recrutamento dos entrevistados.
5. Aprovar a meta de parceiros e bairros do piloto.
6. Aprovar o limite de orçamento e a disponibilidade da equipe para as próximas seis semanas.
7. Designar o responsável por privacidade e contratos.
8. Confirmar se o nome público continuará como iCarWash ou se LavaMarket será utilizado como marca de interface.

Enquanto essas decisões não forem tomadas, a equipe pode executar preparação, análise da base, roteiros, backlog e descoberta exploratória. Não deve contratar fornecedores, publicar campanha ampla, coletar dados reais em produção ou iniciar desenvolvimento de alto custo sem autorização correspondente.

## 17. Próximo ciclo após o Gate G1

Se o Gate G1 for aprovado, o primeiro ciclo de desenvolvimento terá como objetivo **permitir que um usuário identificado solicite um serviço a um parceiro cadastrado, com disponibilidade controlada e resposta rastreável**.

A ordem recomendada é:

1. Modelar identidade, papéis e permissões.
2. Criar onboarding mínimo de parceiro.
3. Migrar dados demonstrativos para uma estrutura distinguindo demonstração e oferta real.
4. Implementar catálogo e disponibilidade editáveis.
5. Completar confirmação e rejeição do pedido.
6. Instrumentar eventos do funil.
7. Criar testes de autorização e concorrência de agenda.
8. Demonstrar o fluxo ponta a ponta no encerramento do ciclo.

## 18. Referências

[1]: https://www.pmi.org/standards/pmbok "PMBOK Guide — Project Management Institute"
[2]: https://www.pmi.org/-/media/pmi/documents/public/pdf/pmbok-standards/pmbok-project-performance-domains.pdf?v=ffd77553-1316-424f-83d1-83c95469ce2c "Project Performance Domains — Project Management Institute"
[3]: https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd "Lei Geral de Proteção de Dados Pessoais — Governo Federal"

## 19. Registro de atualização

| Versão | Data | Alteração | Responsável |
|---|---|---|---|
| 1.0 | 22/09/2026 | Criação do pacote de execução da Etapa 1 | Manus AI |
