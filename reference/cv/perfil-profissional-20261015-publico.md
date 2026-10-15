---
tipo: nota
versao: publica
eixo: compartilhado
status: ativo
criado: 2026-10-15
atualizado: 2026-10-15
tags: [perfil, carreira, gestao-inovacao]
---

# Perfil profissional - Iago Benvindo, Gestor de Inovação

> **Versão pública, para pitch em outros trabalhos.** Sem valores financeiros de clientes, contratos ou custos. A versão completa fica em [[perfil-profissional-20261015]] e é de uso interno.

**Hoom Interativa e OPER8** · gestor de inovação desde junho de 2026 (retorno à Hoom nesta função)

## Resumo

Gestor de inovação que transforma IA em método de trabalho, não em ferramenta solta. Em cerca de quatro meses, estruturou o Setor de Gestão de Inovação da Hoom, treinou toda a equipe criativa no uso de IA, reduziu o tempo de produção das principais saídas de marketing de dias para horas, desenhou e programou a camada de IA do sistema próprio da OPER8 e conduz, como responsável único, a consultoria de Monday da Marlim. Atua na ponte entre negócio, processo e tecnologia: desenha o processo, decide a arquitetura, implementa, treina as pessoas e mede o resultado. Programador de formação, com histórico em desenvolvimento de sites, é a pessoa técnica da Hoom e da OPER8 nas reuniões com clientes. Antes de propor qualquer solução, estuda o processo de quem vai usá-la; é desse entendimento que saem os guias, skills, fluxos e materiais que servem de apoio e base para a operação. Também responde pela validação dos gastos com ferramentas, o que dá à liderança base para decidir cortes rápidos sem travar a equipe.

## Números-chave

| Indicador | Resultado |
|---|---|
| Marketing Plan | de cerca de 5 dias (já com ChatGPT) para menos de 1 dia |
| Planejamento mensal | de cerca de 1 dia a cada 12 peças para cerca de 1 hora |
| Apresentação na identidade visual do cliente | de até 2 dias para no máximo uma manhã |
| Pessoas treinadas em IA | cerca de 16 designers, 10 analistas de redes sociais e 6 a 7 líderes de squad (toda a equipe da Hoom) |
| Guias de treinamento publicados | 6 guias no site da Hoom (hoominterativa.com.br/fluxos/guias), assinados como Gestor de Inovação |
| Custo de Freepik/Magnific | cerca de 32% a menos por mês nas 4 squads |
| Contas de Claude | de 7 para 5 contas no corte de custos (2 contas a menos, cerca de 29%); a segunda conta Max foi retomada depois, por necessidade da operação |
| Marlim, dashboard de receita | erro de unidade que inflava a receita em 100 vezes identificado e corrigido |
| Marlim, fluxo comercial | 2 quadros (29 e 34 colunas) unificados num funil de 6 etapas, migração concluída em 22/09/2026 |
| IA no sistema da OPER8 | Fase 1 entregue até a versão 1.74.0, desenhada e programada por ele |
| Novo negócio (Assaí, campanha Eclipse) | MVP funcional em cerca de 1 semana (30/09 a 07/10/2026) |

Os três ganhos de tempo do topo foram comprovados na operação pelas squads e usados como prova no pitch do setor. A versão em slides do pitch projeta ainda 30% menos tempo por entrega para designers e de 50% a 80% para analistas, conforme a etapa.

## Realizações por frente

### 1. Criação do Setor de Gestão de Inovação

- Estruturou o setor em dois eixos (tecnologia, e processo mais capacitação) e num ciclo de inovação em 5 passos, em que nada vira padrão sem medição e ajuste.
- Criou o filtro de entrada de ferramentas no stack, com 3 critérios: resolver uma dor real e recorrente de um perfil, não duplicar ferramenta ativa sem ganho mensurável e ser ensinável em menos de 30 minutos a quem não tem base técnica.
- Escreveu e apresentou o pitch do setor ao Grupo AG (André Guimarães) e à liderança da Hoom, com a tese "inovação como método, não como enfeite", os números de ganho de tempo e três casos reais (Marlim, a própria Hoom e o CMS próprio).
- Definiu o roadmap de adoção por perfil (analista, designer, tráfego e Squad Tiffani), com métricas próprias para cada um.

### 2. Adoção de IA nas squads de marketing

