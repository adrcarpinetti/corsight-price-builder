# Brainstorm de Design - Corsight Fortify Price Builder

## Contexto
Site construtor de preços para o sistema de reconhecimento facial Fortify da Corsight AI. Deve ser intuitivo, profissional e guiar o usuário por perguntas iniciais, dimensionamento de hardware e cálculo detalhado de preços.

---

<response>
<text>

## Ideia 1: "Command Center" — Estética de Centro de Controle de Segurança

**Design Movement**: Inspirado em interfaces de controle militar/segurança (HUD - Heads-Up Display), com elementos de data visualization e dashboards de monitoramento.

**Core Principles**:
1. Hierarquia visual clara com dados em primeiro plano
2. Feedback visual imediato em cada interação
3. Sensação de precisão técnica e confiabilidade
4. Fluxo wizard step-by-step com progresso visível

**Color Philosophy**: Fundo escuro (navy/charcoal profundo) com acentos em ciano/azul elétrico que remetem a interfaces de segurança e tecnologia de ponta. O ciano transmite precisão e modernidade, enquanto o fundo escuro reduz fadiga visual e destaca os dados.

**Layout Paradigm**: Layout vertical wizard com sidebar de progresso fixa à esquerda. Cada etapa ocupa o viewport principal com transições suaves. A sidebar mostra um resumo em tempo real dos custos acumulados.

**Signature Elements**:
1. Linhas de scan horizontais sutis que animam ao passar entre seções
2. Cards com borda luminosa (glow) em ciano ao serem selecionados
3. Números e preços com animação de contagem (count-up)

**Interaction Philosophy**: Cada seleção do usuário gera feedback visual imediato — cards brilham, números atualizam com animação, e o resumo lateral reflete mudanças em tempo real.

**Animation**: Transições de slide entre etapas, números com efeito de contagem, cards com hover glow, progress bar com pulse sutil.

**Typography System**: 
- Display: JetBrains Mono (monospace para dados/preços)
- Body: Space Grotesk (geométrica, moderna, legível)
- Hierarquia: Títulos em peso 700, subtítulos em 500, corpo em 400

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## Ideia 2: "Blueprint" — Estética de Projeto Técnico/Engenharia

**Design Movement**: Inspirado em blueprints de engenharia e documentos técnicos, com grid visível, linhas de construção e tipografia técnica.

**Core Principles**:
1. Clareza absoluta na apresentação de dados
2. Organização modular tipo formulário técnico
3. Estética que transmite engenharia e precisão
4. Progressão lógica e sequencial

**Color Philosophy**: Base em azul-escuro profundo (blueprint) com linhas em branco/ciano claro. Acentos em laranja/âmbar para highlights e CTAs, criando contraste forte. O azul blueprint transmite confiança técnica.

**Layout Paradigm**: Grid visível com seções que se expandem como drawers/accordions. Layout de formulário técnico com labels à esquerda e inputs à direita. Resumo fixo no rodapé como uma "barra de status".

**Signature Elements**:
1. Grid lines sutis visíveis no background (estilo blueprint)
2. Ícones em estilo line-art técnico
3. Badges com cantos cortados (chamfered corners)

**Interaction Philosophy**: Expansão progressiva — seções se revelam conforme o usuário avança. Tooltips técnicos explicam cada item. Validação inline imediata.

**Animation**: Accordion smooth, tooltips com fade, números com spring animation, seções que "desenham" suas bordas ao aparecer.

**Typography System**:
- Display: IBM Plex Mono (técnica, precisa)
- Body: IBM Plex Sans (complementar, limpa)
- Hierarquia: Caps em labels, números em mono, descrições em sans

</text>
<probability>0.05</probability>
</response>

<response>
<text>

## Ideia 3: "Enterprise Flow" — Estética SaaS Premium de Segurança

**Design Movement**: Inspirado em interfaces SaaS enterprise de segurança cibernética (como CrowdStrike, Palo Alto), com foco em usabilidade profissional e confiança corporativa.

**Core Principles**:
1. Profissionalismo e confiança corporativa
2. Wizard intuitivo com mínima fricção
3. Dados apresentados de forma digerível
4. Branding consistente com a identidade Corsight

**Color Philosophy**: Fundo escuro (slate 900/950) com acentos em azul Corsight (#0066CC) e toques de verde para confirmações/sucesso. Cards em superfícies elevadas (slate 800) com bordas sutis. O escuro transmite segurança e sofisticação enterprise.

**Layout Paradigm**: Wizard horizontal com steps no topo. Conteúdo centralizado com largura máxima. Painel de resumo que desliza da direita como um drawer. Cards de seleção em grid responsivo.

**Signature Elements**:
1. Glassmorphism sutil nos cards de resumo
2. Ícones animados de segurança/reconhecimento facial
3. Barra de progresso segmentada com labels

**Interaction Philosophy**: Fluxo linear guiado com possibilidade de voltar. Seleções via cards clicáveis com estados visuais claros. Preview do orçamento acessível a qualquer momento.

**Animation**: Page transitions com framer-motion, cards com scale on hover, progress bar animated, números com spring counting.

**Typography System**:
- Display: DM Sans (moderna, geométrica, profissional)
- Body: Inter (legibilidade máxima para dados)
- Hierarquia: Display bold para títulos, medium para subtítulos, regular para corpo

</text>
<probability>0.07</probability>
</response>

---

## Decisão: Ideia 1 — "Command Center"

Escolho a Ideia 1 por melhor representar a natureza técnica do produto (reconhecimento facial/segurança), criar uma experiência imersiva e diferenciada, e por ser a mais adequada para um configurador de preços que precisa apresentar dados complexos de forma clara e impactante.
