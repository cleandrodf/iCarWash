from __future__ import annotations

import csv
import json
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "pesquisa"
OUT.mkdir(parents=True, exist_ok=True)

ANSWER_FIELDS = [
    "qid", "code", "answer", "sortorder", "language", "assessment_value", "scale_id"
]
GROUP_FIELDS = [
    "gid", "sid", "group_name", "group_order", "description", "language",
    "randomization_group", "grelevance"
]
QUESTION_FIELDS = [
    "qid", "parent_qid", "sid", "gid", "type", "title", "question", "preg",
    "help", "other", "mandatory", "question_order", "language", "scale_id",
    "same_default", "relevance", "modulename"
]
ATTRIBUTE_FIELDS = ["qid", "attribute", "value", "language"]
SURVEY_FIELDS = [
    "sid", "admin", "expires", "startdate", "adminemail", "anonymized", "faxto",
    "format", "savetimings", "template", "language", "additional_languages",
    "datestamp", "usecookie", "allowregister", "allowsave", "autonumber_start",
    "autoredirect", "allowprev", "printanswers", "ipaddr", "refurl",
    "publicstatistics", "publicgraphs", "listpublic", "htmlemail", "sendconfirmation",
    "tokenanswerspersistence", "assessments", "usecaptcha", "usetokens", "bounce_email",
    "attributedescriptions", "emailresponseto", "emailnotificationto", "tokenlength",
    "showxquestions", "showgroupinfo", "shownoanswer", "showqnumcode", "bouncetime",
    "bounceprocessing", "bounceaccounttype", "bounceaccounthost", "bounceaccountpass",
    "bounceaccountencryption", "bounceaccountuser", "showwelcome", "showprogress",
    "questionindex", "navigationdelay", "nokeyboard", "alloweditaftercompletion",
    "googleanalyticsstyle", "googleanalyticsapikey"
]
LANGUAGE_FIELDS = [
    "surveyls_survey_id", "surveyls_language", "surveyls_title", "surveyls_description",
    "surveyls_welcometext", "surveyls_endtext", "surveyls_url", "surveyls_urldescription",
    "surveyls_email_invite_subj", "surveyls_email_invite", "surveyls_email_remind_subj",
    "surveyls_email_remind", "surveyls_email_register_subj", "surveyls_email_register",
    "surveyls_email_confirm_subj", "surveyls_email_confirm", "surveyls_dateformat",
    "surveyls_attributecaptions", "email_admin_notification_subj", "email_admin_notification",
    "email_admin_responses_subj", "email_admin_responses", "surveyls_numberformat",
    "attachments"
]


def add_section(root: ET.Element, name: str, fields: list[str], rows: list[dict[str, str]]) -> None:
    section = ET.SubElement(root, name)
    field_container = ET.SubElement(section, "fields")
    for field in fields:
        ET.SubElement(field_container, "fieldname").text = field
    row_container = ET.SubElement(section, "rows")
    for data in rows:
        row = ET.SubElement(row_container, "row")
        for field in fields:
            value = data.get(field, "")
            ET.SubElement(row, field).text = str(value)


def answer_rows(questions: list[dict], language: str = "pt-BR") -> list[dict[str, str]]:
    rows = []
    for question in questions:
        for index, option in enumerate(question.get("options", []), start=1):
            if isinstance(option, tuple):
                code, label = option
            else:
                code, label = option, option
            rows.append({
                "qid": str(question["qid"]),
                "code": code,
                "answer": label,
                "sortorder": str(index),
                "language": language,
                "assessment_value": "0",
                "scale_id": "0",
            })
    return rows


def question_rows(sid: int, gid: int, questions: list[dict]) -> list[dict[str, str]]:
    rows = []
    for index, question in enumerate(questions, start=1):
        rows.append({
            "qid": str(question["qid"]),
            "parent_qid": "0",
            "sid": str(sid),
            "gid": str(gid),
            "type": question["type"],
            "title": question["title"],
            "question": question["question"],
            "preg": "",
            "help": question.get("help", ""),
            "other": "Y" if question.get("other") else "N",
            "mandatory": "Y" if question.get("mandatory") else "N",
            "question_order": str(index),
            "language": "pt-BR",
            "scale_id": "0",
            "same_default": "0",
            "relevance": question.get("relevance", "1"),
            "modulename": "",
        })
    return rows


