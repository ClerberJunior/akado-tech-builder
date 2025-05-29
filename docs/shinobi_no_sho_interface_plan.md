# Plano de Interface para o Gerador Expandido Shinobi no Sho

## Visão Geral da Interface

O gerador expandido do Shinobi no Sho terá uma interface modular com várias seções interconectadas, permitindo a criação completa de personagens, técnicas, venenos e outros elementos do sistema.

## Estrutura da Interface

### 1. Navegação Principal
- Menu de navegação com abas para cada módulo principal
- Sistema de salvamento/carregamento persistente
- Opções de exportação em diferentes formatos

### 2. Módulo de Criação de Personagens
- Formulário para informações básicas (nome, vila, nível)
- Seleção de clã com carregamento automático de habilidades especiais
- Distribuição de pontos em atributos com validação de limites
- Seleção de perícias com cálculo automático de valores iniciais
- Seleção de poderes e técnicas
- Cálculo automático de energias (Vitalidade e Chakra)
- Visualização da ficha completa

### 3. Módulo de Geração de Técnicas
- Seleção de elemento (Katon, Suiton, Doton, Fuuton, Raiton)
- Biblioteca de efeitos organizados por nível
- Personalização de nome, descrição e efeitos visuais
- Cálculo automático de dano e custo de chakra
- Seleção de evoluções disponíveis
- Visualização da técnica completa em formato Markdown

### 4. Módulo de Criação de Venenos
- Seleção de tipo e nível de veneno
- Personalização de efeitos e duração
- Cálculo automático de dificuldade de resistência
- Listagem de ingredientes necessários e custo
- Visualização da descrição completa do veneno

### 5. Biblioteca de Referência
- Acesso rápido a tabelas e regras do sistema
- Listagem de clãs e suas habilidades especiais
- Catálogo de técnicas pré-definidas
- Glossário de termos do universo Naruto

## Implementação Técnica

### HTML/CSS
- Layout responsivo usando CSS Grid e Flexbox
- Tema visual inspirado no universo Naruto
- Componentes reutilizáveis para formulários e visualizações
- Suporte para temas claro/escuro

### JavaScript
- Estrutura modular com separação de responsabilidades
- Sistema de armazenamento local para salvar criações
- Validação em tempo real de formulários
- Cálculos automáticos baseados nas regras do sistema
- Exportação em múltiplos formatos (Markdown, HTML, PDF)

### Automação
- Cálculo automático de atributos derivados
- Validação de requisitos e limites do sistema
- Geração de descrições baseadas nas escolhas do usuário
- Preenchimento inteligente de valores padrão

## Prioridades de Desenvolvimento

1. Estrutura básica da interface e navegação
2. Módulo de criação de técnicas (foco inicial)
3. Módulo de criação de personagens
4. Sistema de salvamento/carregamento
5. Módulo de criação de venenos
6. Biblioteca de referência
7. Exportação em múltiplos formatos

## Próximos Passos

1. Criar protótipo HTML/CSS da interface principal
2. Implementar o módulo de criação de técnicas
3. Desenvolver o sistema de armazenamento local
4. Expandir para os demais módulos
5. Testar e refinar a interface com base no feedback
