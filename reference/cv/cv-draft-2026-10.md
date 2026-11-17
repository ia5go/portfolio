---
tipo: rascunho
status: aguardando revisão do dono
criado: 2026-10-28
issue: "#27"
---

# Currículo 2026-10: texto para revisão

Texto completo das duas versões do currículo, para revisão antes de publicar.

- Fontes HTML: `reference/cv/cv-pt.html`, `reference/cv/cv-en.html`, estilos em `reference/cv/cv.css`.
- PDFs gerados: `public/cv/iago-benvindo-cv-pt.pdf` e `public/cv/iago-benvindo-cv-en.pdf` (A4, 2 páginas cada, texto selecionável).
- Fatos tirados de `src/content/*` (experiência, competências, formação, contato, hero, Sobre) e de `reference/cv/perfil-profissional-20261015-publico.md`. Onde as fontes divergem, vale o site.

## Pontos para o dono conferir

1. **Português (nativo)** em idiomas: não está escrito em nenhuma fonte; foi incluído por ser óbvio e útil na versão em inglês. Confirme ou remova.
2. **Cursos de IA** (Anthropic Academy e AI Hero) aparecem no site e foram mantidos numa linha compacta. Se a regra "não anunciar uso de IA no processo pessoal" deve valer também para cursos, remova a linha.
3. **Cliente da consultoria** sem nome ("empresa do setor financeiro"), como no site. O perfil público nomeia a Marlim; o site não. Nenhum número da fintech aparece.
4. **Cliente do MVP** sem nome ("proposta comercial"), como no site. O perfil público nomeia o Assaí (campanha Eclipse).
5. **Suporte técnico e infraestrutura web** (WordPress, WooCommerce, aaPanel, Vercel, MX e SPF) foi colocado no cargo atual, como no perfil público. No site, a Esquire Brasil aparece só no período autônomo (03/2025 a 05/2026); o perfil diz que o suporte à Esquire continua no cargo atual. O nome da Esquire ficou só no período autônomo.
6. **Sem link do portfólio**: `siteUrl` ainda é o placeholder `iagobenvindo.example`. Quando o domínio existir, vale incluir no cabeçalho.
7. **Sem cidade/localização**: nenhuma das fontes indicadas traz.
8. **Ensino resumido** como no site (2016 a 2021, "Ensino"). Os CVs antigos de 2025 detalham UFF (monitoria), Prefeitura de Petrópolis (instrutor de informática) e aulas particulares para mestrandos da Griffith College Dublin. Não foram usados, porque o site agrupa tudo numa entrada só.
9. **Hoom 2021–2025 enxuta**: os CVs antigos citam plugins de cookies e reCAPTCHA no CMS, arquitetura em Laravel 8 no portal Irmã Dulce, sistema de pesquisa na DNA Genética e balcão virtual com agendamento no RI Lauro de Freitas. Ficaram de fora por não estarem nas fontes do site; podem entrar se você confirmar.
10. **"25+ sites entregues"** (Sobre) não foi usado: o portfólio lista 24 sites. A seção de projetos diz "entre outros", sem número.

---

## Versão em português

**Iago Benvindo**
Full-Stack Developer · Gestor de Inovação

e-mail benvindoiago@outlook.com · whatsapp +55 (24) 99246-3369 · linkedin linkedin.com/in/iago-benvindo-6b3b031b4 · github github.com/ia5go

### Resumo

Desenvolvedor full-stack com mais de 5 anos de desenvolvimento web. Construo sites, landing pages e sistemas sob medida, do briefing à publicação, e gosto de código que o usuário nem percebe: simplesmente funciona. Passei quase 4 anos na Hoom Interativa criando interfaces, plugins e Design Systems para dezenas de projetos. Hoje, como Gestor de Inovação da Hoom Interativa e da OPER8, desenvolvo produto, participo das decisões de arquitetura e conduzo consultoria de automação e processos. Também dei aulas de programação, inclusive para estudantes de mestrado internacional.

### Experiência

**Gestor de Inovação** · Hoom Interativa · OPER8 · 06/2026 – presente

*Produto e engenharia*

