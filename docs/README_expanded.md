# 🕷️ Akado Tech Builder

O Akado Tech Builder é uma ferramenta especializada para o sistema de RPG *Shinobi no Sho*, desenvolvida especificamente para o Clã Akado. Esta aplicação web permite a criação e documentação de técnicas com foco em Dokujutsu (técnicas de veneno), Iryō Ninjutsu (técnicas médicas ninja) e suas variantes híbridas.

## Visão Geral

O Clã Akado é conhecido por sua especialização em venenos e técnicas médicas dentro do universo de Shinobi no Sho. Esta ferramenta foi projetada para auxiliar jogadores e mestres a criar, calcular e documentar técnicas personalizadas de forma consistente com as regras do sistema.

A aplicação oferece uma interface intuitiva onde os usuários podem inserir os detalhes de suas técnicas, como nome, tipo, efeito base, método de contágio, entre outros. O sistema então calcula automaticamente valores derivados como alcance máximo e dificuldade de resistência, gerando um documento formatado em Markdown pronto para ser usado em plataformas como Obsidian ou Notion.

## Funcionalidades

### Criação de Técnicas Personalizadas

O Akado Tech Builder permite a criação de técnicas com os seguintes campos:

- **Nome da Técnica**: Identificação única da técnica criada
- **Tipo**: Categorização entre Dokujutsu, Iryō Ninjutsu ou Híbrido
- **Efeito Base**: Descrição do efeito fundamental da técnica
- **Método de Contágio**: Como a técnica afeta o alvo (contato, inalação, ingestão, etc.)
- **Veneno Usado**: Substância base utilizada na técnica
- **Alvo/Área**: Escopo de afetação da técnica
- **Venefício**: Nível de proficiência em venenos, influencia cálculos
- **Custo (PM)**: Pontos de Mana necessários para executar a técnica
- **Dano Base**: Quantidade e tipo de dano causado
- **Descrição Narrativa**: Detalhamento flavorful da técnica para enriquecimento da narrativa

### Cálculos Automáticos

A ferramenta realiza automaticamente os seguintes cálculos baseados nos valores inseridos:

- **Alcance Máximo**: Calculado como 10 + (2 × Venefício) em metros
- **Dificuldade de Resistência**: Calculado como 8 + Venefício

### Exportação em Markdown

O resultado é gerado em formato Markdown, pronto para ser copiado e utilizado em:

- Fichas de personagem no Obsidian
- Documentação de campanha no Notion
- Wikis de grupo de jogo
- Qualquer plataforma que suporte formatação Markdown

## Tecnologias Utilizadas

O Akado Tech Builder foi desenvolvido utilizando:

- HTML5 para estruturação
- CSS3 para estilização
- JavaScript para funcionalidades interativas
- Design responsivo para uso em diferentes dispositivos

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com 🕸️ pelo Clã Akado para o sistema Shinobi no Sho.