def base_survey_row(sid: int, admin_email: str = "") -> dict[str, str]:
    values = {field: "" for field in SURVEY_FIELDS}
    values.update({
        "sid": str(sid),
        "admin": "iCarWash",
        "adminemail": admin_email,
        "anonymized": "Y",
        "format": "G",
        "savetimings": "N",
        "template": "fruity",
        "language": "pt-BR",
        "additional_languages": "",
        "datestamp": "N",
        "usecookie": "N",
        "allowregister": "N",
        "allowsave": "Y",
        "autonumber_start": "0",
        "autoredirect": "N",
        "allowprev": "Y",
        "printanswers": "N",
        "ipaddr": "N",
        "refurl": "N",
        "publicstatistics": "N",
        "publicgraphs": "N",
        "listpublic": "N",
        "htmlemail": "Y",
        "sendconfirmation": "N",
        "tokenanswerspersistence": "N",
        "assessments": "N",
        "usecaptcha": "N",
        "usetokens": "N",
        "tokenlength": "15",
        "showxquestions": "Y",
        "showgroupinfo": "B",
        "shownoanswer": "N",
        "showqnumcode": "X",
        "bouncetime": "0",
        "bounceprocessing": "N",
        "showwelcome": "Y",
        "showprogress": "Y",
        "questionindex": "0",
        "navigationdelay": "0",
        "nokeyboard": "N",
        "alloweditaftercompletion": "N",
    })
    return values


def language_row(sid: int, title: str, description: str, welcome: str, end: str) -> dict[str, str]:
    values = {field: "" for field in LANGUAGE_FIELDS}
    values.update({
        "surveyls_survey_id": str(sid),
        "surveyls_language": "pt-BR",
        "surveyls_title": title,
        "surveyls_description": description,
        "surveyls_welcometext": welcome,
        "surveyls_endtext": end,
        "surveyls_email_invite_subj": "Convite para participar da pesquisa iCarWash",
        "surveyls_email_remind_subj": "Lembrete: pesquisa iCarWash",
        "surveyls_dateformat": "5",
        "surveyls_numberformat": "0",
    })
    return values


def write_lss(filename: str, sid: int, title: str, description: str, welcome: str, end: str, questions: list[dict]) -> None:
    root = ET.Element("document")
    ET.SubElement(root, "LimeSurveyDocType").text = "Survey"
    ET.SubElement(root, "DBVersion").text = "261"
    languages = ET.SubElement(root, "languages")
    ET.SubElement(languages, "language").text = "pt-BR"
    add_section(root, "answers", ANSWER_FIELDS, answer_rows(questions))
    add_section(root, "groups", GROUP_FIELDS, [{
        "gid": "1", "sid": str(sid), "group_name": "Pesquisa", "group_order": "0",
        "description": description, "language": "pt-BR", "randomization_group": "", "grelevance": "",
    }])
    add_section(root, "questions", QUESTION_FIELDS, question_rows(sid, 1, questions))
    attributes = []
    for question in questions:
        for attribute, value in question.get("attributes", {}).items():
            attributes.append({"qid": str(question["qid"]), "attribute": attribute, "value": value, "language": "pt-BR"})
    add_section(root, "question_attributes", ATTRIBUTE_FIELDS, attributes)
    add_section(root, "surveys", SURVEY_FIELDS, [base_survey_row(sid)])
    add_section(root, "surveys_languagesettings", LANGUAGE_FIELDS, [language_row(sid, title, description, welcome, end)])
    tree = ET.ElementTree(root)
    ET.indent(tree, space=" ")
    tree.write(OUT / filename, encoding="utf-8", xml_declaration=True)


def write_csv(filename: str, survey_name: str, questions: list[dict]) -> None:
    path = OUT / filename
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=[
            "survey", "order", "code", "type", "mandatory", "question", "options_json", "relevance", "help"
        ])
        writer.writeheader()
        for order, question in enumerate(questions, start=1):
            writer.writerow({
                "survey": survey_name,
                "order": order,
                "code": question["title"],
                "type": question["type"],
                "mandatory": "yes" if question.get("mandatory") else "no",
                "question": question["question"],
                "options_json": json.dumps(question.get("options", []), ensure_ascii=False),
                "relevance": question.get("relevance", "1"),
                "help": question.get("help", ""),
            })