- **Treinamento:** treinou toda a equipe da Hoom, com onboardings individuais, treinamentos por squad (Roxa, Rosa, Vermelha e Tiffani) e acompanhamento depois da implantação. O percurso dos designers tem 4 semanas e uma trilha em 4 níveis, com meta de pelo menos 30% de redução no tempo de entrega.
- **Método:** os guias partem do workflow real, são segmentados por perfil e ensinam a ler antes de ensinar a criar. Cada cliente vira um projeto permanente no Claude, montado numa ordem fixa: briefing, brandbook, marketing plan e planejamento.
- **Skills:**
  - criou a **hoom-mp-full**, que substitui a skill antiga de marketing plan. Ela passou de 9 para 15 seções obrigatórias e ganhou trava de entrada, análise de concorrentes obrigatória e um protocolo que impede dados inventados;
  - criou a **hoom-sintetizador**, que converte documentos em markdown compacto para alimentar projetos e reduz o consumo de tokens;
  - revisou e corrigiu as skills que já existiam (planejamento, copy, QA e outras) para que funcionassem corretamente na operação.
- **Migração de ferramentas e governança de uso:**
  - conduziu a troca do Manus pelo Claude nas squads, motivada por custo;
  - definiu a política de modelos (Sonnet como padrão, Opus para tarefas complexas);
  - centralizou a criação de projetos e passou a ser o canal único para mudanças de fluxo.
- **Squad Tiffani (sites e apps):** definiu o fluxo de trabalho com Claude Code a partir de 24/08/2026 (uma tarefa por sessão, com memória mantida manualmente entre sessões).
- **Migração de contexto do ChatGPT para o Claude:** criou o guia e o prompt de extração da voz de copy já treinada no ChatGPT, aplicados no caso da Squad Rosa.
- **Diagnóstico de adesão:** identificou que a baixa adesão ao Claude no planejamento era hábito, e não falha do fluxo. Ajustou o material com base nisso.
- **Resultado de qualidade (caso Air Service, Squad Vermelha):** a peça foi aprovada com um único ajuste, depois de 10 perguntas de alinhamento feitas pela IA, seguindo o método ensinado.

### 3. Produto e engenharia na OPER8 (todo.oper8 e oper8.marketing)

- **IA do sistema:** desenhou com o Daniel Maia a área de IA do sistema próprio da OPER8, definindo como ela funciona e se integra ao produto, e programou a funcionalidade sobre a API da Anthropic (as telas chegam prontas de outra pessoa do time). A Fase 1 foi entregue até a versão 1.74.0 e inclui:
  - a fundação de IA;
  - o assistente OPA (versão de leitura);
  - memória e continuação de conversa;
  - menções;
  - cache do histórico;
  - cota de créditos por plano.
- **Próximas fases:** planejou as Fases 2 e 3. A Fase 2 cobre o painel de créditos, a medição de consumo por recurso e por pessoa e a configuração da API no painel da plataforma. A Fase 3 cobre as rotinas automáticas da OPA, executadas por agenda ou por evento, com 6 modelos prontos.
- **Decisão de modelo e de API:** ficou com ele a partir de 15/09/2026. Vetou revendedores de token por risco à privacidade e propôs uma arquitetura que permite trocar de modelo sem reescrever código.
- **Arquitetura:**
  - participou das decisões de arquitetura multi-tenant do ecossistema (D1 a D26, set/2026);
  - propôs o console administrativo central multi-produto;
  - escreveu o briefing técnico do console para o Claude Code;
  - propôs o botão de conversão entre todo.oper8 e oper8.marketing, aceito pelo time.
- **Gestão do projeto:** gerencia o projeto dos dois aplicativos (To-Do e Marketing), prioriza o backlog e foi designado para cobrir as decisões técnicas do líder durante as férias dele.

### 4. Consultoria de Monday na Marlim (OPER8)

- **Responsabilidade:** assumiu a conta em 21/07/2026 e centraliza as demandas. Desde 23/07 conduz sozinho o relacionamento com a fintech, que tem mais de 50 sellers ativos.
- **Fluxo comercial:**
  - redesenhou o funil, de Leads até Go Live, revisando as colunas uma a uma com o comercial;
  - migrou os quadros antigos e manteve backup até a validação;
  - testou o resultado ao vivo com o cliente em 17/09/2026.
- **Automações entregues:**
  - o Ganho cria Empresa, Contato e Onboarding;
  - o Onboarding em 100% leva o item ao Go Live;
  - o Go Live recebeu status de D30, D90, Retenção e Upsell;
  - o chargeback vencido aplica as regras de prazo por adquirente e foi implantado 8 dias depois do pedido;
  - o onboarding tem prazo de 31 dias, com regra de atrasados.
- **Dashboards e qualidade de dados:**
  - auditou os indicadores e corrigiu um erro de unidade que multiplicava a receita por 100;
  - rastreou a diferença residual de receita até 6 empresas e tratou as duplicadas;
  - entregou os painéis de receita por vendedor e por mês.
