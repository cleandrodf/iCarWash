# Pesquisas de Descoberta — LimeSurvey e Outras Plataformas

**Projeto:** ZeloGO
**Versão:** 1.0  
**Data:** 22 de setembro de 2026  
**Idioma:** Português do Brasil  
**Região de pesquisa:** Brasília, Distrito Federal

## 1. Status

A pesquisa está pronta em duas versões separadas:

- uma pesquisa para **clientes potenciais**;
- uma pesquisa para **parceiros de lavagem automotiva e de motocicletas**.

Cada pesquisa foi gerada em formato **LSS**, que é a estrutura nativa de importação do LimeSurvey. O pacote também contém um arquivo **CSV portátil**, adequado para montagem assistida em Google Forms, Microsoft Forms, Typeform, Jotform ou outra plataforma.

A estrutura inclui grupos de perguntas, tipos de resposta, obrigatoriedade, opções codificadas e lógica de exibição. A pesquisa de clientes apresenta perguntas específicas sobre motocicletas somente quando a pessoa informa que utiliza motocicleta. A pesquisa de parceiros apresenta perguntas sobre serviços e operação de motocicletas somente quando o parceiro informa que atende esse tipo de veículo.

## 2. Arquivos gerados

| Público | Importação nativa | Formato portátil |
|---|---|---|
| Clientes | [`zelogo-pesquisa-clientes.lss`](pesquisa/zelogo-pesquisa-clientes.lss) | [`zelogo-pesquisa-clientes.csv`](pesquisa/zelogo-pesquisa-clientes.csv) |
| Parceiros | [`zelogo-pesquisa-parceiros.lss`](pesquisa/zelogo-pesquisa-parceiros.lss) | [`zelogo-pesquisa-parceiros.csv`](pesquisa/zelogo-pesquisa-parceiros.csv) |

Os arquivos foram gerados pelo script versionado [`scripts/generate-limesurvey.py`](../scripts/generate-limesurvey.py). Isso permite revisar ou alterar perguntas e gerar novamente os arquivos sem edição manual do XML.

## 3. Como importar no LimeSurvey

No LimeSurvey Cloud ou em uma instalação compatível, use a opção de criação de survey por importação. O caminho indicado pela documentação atual é **Create survey → Import**, seguido do upload do arquivo `.lss` e da confirmação de importação.[1]

O arquivo `.lss` transporta a estrutura da pesquisa, incluindo grupos, perguntas, respostas e condições. Ele não contém respostas coletadas.[2] Após a importação, o LimeSurvey renumera IDs internos para evitar colisões. Antes de ativar a pesquisa, revise o título, idioma, tema, notificações, datas, texto de encerramento e configurações de anonimato.[1]

Recomenda-se este procedimento:

1. Criar uma pesquisa nova para clientes.
2. Importar `zelogo-pesquisa-clientes.lss`.
3. Pré-visualizar todas as rotas, inclusive a rota de motocicletas.
4. Criar uma segunda pesquisa nova para parceiros.
5. Importar `zelogo-pesquisa-parceiros.lss`.
6. Pré-visualizar as rotas para estabelecimento fixo, prestador móvel e operação combinada.
7. Fazer um teste com duas respostas fictícias por pesquisa.
8. Confirmar que a lógica de relevância não exibe perguntas fora do perfil informado.
9. Ativar somente depois de revisar as configurações de privacidade e retenção.

## 4. Estrutura da pesquisa com clientes

A pesquisa tem 15 perguntas. A duração estimada é de cinco a oito minutos.

| Código | Tema | Tipo | Condição |
|---|---|---|---|
| C01_VEICULO | Tipo de veículo utilizado | Escolha única | Sempre |
| C02_REGIAO | Região de busca | Escolha única | Sempre |
| C03_RECENCIA | Recência da última lavagem | Escolha única | Sempre |
| C04_AQUISICAO | Como escolhe prestadores | Múltipla escolha | Sempre |
| C05_DIFICULDADE | Dificuldade recente | Texto longo | Sempre |
| C06_ANTECEDENCIA | Antecedência de agendamento | Escolha única | Sempre |
| C07_CRITERIOS | Critérios de escolha | Múltipla escolha, máximo de três | Sempre |
| C08_MODALIDADE | Estabelecimento ou endereço | Escolha única | Sempre |
| C09_CONFIANCA | Informações que geram confiança | Múltipla escolha | Sempre |
| C10_MOTO_SERVICOS | Serviços para motocicletas | Múltipla escolha | C01 = motocicleta ou ambos |
| C11_MOTO_PRECO | Faixa de preço para motocicleta | Escolha única | C01 = motocicleta ou ambos |
| C12_NOTIFICACOES | Canal de confirmação e lembrete | Múltipla escolha | Sempre |
| C13_RECORRENCIA | Probabilidade de reutilização | Escolha única | Sempre |
| C14_PILOTO | Aceite de participação em piloto | Sim/Não | Sempre |
| C15_COMENTARIO | Comentário final | Texto longo | Sempre |