client_questions = [
    {"qid": 1, "title": "C01_VEICULO", "type": "L", "question": "Qual tipo de veículo você utiliza com maior frequência?", "mandatory": True, "options": [("CARRO", "Carro"), ("MOTO", "Motocicleta"), ("AMBOS", "Carro e motocicleta"), ("OUTRO", "Outro")], "other": True},
    {"qid": 2, "title": "C02_REGIAO", "type": "L", "question": "Em qual região você normalmente procura esse tipo de serviço?", "options": [("PLANO", "Plano Piloto"), ("AGUAS", "Águas Claras"), ("TAGUATINGA", "Taguatinga"), ("CEILANDIA", "Ceilândia"), ("SAMAMBAIA", "Samambaia"), ("OUTRA_DF", "Outra região do Distrito Federal"), ("FORA_DF", "Fora do Distrito Federal")], "other": True},
    {"qid": 3, "title": "C03_RECENCIA", "type": "L", "question": "Quando foi a última vez que você contratou ou realizou uma lavagem?", "options": [("7_DIAS", "Nos últimos 7 dias"), ("30_DIAS", "Nos últimos 30 dias"), ("90_DIAS", "Nos últimos 3 meses"), ("MAIS_90", "Há mais de 3 meses"), ("NUNCA", "Nunca")], "mandatory": True},
    {"qid": 4, "title": "C04_AQUISICAO", "type": "M", "question": "Como você costuma encontrar ou escolher um prestador? Selecione todas as opções aplicáveis.", "options": [("INDICACAO", "Indicação de amigos ou familiares"), ("GOOGLE", "Busca no Google ou mapas"), ("REDES", "Redes sociais"), ("PASSAGEM", "Escolho um local por onde passo"), ("APLICATIVO", "Aplicativo ou marketplace"), ("RECORRENTE", "Uso sempre o mesmo prestador"), ("OUTRO", "Outro")], "other": True},
    {"qid": 5, "title": "C05_DIFICULDADE", "type": "T", "question": "Pensando na última contratação, o que foi mais difícil na busca, comparação ou agendamento?", "help": "Peça um exemplo recente. Evite sugerir problemas.", "attributes": {"maximum_chars": "1000"}},
    {"qid": 6, "title": "C06_ANTECEDENCIA", "type": "L", "question": "Com que antecedência você normalmente agenda?", "options": [("MESMO_DIA", "No mesmo dia"), ("1_2_DIAS", "Um ou dois dias antes"), ("3_7_DIAS", "De três a sete dias antes"), ("MAIS_7", "Mais de uma semana antes"), ("SEM_AGENDA", "Normalmente não agendo")], "mandatory": True},
    {"qid": 7, "title": "C07_CRITERIOS", "type": "M", "question": "O que mais pesa na escolha de um prestador? Selecione até três opções.", "options": [("PRECO", "Preço"), ("DISTANCIA", "Proximidade"), ("RAPIDEZ", "Rapidez"), ("QUALIDADE", "Qualidade percebida"), ("AVALIACOES", "Avaliações de outros clientes"), ("CONFIANCA", "Confiança e transparência"), ("CONVENIENCIA", "Atendimento no meu endereço"), ("ESPECIALIZACAO", "Especialização no meu tipo de veículo")], "attributes": {"max_answers": "3"}},
    {"qid": 8, "title": "C08_MODALIDADE", "type": "L", "question": "Em geral, qual modalidade você prefere?", "options": [("ESTABELECIMENTO", "Levar o veículo ao estabelecimento"), ("ENDERECO", "Receber o serviço no meu endereço"), ("DEPENDE", "Depende do serviço e da situação")], "mandatory": True},
    {"qid": 9, "title": "C09_CONFIANCA", "type": "M", "question": "Que informações aumentariam sua confiança em um prestador? Selecione todas as opções aplicáveis.", "options": [("PRECO_CLARO", "Preço claro antes do agendamento"), ("FOTOS", "Fotos do local ou do trabalho"), ("AVALIACOES", "Avaliações de clientes"), ("DADOS_PARCEIRO", "Dados e identificação do prestador"), ("PRAZO", "Tempo estimado do serviço"), ("POLITICA", "Política de cancelamento"), ("GARANTIA", "Garantia ou suporte em caso de problema")], "other": True},
    {"qid": 10, "title": "C10_MOTO_SERVICOS", "type": "M", "question": "Para motocicletas, quais serviços você teria interesse em contratar? Selecione todas as opções aplicáveis.", "relevance": 'C01_VEICULO == "MOTO" or C01_VEICULO == "AMBOS"', "options": [("BASICA", "Lavagem básica"), ("DETALHADA", "Lavagem detalhada"), ("RODAS", "Limpeza de rodas"), ("CORRENTE", "Limpeza ou cuidado da corrente"), ("HIGIENIZACAO", "Higienização"), ("POLIMENTO", "Polimento"), ("NENHUM", "Nenhum desses")], "other": True},
    {"qid": 11, "title": "C11_MOTO_PRECO", "type": "L", "question": "Para uma lavagem básica de motocicleta, qual faixa de preço você consideraria aceitável?", "relevance": 'C01_VEICULO == "MOTO" or C01_VEICULO == "AMBOS"', "options": [("ATE_30", "Até R$ 30"), ("31_50", "R$ 31 a R$ 50"), ("51_80", "R$ 51 a R$ 80"), ("81_120", "R$ 81 a R$ 120"), ("MAIS_120", "Mais de R$ 120"), ("NAO_SEI", "Não sei avaliar") ]},
    {"qid": 12, "title": "C12_NOTIFICACOES", "type": "M", "question": "Como você gostaria de receber confirmações e lembretes? Selecione todas as opções aplicáveis.", "options": [("WHATSAPP", "WhatsApp"), ("SMS", "SMS"), ("EMAIL", "E-mail"), ("APP", "Notificação no aplicativo"), ("NAO_QUERO", "Não preciso de lembretes")], "other": True},
    {"qid": 13, "title": "C13_RECORRENCIA", "type": "L", "question": "Se a experiência fosse boa, com que probabilidade você usaria novamente uma plataforma desse tipo?", "options": [("MUITO", "Muito provável"), ("PROVAVEL", "Provável"), ("TALVEZ", "Talvez"), ("IMPROVAVEL", "Improvável"), ("NAO_SEI", "Não sei")], "mandatory": True},
    {"qid": 14, "title": "C14_PILOTO", "type": "Y", "question": "Você aceitaria participar de um teste controlado do serviço em Brasília?", "help": "A participação será voluntária e não representa promessa de benefício ou contratação."},
    {"qid": 15, "title": "C15_COMENTARIO", "type": "T", "question": "Há algo importante sobre lavagem de carros ou motocicletas que não perguntamos?", "attributes": {"maximum_chars": "1000"}},
]