- **Volume:**
  - cerca de 13 reuniões e transcrições registradas;
  - 15 demandas no quadro de controle entre agosto e outubro;
  - cerca de 28 pendências encerradas de uma vez em 23/09/2026.
- **Adoção:** em 03/07/2026, uma única pessoa registrava no Monday. Em 09/10/2026, os dashboards foram liberados para a equipe.

### 5. Novos negócios e pré-venda

- **Assaí Atacadista, campanha Eclipse:**
  - montou a proposta técnica e o plano de implementação;
  - construiu um MVP de página interativa em cerca de uma semana e o apresentou ao cliente em 07/10/2026;
  - fez a estimativa de esforço e investimento: 508 horas em 8 frentes, em mais de um cenário.
- **DNA Genética:**
  - preparou a proposta de escopo em 3 horizontes (1, 3 e 6 meses);
  - fez o handoff para a apresentação;
  - conduziu a reunião de kickoff com o cliente em 05/10/2026;
  - o contrato é o primeiro da Hoom no modelo por horas.
- **Licitações:** avalia editais públicos de forma recorrente, com análise de go/no-go e estratégia de lance, usando o risco de inexequibilidade como critério fixo. Casos registrados: contrato de redes sociais do MPBA (risco de sustentabilidade no valor proposto) e fotografia de eventos do SESC-DF (multas por entrega em 72 horas, custo de impressão sem teto e dependência de plataforma de reconhecimento facial).
- **Serviço recorrente de tecnologia:** contribuiu com a proposta. O CEO resumiu o produto como "a gente vai trazer toda skill que a gente tem de automação, de IA com Iago".
- **Análise de dados para cliente (Engemon):** fez o levantamento de esforço de janeiro a setembro de 2026 a partir de 6 quadros do Monday:
  - 1.112 peças, 99% aprovadas sem reprovação;
  - 550 ajustes atendidos;
  - 2.234 interações registradas.

### 6. Automação operacional e novas ferramentas

- **Relatórios dos shoppings:** transformou a rotina semanal de relatórios de tráfego pago de 6 shoppings numa operação executada por agente de IA (Reportei, Gmail e Discord). Definiu regras de execução, tratamento de falhas e um modo de contingência.
- **tl;dv:** implantou a ferramenta para gravação e transcrição de reuniões, organizou as contas e liberou o acesso para 7 pessoas. Criou a skill e o guia de extração de transcrições.
- **Suporte técnico e infraestrutura web:** atende as demandas técnicas do site em WordPress e do servidor (aaPanel) da Esquire Brasil. Também diagnosticou e resolveu bloqueio de deploy na Vercel, falha de recebimento de e-mail por MX e SPF mal configurados e ajustes de catálogo em WooCommerce.

### 7. Apoio às squads nas entregas para clientes da Hoom

Nos clientes da Hoom, o papel dele não é a linha de frente do atendimento. Ele conduz o uso de IA nas entregas e apoia as squads na produção e na gestão dos projetos. A linha de frente direta fica nos clientes da OPER8, hoje a Marlim e a própria Hoom. Entregas da Hoom em que a IA, sob a condução dele, entrou como base:

- **Grupo OBDI:** marketing plan completo em HTML das três unidades de negócio (Gov, Blindados e Smart), com seis linhas editoriais aprovadas e quatro personas; redesenho visual do onboarding de 74 slides no design system da OBDI, produzido com duas instâncias de Claude (uma para análise e prompts, outra no Claude Design para os slides).
- **Instituto de Urologia da Bahia (IUB):** auditoria de concorrentes, materiais de pitch e kickoff da gestão de redes sociais.
- **Clínica de imagem feminina (Alphaville, Salvador):** projeto de naming em várias rodadas, com análise de risco de registro e apresentação na identidade da Hoom.
- **Marlim, mídia paga:** plano de mídia com divisão de 65% Google Ads e 35% Meta Ads.

### 8. Gestão de custos e governança de ferramentas

É o responsável pela validação do gasto com ferramentas de IA da Hoom. O trabalho garante bom aproveitamento dos recursos já contratados e deixa a decisão de corte fácil e rápida: como o consumo de cada squad está organizado e acompanhado, a liderança sabe onde cortar sem parar a operação, inclusive num corte emergencial.

- **Freepik/Magnific:**
  - acompanhamento do consumo de créditos por squad desde 18/08/2026, em 13 coletas, com painel de ritmo que projeta o uso até a renovação de cada conta;
  - padronização de todas as squads no plano de 45 mil créditos e troca de conta para reduzir o desperdício de créditos entre squads (11/09/2026);
  - redução do plano da squad de maior custo para o plano padrão;
  - resultado: cerca de 32% a menos no custo mensal da ferramenta nas 4 squads.