- Ideação, consultoria e desenvolvimento do produto To-Do da OPER8, em breve no ar. Gestão do projeto dos aplicativos To-Do e Marketing, com priorização do backlog; designado para cobrir as decisões técnicas do líder durante as férias dele.
- Camada de IA do produto, desenhada e programada sobre a API da Anthropic. A Fase 1, entregue até a versão 1.74.0, inclui assistente de leitura, memória e continuação de conversa, menções, cache do histórico e cota de créditos por plano.
- Arquitetura: participação nas decisões multi-tenant do ecossistema e proposta de um console administrativo central multi-produto e de uma integração que troca de modelo sem reescrever código.
- MVP interativo entregue em uma semana para uma proposta comercial, com proposta técnica, plano de implementação e estimativa de esforço.
- Suporte técnico e infraestrutura web: WordPress e WooCommerce, servidor (aaPanel), deploy na Vercel e DNS de e-mail (MX e SPF).

*Consultoria e processos*

- Consultoria de automação e processos para uma empresa do setor financeiro: administração do Monday e integrações com Slack, Zendesk e Gmail; redesenho do funil comercial, do lead ao go-live, com automações entre as etapas; auditoria dos indicadores e dashboards de receita.
- Fluxos de trabalho, organização de equipe e treinamento da equipe criativa para uso de IA, com materiais de apoio.

**Desenvolvedor autônomo e consultor técnico** · Autônomo · 03/2025 – 05/2026

- Desenvolvedor externo e consultor da Esquire Brasil, em parceria com a Hoom Interativa.
- Manutenção de sites WordPress e pequenos ajustes para clientes.

**Full-Stack Developer** · Hoom Interativa · 06/2021 – 02/2025

- Desenvolvimento de sites, landing pages e sistemas sob medida, do briefing à publicação.
- Interfaces, plugins e Design Systems para dezenas de projetos.

**Educador em programação e TI** · Ensino · 2016 – 2021

- Aulas de programação, inclusive para estudantes de mestrado internacional; mais de 100 alunos ensinados.

### Projetos selecionados

- **Girassol Azul** · Arte e cultura. Site institucional com as sócias, a incubadora de projetos e as notícias, em português e inglês. girassolazularte.com.br
- **DNA Genética** · Laboratório e saúde. Site de laboratório com unidades, exames, vacinas, convênios, agendamento e acesso aos resultados. dnagenetica.com.br
- **Irmã Dulce (OSID)** · Obras sociais. Site institucional das Obras Sociais Irmã Dulce: educação, saúde, produtos Dulce Natura e doações. irmadulce.org.br
- **Esquire Brasil** · Revista e mídia. Portal de conteúdo editorial com seções como Moda Masculina. esquirebrasil.com.br
- **Engemon** · Grupo de engenharia. Site institucional do grupo, com empresas, áreas de atuação, ESG, novidades e vagas. engemon.com.br

Outros sites: Platinum, Coesa Engenharia, Interartis Brasil, RI Lauro de Freitas, Brasquímica, Shopping Central Park, Sport One / CFMOTO, Elite Engenharia, entre outros.

### Competências

- **Em produção:** HTML5, CSS3, SCSS, JavaScript, jQuery, TypeScript, React, Vite, Next.js, PHP, Laravel, MySQL, SQLite, REST APIs, WordPress, WooCommerce, Git, Docker, GSAP, SwiperJS, FullCalendar, Figma, Adobe XD
- **Laboratório:** Node.js, React Native, Supabase (projetos pessoais)
- **Integrações:** Monday, Slack, Zendesk, Gmail, API da Anthropic, Vercel

### Formação

- **2015 – 2020:** Tecnólogo em Tecnologia da Informação e Comunicação · FAETERJ
- **Cursos técnicos:** Git Completo; Princípios SOLID
- **Cursos de IA:** AI Hero Skills Workflow; Anthropic Academy: Claude 101, AI Fluency, Claude Cowork, AI Capabilities and Limitations, Claude Code 101, Introduction to subagents, Claude Code in Action
- **Idiomas:** Português (nativo) · Inglês (avançado)

---

## English version

**Iago Benvindo**
Full-Stack Developer · Innovation Manager