partner_questions = [
    {"qid": 1, "title": "P01_PERFIL", "type": "L", "question": "Qual descreve melhor o seu negócio ou serviço?", "mandatory": True, "options": [("FIXO", "Estabelecimento fixo"), ("MOVEL", "Prestador móvel"), ("AMBOS", "Estabelecimento e atendimento móvel"), ("OUTRO", "Outro")], "other": True},
    {"qid": 2, "title": "P02_REGIAO", "type": "L", "question": "Em qual região você atende principalmente?", "options": [("PLANO", "Plano Piloto"), ("AGUAS", "Águas Claras"), ("TAGUATINGA", "Taguatinga"), ("CEILANDIA", "Ceilândia"), ("SAMAMBAIA", "Samambaia"), ("VARIAS_DF", "Várias regiões do Distrito Federal"), ("OUTRA", "Outra")], "other": True},
    {"qid": 3, "title": "P03_VEICULOS", "type": "M", "question": "Quais tipos de veículo você atende atualmente? Selecione todas as opções aplicáveis.", "mandatory": True, "options": [("CARRO", "Carros"), ("MOTO", "Motocicletas"), ("OUTRO", "Outros veículos")], "other": True},
    {"qid": 4, "title": "P04_AQUISICAO", "type": "M", "question": "Como chegam atualmente novos clientes? Selecione todas as opções aplicáveis.", "options": [("INDICACAO", "Indicação"), ("PASSAGEM", "Clientes que passam pelo local"), ("GOOGLE", "Google ou mapas"), ("REDES", "Redes sociais"), ("ANUNCIOS", "Anúncios pagos"), ("RECORRENTE", "Clientes recorrentes"), ("PARCERIAS", "Parcerias com empresas")], "other": True},
    {"qid": 5, "title": "P05_CAPACIDADE", "type": "N", "question": "Quantos atendimentos de lavagem você consegue realizar em uma semana normal?", "help": "Informe uma estimativa aproximada.", "attributes": {"min_num_value_n": "0", "maximum_chars": "5"}},
    {"qid": 6, "title": "P06_AGENDA", "type": "L", "question": "Como a agenda é controlada e atualizada atualmente?", "mandatory": True, "options": [("PAPEL", "Papel ou caderno"), ("PLANILHA", "Planilha"), ("WHATSAPP", "WhatsApp ou mensagens"), ("SISTEMA", "Sistema próprio ou aplicativo"), ("MEMORIA", "Memória ou controle informal")], "other": True},
    {"qid": 7, "title": "P07_CONFLITOS", "type": "L", "question": "Com que frequência ocorrem conflitos de horário ou reservas duplicadas?", "options": [("NUNCA", "Nunca ou quase nunca"), ("RARO", "Raramente"), ("MENSAL", "Algumas vezes por mês"), ("SEMANAL", "Toda semana"), ("DIARIO", "Quase todos os dias")], "mandatory": True},
    {"qid": 8, "title": "P08_SERVICOS", "type": "M", "question": "Quais serviços você oferece ou teria interesse em oferecer para motocicletas? Selecione todas as opções aplicáveis.", "relevance": 'P03_VEICULOS_MOTO == "Y" or P03_VEICULOS_OUTRO == "Y"', "options": [("BASICA", "Lavagem básica"), ("DETALHADA", "Lavagem detalhada"), ("RODAS", "Limpeza de rodas"), ("CORRENTE", "Limpeza ou cuidado da corrente"), ("HIGIENIZACAO", "Higienização"), ("POLIMENTO", "Polimento"), ("NENHUM", "Nenhum desses")], "other": True},
    {"qid": 9, "title": "P09_LIMITES_MOTO", "type": "T", "question": "Quais cuidados, limitações ou equipamentos específicos são necessários para atender motocicletas?", "relevance": 'P03_VEICULOS_MOTO == "Y" or P03_VEICULOS_OUTRO == "Y"', "attributes": {"maximum_chars": "1000"}},
    {"qid": 10, "title": "P10_DEMANDA", "type": "M", "question": "Quais períodos ou regiões têm maior ou menor demanda? Selecione todas as opções aplicáveis.", "options": [("DIAS_UTEIS", "Dias úteis"), ("FIM_SEMANA", "Fim de semana"), ("MANHA", "Manhã"), ("TARDE", "Tarde"), ("NOITE", "Noite"), ("FERIADOS", "Feriados"), ("BAIRROS_ESPECIFICOS", "Bairros específicos")], "other": True},
    {"qid": 11, "title": "P11_RAIO", "type": "L", "question": "Qual raio máximo de deslocamento seria viável para atendimento móvel?", "relevance": 'P01_PERFIL == "MOVEL" or P01_PERFIL == "AMBOS"', "options": [("ATE_3", "Até 3 km"), ("4_8", "De 4 a 8 km"), ("9_15", "De 9 a 15 km"), ("16_25", "De 16 a 25 km"), ("MAIS_25", "Mais de 25 km"), ("NAO_ATENDO", "Não realizo atendimento móvel") ]},
    {"qid": 12, "title": "P12_EXCECOES", "type": "M", "question": "Como são tratados atrasos, cancelamentos, ausência e retrabalho? Selecione as situações que já ocorreram.", "options": [("ATRASO", "Atraso do cliente"), ("CANCELAMENTO", "Cancelamento do cliente"), ("AUSENCIA", "Cliente não compareceu"), ("RETRABALHO", "Necessidade de refazer o serviço"), ("DISPUTA", "Reclamação ou disputa"), ("NENHUM", "Nenhuma dessas")], "other": True},
    {"qid": 13, "title": "P13_RESPOSTA", "type": "L", "question": "Quanto tempo seria aceitável para responder a uma nova solicitação?", "mandatory": True, "options": [("5_MIN", "Até 5 minutos"), ("15_MIN", "Até 15 minutos"), ("30_MIN", "Até 30 minutos"), ("2_HORAS", "Até 2 horas"), ("DIA", "Até o fim do dia"), ("VARIA", "Depende do horário") ]},
    {"qid": 14, "title": "P14_DADOS", "type": "M", "question": "Quais informações do cliente são necessárias para aceitar um pedido? Selecione todas as opções aplicáveis.", "options": [("TIPO_VEICULO", "Tipo e tamanho do veículo"), ("SERVICO", "Serviço escolhido"), ("HORARIO", "Data e horário desejados"), ("ENDERECO", "Endereço, quando for atendimento móvel"), ("TELEFONE", "Telefone de contato"), ("OBSERVACOES", "Observações ou fotos"), ("NENHUM", "Ainda não sei")], "other": True},
    {"qid": 15, "title": "P15_PORTAL", "type": "M", "question": "O que poderia dificultar o uso diário de um portal? Selecione todas as opções aplicáveis.", "options": [("TEMPO", "Falta de tempo"), ("TECNOLOGIA", "Dificuldade tecnológica"), ("AGENDA", "Atualizar a agenda"), ("EQUIPE", "Mais de uma pessoa usando a operação"), ("NOTIFICACOES", "Receber e acompanhar notificações"), ("INTERNET", "Conectividade"), ("NADA", "Nada em especial")], "other": True},
    {"qid": 16, "title": "P16_MODELO", "type": "L", "question": "Qual modelo de cobrança pareceria mais compreensível para um teste inicial?", "options": [("SEM_CUSTO", "Sem custo durante o piloto"), ("POR_PEDIDO", "Taxa por agendamento confirmado"), ("COMISSAO", "Percentual sobre o serviço"), ("ASSINATURA", "Assinatura mensal"), ("LEAD", "Cobrança por cliente interessado"), ("OUTRO", "Outro")], "other": True},
    {"qid": 17, "title": "P17_CAPACIDADE_PILOTO", "type": "N", "question": "Quantos horários por semana você conseguiria disponibilizar para um piloto controlado?", "attributes": {"min_num_value_n": "0", "maximum_chars": "4"}},
    {"qid": 18, "title": "P18_PILOTO", "type": "Y", "question": "Você aceitaria participar de um piloto controlado do iCarWash em Brasília?", "help": "A resposta não representa contratação ou obrigação comercial."},
    {"qid": 19, "title": "P19_COMENTARIO", "type": "T", "question": "Que condição seria indispensável para você confiar e continuar usando uma plataforma desse tipo?", "attributes": {"maximum_chars": "1000"}},
]

