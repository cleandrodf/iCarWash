from __future__ import annotations

import csv
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SURVEY_DIR = ROOT / "docs" / "pesquisa"
expected_csv_header = [
    "survey", "order", "code", "type", "mandatory", "question", "options_json", "relevance", "help"
]

for path in sorted(SURVEY_DIR.glob("*.lss")):
    tree = ET.parse(path)
    root = tree.getroot()
    assert root.tag == "document", f"{path}: root inesperado {root.tag}"
    assert root.findtext("LimeSurveyDocType") == "Survey", f"{path}: tipo inesperado"
    assert root.find("questions/rows/row") is not None, f"{path}: sem perguntas"
    assert root.find("groups/rows/row") is not None, f"{path}: sem grupos"
    assert root.find("surveys/rows/row") is not None, f"{path}: sem configuração"
    print(f"LSS válido: {path.name}")

for path in sorted(SURVEY_DIR.glob("*.csv")):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        assert reader.fieldnames == expected_csv_header, f"{path}: cabeçalho inesperado"
        rows = list(reader)
        assert rows, f"{path}: sem linhas"
        assert all(row["code"] and row["question"] and row["type"] for row in rows), f"{path}: linha incompleta"
    print(f"CSV válido: {path.name} ({len(rows)} perguntas)")

print("Todas as pesquisas foram validadas.")