email benvindoiago@outlook.com · whatsapp +55 (24) 99246-3369 · linkedin linkedin.com/in/iago-benvindo-6b3b031b4 · github github.com/ia5go

### Summary

Full-stack developer with more than 5 years of web development. I build custom websites, landing pages and systems, from briefing to launch, and I like code the user never notices: it just works. I spent almost 4 years at Hoom Interativa building interfaces, plugins and Design Systems for dozens of projects. Today, as Innovation Manager at Hoom Interativa and OPER8, I build product, take part in architecture decisions and run automation and process consulting. I have also taught programming, including to international master's students.

### Experience

**Innovation Manager** · Hoom Interativa · OPER8 · 06/2026 – present

*Product and engineering*

- Ideation, consulting and development of OPER8's To-Do product, launching soon. Project management of the To-Do and Marketing apps, including backlog prioritisation; appointed to cover the lead's technical decisions during his holiday.
- The product's AI layer, designed and programmed on the Anthropic API. Phase 1, delivered up to version 1.74.0, includes a read-only assistant, conversation memory and continuation, mentions, history caching and a credit quota per plan.
- Architecture: took part in the ecosystem's multi-tenant decisions and proposed a central multi-product admin console and an integration that switches models without rewriting code.
- Interactive MVP delivered in one week for a commercial proposal, with the technical proposal, implementation plan and effort estimate.
- Technical support and web infrastructure: WordPress and WooCommerce, server (aaPanel), Vercel deploys and email DNS (MX and SPF).

*Consulting and processes*

- Automation and process consulting for a financial-sector company: Monday administration and integrations with Slack, Zendesk and Gmail; sales funnel redesigned from lead to go-live, with automations between stages; KPI audit and revenue dashboards.
- Workflows, team organisation and AI-use training for the creative team, with supporting materials.

**Independent developer and technical consultant** · Self-employed · 03/2025 – 05/2026

- External developer and consultant for Esquire Brasil, together with Hoom Interativa.
- WordPress maintenance and small adjustments for clients.

**Full-Stack Developer** · Hoom Interativa · 06/2021 – 02/2025

- Development of websites, landing pages and custom systems, from briefing to launch.
- Interfaces, plugins and Design Systems for dozens of projects.

**Educator in programming and IT** · Teaching · 2016 – 2021

- Programming lessons, including to international master's students; more than 100 students taught.

### Selected projects

- **Girassol Azul** · Arts and culture. Institutional site featuring the partners, the project incubator and news, in Portuguese and English. girassolazularte.com.br
- **DNA Genética** · Laboratory and healthcare. Laboratory site with units, exams, vaccines, health plans, scheduling and access to results. dnagenetica.com.br
- **Irmã Dulce (OSID)** · Social work. Institutional site of Obras Sociais Irmã Dulce: education, healthcare, Dulce Natura products and donations. irmadulce.org.br
- **Esquire Brasil** · Magazine and media. Editorial content portal with sections such as Men's Fashion. esquirebrasil.com.br
- **Engemon** · Engineering group. Group institutional site, with companies, areas of work, ESG, news and job openings. engemon.com.br

Other sites: Platinum, Coesa Engenharia, Interartis Brasil, RI Lauro de Freitas, Brasquímica, Shopping Central Park, Sport One / CFMOTO, Elite Engenharia, among others.

### Skills

- **In production:** HTML5, CSS3, SCSS, JavaScript, jQuery, TypeScript, React, Vite, Next.js, PHP, Laravel, MySQL, SQLite, REST APIs, WordPress, WooCommerce, Git, Docker, GSAP, SwiperJS, FullCalendar, Figma, Adobe XD
- **Lab:** Node.js, React Native, Supabase (personal projects)
- **Integrations:** Monday, Slack, Zendesk, Gmail, Anthropic API, Vercel

### Education

- **2015 – 2020:** Associate degree in Information and Communication Technology · FAETERJ
- **Technical courses:** Git Complete; SOLID principles
- **AI courses:** AI Hero Skills Workflow; Anthropic Academy: Claude 101, AI Fluency, Claude Cowork, AI Capabilities and Limitations, Claude Code 101, Introduction to subagents, Claude Code in Action
- **Languages:** Portuguese (native) · English (advanced)