write_lss(
    "icarwash-pesquisa-clientes.lss",
    946201,
    "Pesquisa com clientes potenciais — iCarWash",
    "Pesquisa de descoberta sobre hábitos de lavagem de carros e motocicletas em Brasília.",
    "Esta pesquisa busca entender experiências reais. Não há promessa de contratação ou benefício. Evite informar dados pessoais desnecessários. Tempo estimado: 5 a 8 minutos.",
    "Obrigado. Suas respostas ajudarão a definir o piloto do iCarWash.",
    client_questions,
)
write_lss(
    "icarwash-pesquisa-parceiros.lss",
    946202,
    "Pesquisa com parceiros de lavagem — iCarWash",
    "Pesquisa de descoberta com estabelecimentos e prestadores de lavagem automotiva e de motocicletas em Brasília.",
    "Esta pesquisa busca entender a operação atual dos parceiros. Não há promessa de contratação ou benefício. Evite informar dados pessoais desnecessários. Tempo estimado: 8 a 12 minutos.",
    "Obrigado. Suas respostas ajudarão a estruturar o piloto do iCarWash.",
    partner_questions,
)
write_csv("icarwash-pesquisa-clientes.csv", "clientes", client_questions)
write_csv("icarwash-pesquisa-parceiros.csv", "parceiros", partner_questions)
print("Arquivos gerados em", OUT)