- **Claude:**
  - antes do corte, o time tinha 7 contas, 2 delas Max;
  - no corte de custos, passou para 5 contas, 1 delas Max (2 contas a menos, cerca de 29%);
  - hoje são 5 contas, 2 delas Max: a segunda Max foi retomada por necessidade da operação, o que mostra o modelo funcionando nos dois sentidos, cortando o que sobra e repondo o que falta com base no uso.

### 9. Gestão do conhecimento

- Criou o Paimon, um assistente de IA que cobre o cargo inteiro. Ele usa um vault atômico (Zettelkasten) e funciona em várias instâncias (Cowork, Hermes e Claude Code), coordenadas por regras e por um log compartilhado.
- Montou um sistema de controle de demandas por dia, cliente e frente, com um Kanban próprio: 50 registros entre 25/08 e 15/10/2026.
- Segue a regra de nenhum dado inventado: o que não está documentado vira pendência, não suposição.

## Reconhecimentos registrados em reunião

- **Daniel Maia, CEO da Hoom, ao apresentá-lo à Engemon (07/08/2026):** "ele é o nosso gestor de inovação, que trabalha, especialista com IA".
- **Daniel Maia, sobre a chegada do Claude e as integrações (16/09/2026):** "isso é um mérito teu".
- **Daniel Maia, sobre o serviço recorrente (21/09/2026):** "um produto que eu nunca vi... a gente vai trazer toda skill que a gente tem de automação, de IA com Iago".
- **Daniel Maia, diante do time do ecossistema OPER8 (06/10/2026):** "você, o nosso gestor de inovação, o que você acha disso tudo?".
- **Daniel Maia, sobre o MVP Eclipse (07/10/2026):** "Parabéns, muito bom".
- **Luciano Souza, do Assaí, sobre o MVP (07/10/2026):** "genial... muito bom".
- **Bruno Freitas, comercial da Marlim:** "eu gostei" (17/09/2026) e "Perfeito, eu gostei desse" (08/10/2026).
- **Squads:**
  - Ana Cordeiro: o Claude ficou "bem melhor" que o Manus.
  - Eduarda: "super funciona, ficou excelente".
  - Dominique: "a gente acertou bem legal... implementar isso para o restante deve ser muito bom".
  - Talita: "muito didático, bem esclarecedor".

## Competências

- **Estratégia de inovação:** desenho de setor, roadmap de adoção, métricas por perfil, pitch para liderança e investidores.
- **Gestão da mudança:** treinamento em escala de toda a equipe, diagnóstico de adesão, multiplicadores por squad, canal único de feedback.
- **Governança de IA:** critérios de entrada no stack, política de modelos, contas e custos, privacidade e LGPD, regra de nenhum dado inventado.
- **Engenharia e arquitetura:** IA em produto (API da Anthropic, créditos, agentes e rotinas), arquitetura multi-tenant, briefings para desenvolvimento assistido por IA.
- **Consultoria de processos:** estudo do processo antes da solução, desenho de fluxos e automações no Monday, dashboards de receita, auditoria de dados.
- **Gestão de custos de ferramentas:** validação de gasto, acompanhamento de consumo por squad, planos de corte rápidos e emergenciais.
- **Pré-venda:** propostas técnicas, estimativa de esforço e preço, MVP rápido para validar com o cliente, análise de editais de licitação.
- **Desenvolvimento e infraestrutura web:** programação, WordPress e WooCommerce, servidores, deploy e DNS de e-mail.
- **Didática:** guias segmentados por perfil, com design system próprio e materiais versionados.

## Stack

Claude (projetos, skills, Claude Code, Claude Design, Cowork, Claude in Chrome), API da Anthropic, ChatGPT, Freepik/Magnific, Google Flow, Monday, Reportei, tl;dv, Slack, Discord, Obsidian, WordPress, aaPanel, Vercel, além do stack dos produtos OPER8 (todo.oper8 e oper8.marketing).

## Relacionadas
- [[perfil-profissional-20261015]]
- [[Usuário - Iago Benvindo]]
- [[Pitch do Setor de Gestão de Inovação da Hoom]]
- [[Ganho de tempo medido com IA (antes e depois)]]
- [[Roadmap de IA do Oper8 - fases 2 e 3 (créditos, API e rotinas)]]
- [[Marlim]]
- [[Projeto de IA nas squads da Hoom]]
- [[Log de sessões do assistente]]
