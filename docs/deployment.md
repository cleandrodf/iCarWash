# Hospedagem permanente do iCarWash

**Decisão:** Render Web Service conectado ao GitHub  
**Banco:** Neon PostgreSQL  
**Data:** 22 de setembro de 2026  
**Autor:** Manus AI

## Alternativas avaliadas

| Abordagem | Trocas envolvidas | Custo inicial | Complexidade de preparação |
|---|---|---:|---|
| Serviço web Node.js na Render | Executa a aplicação Express e os arquivos estáticos no mesmo processo, acompanha o GitHub e aceita domínio próprio. No plano gratuito, o serviço suspende após 15 minutos sem tráfego e o primeiro acesso pode levar cerca de um minuto. | Gratuito dentro dos limites | Baixa |
| Frontend e função Express na Vercel | Oferece CDN e funções com escala automática. Exigiria adaptar a entrega dos arquivos estáticos e o plano gratuito é destinado a uso pessoal e não comercial. | Gratuito apenas para uso pessoal dentro dos limites | Média |
| Máquina virtual própria | Oferece controle completo e processo sempre ativo, mas exige atualizações, segurança, observabilidade e custo mensal. | Pago | Alta |

A Render foi escolhida para o MVP porque mantém frontend e API em um único serviço sem mudança de arquitetura. O plano gratuito disponibiliza uma URL estável e TLS gerenciado, mas suspende o processo após 15 minutos de inatividade.[1] A Vercel permanece adequada para protótipos pessoais, porém seu plano Hobby restringe o uso a projetos pessoais e não comerciais.[2]

## Configuração versionada

O arquivo `render.yaml` descreve um serviço Node.js gratuito na região de Ohio, próxima ao banco Neon atual. A Render instalará dependências, gerará o build e aplicará as migrações antes de iniciar a aplicação. Novos commits na branch `main` acionam implantação automática.

A variável `DATABASE_URL` é marcada como secreta e precisa ser fornecida no painel da Render durante a primeira criação do serviço. Ela nunca deve ser adicionada ao GitHub.

## Comandos de implantação

```text
Build: corepack enable && pnpm install --frozen-lockfile && pnpm build && pnpm db:migrate
Start: pnpm start
Health check: /api/health
```

## Operação do plano gratuito

O endereço público permanece estável. Quando o serviço fica sem tráfego por 15 minutos, a Render encerra temporariamente a instância. A primeira requisição seguinte inicia o serviço novamente e pode exibir uma página de carregamento por aproximadamente um minuto.[1]

O banco permanece no Neon e escala a zero quando não está em uso. O projeto continua limitado pelas cotas do plano gratuito do Neon.

## Evolução para produção comercial

Antes do lançamento comercial, o serviço deve migrar para uma instância sem suspensão e com suporte a disponibilidade. Também é recomendável mover o banco para a região de São Paulo, ativar monitoramento, definir alertas, configurar domínio próprio e revisar capacidade e custos.

## Referências

[1]: https://render.com/docs/free "Deploy for Free — Render Docs"
[2]: https://vercel.com/docs/plans/hobby "Vercel Hobby Plan"