## 5. Estrutura da pesquisa com parceiros

A pesquisa tem 19 perguntas. A duração estimada é de oito a doze minutos.

| Código | Tema | Tipo | Condição |
|---|---|---|---|
| P01_PERFIL | Perfil operacional | Escolha única | Sempre |
| P02_REGIAO | Região de atendimento | Escolha única | Sempre |
| P03_VEICULOS | Tipos de veículo atendidos | Múltipla escolha | Sempre |
| P04_AQUISICAO | Origem dos clientes | Múltipla escolha | Sempre |
| P05_CAPACIDADE | Capacidade semanal | Numérica | Sempre |
| P06_AGENDA | Controle atual da agenda | Escolha única | Sempre |
| P07_CONFLITOS | Frequência de conflitos de horário | Escolha única | Sempre |
| P08_SERVICOS | Serviços para motocicletas | Múltipla escolha | P03 inclui motocicleta ou outro |
| P09_LIMITES_MOTO | Cuidados e limitações para motocicletas | Texto longo | P03 inclui motocicleta ou outro |
| P10_DEMANDA | Períodos e regiões de demanda | Múltipla escolha | Sempre |
| P11_RAIO | Raio de atendimento móvel | Escolha única | P01 é móvel ou combinado |
| P12_EXCECOES | Atrasos, cancelamentos e retrabalho | Múltipla escolha | Sempre |
| P13_RESPOSTA | Tempo aceitável de resposta | Escolha única | Sempre |
| P14_DADOS | Dados necessários do cliente | Múltipla escolha | Sempre |
| P15_PORTAL | Barreiras ao uso de portal | Múltipla escolha | Sempre |
| P16_MODELO | Modelo de cobrança compreensível | Escolha única | Sempre |
| P17_CAPACIDADE_PILOTO | Horários semanais para piloto | Numérica | Sempre |
| P18_PILOTO | Aceite de participação em piloto | Sim/Não | Sempre |
| P19_COMENTARIO | Condição indispensável para adesão | Texto longo | Sempre |

## 6. Orientações metodológicas

A pesquisa deve investigar comportamentos recentes e não induzir o participante a aprovar o ZeloGO. A abertura deve informar que a pesquisa não representa promessa de contratação, benefício ou participação no piloto.

A coleta deve evitar dados pessoais desnecessários. Não é necessário solicitar nome, telefone, endereço completo ou dados do veículo para a etapa de descoberta. Se houver interesse em convidar participantes para uma entrevista posterior, utilize um formulário separado para contato ou uma pergunta opcional com finalidade claramente informada.

As perguntas abertas são importantes para entender linguagem, dores e exceções. As perguntas fechadas facilitam comparação entre respostas e estimativa de demanda. A análise deve dar mais peso a fatos recentes, como uma contratação ocorrida no último mês, do que a declarações hipotéticas sobre um possível uso futuro.

## 7. Teste antes da publicação

Antes de distribuir os links, realize pelo menos os seguintes testes:

- resposta de cliente que utiliza somente carro;
- resposta de cliente que utiliza somente motocicleta;
- resposta de cliente que utiliza ambos;
- resposta de parceiro com estabelecimento fixo;
- resposta de parceiro móvel;
- resposta de parceiro que atende carros e motocicletas;
- validação das perguntas obrigatórias;
- validação das perguntas condicionais;
- exportação das respostas e conferência dos códigos.

O teste deve confirmar que as perguntas C10, C11, P08, P09 e P11 aparecem somente quando a condição correspondente é atendida. Também deve confirmar que as opções “Outro” e os campos de texto longo estão disponíveis e que as respostas podem ser exportadas sem perda de acentuação.

## 8. Adaptação para outras plataformas

O CSV não pretende ser um formato nativo universal. Ele funciona como uma matriz de montagem e mapeamento. Ao recriar a pesquisa em outra ferramenta, utilize as colunas `code`, `type`, `mandatory`, `question`, `options_json` e `relevance`.

| Tipo LimeSurvey | Conversão usual |
|---|---|
| `L` | Escolha única, lista ou rádio |
| `M` | Múltipla escolha |
| `T` | Texto longo |
| `N` | Campo numérico |
| `Y` | Sim/Não |

A lógica em `relevance` deve ser convertida para a sintaxe própria da plataforma. Por exemplo, `C01_VEICULO == "MOTO" or C01_VEICULO == "AMBOS"` significa que a pergunta de motocicletas deve ser exibida quando a resposta do participante indicar motocicleta.

## 9. Referências

[1]: https://help.limesurvey.org/portal/en/kb/articles/import-a-survey "Import a survey — LimeSurvey Help Center"
[2]: https://www.limesurvey.org/manual/Display/Export_survey "Display/Export survey — LimeSurvey Manual"
[3]: https://www.limesurvey.org/manual/Question_groups_-_introduction "Question groups — LimeSurvey Manual"
