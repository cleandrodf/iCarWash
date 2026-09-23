# Armazenamento dos Artefatos do Projeto ZeloGO

## Regra do projeto

A partir de 22 de setembro de 2026, os artefatos produzidos no âmbito do ZeloGO devem permanecer em dois destinos:

1. no repositório GitHub [`cleandrodf/iCarWash`](https://github.com/cleandrodf/iCarWash), que mantém o histórico versionado; e
2. na pasta local do projeto no Windows:

```text
C:\Users\clean\OneDrive\Documents\Projeto_ZeloGO
```

A pasta local é considerada uma cópia de trabalho e arquivo documental do projeto. O GitHub continua sendo a fonte de verdade para código, documentos versionados e histórico de alterações.

## Limitação do ambiente atual

O agente executa neste ambiente Linux isolado. O caminho `C:\Users\clean\OneDrive\Documents\Projeto_ZeloGO` não está montado nem acessível diretamente nesta sessão. Por isso, a sincronização direta para o OneDrive não pode ser executada automaticamente daqui.

Para reduzir esse impacto, o repositório contém o script [`scripts/sincronizar-artefatos-windows.ps1`](../scripts/sincronizar-artefatos-windows.ps1), que copia o projeto para o caminho definido no Windows e exclui credenciais, caches e artefatos transitórios.

## Procedimento recomendado no Windows

Depois de clonar ou atualizar o repositório no computador Windows, abra o PowerShell na pasta local do repositório e execute:

```powershell
.\scripts\sincronizar-artefatos-windows.ps1
```

Se o repositório estiver em outro local, informe a pasta de origem explicitamente:

```powershell
.\scripts\sincronizar-artefatos-windows.ps1 -Origem "C:\caminho\para\iCarWash"
```

O script cria ou atualiza a pasta `Projeto_ZeloGO` no OneDrive e grava um arquivo `SYNC-MANIFEST.txt` com a data da sincronização, o commit de origem e a lista dos itens copiados.

## Segurança

A sincronização não copia `.env`, `.env.*`, `.neon-claim`, `node_modules`, `dist`, `dist-server`, `coverage`, `.git` nem arquivos de log. Credenciais do Neon, tokens, senhas e outros segredos devem continuar apenas em armazenamento seguro e nunca devem ser colocados no OneDrive ou no GitHub.

Os documentos, pesquisas, scripts, código-fonte, migrações, imagens, PDFs e demais artefatos versionados são elegíveis para a cópia local. Dados demonstrativos devem permanecer claramente identificados como fictícios.

## Pacote para cópia imediata

Quando a sincronização direta não estiver disponível, pode ser utilizado o pacote ZIP entregue pelo agente. Extraia o conteúdo para `C:\Users\clean\OneDrive\Documents\Projeto_ZeloGO` e preserve a pasta raiz do projeto.
