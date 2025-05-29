# Guia do Usuário - Akado Tech Builder

Este guia detalhado fornece instruções passo a passo sobre como utilizar o Akado Tech Builder para criar técnicas personalizadas para o sistema Shinobi no Sho, com foco especial nas especialidades do Clã Akado: Dokujutsu, Iryō Ninjutsu e técnicas híbridas.

## Primeiros Passos

Para começar a utilizar o Akado Tech Builder, siga estas etapas iniciais:

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Você verá a interface principal com o logo do Clã Akado e um formulário para preenchimento
3. Certifique-se de que seu navegador permite JavaScript, pois ele é necessário para as funcionalidades de cálculo e geração de Markdown

## Preenchendo o Formulário

O formulário do Akado Tech Builder contém diversos campos que devem ser preenchidos para gerar sua técnica personalizada. Vamos detalhar cada um deles:

### Nome da Técnica

Digite um nome único e descritivo para sua técnica. Recomendamos utilizar nomes que reflitam a natureza da técnica, possivelmente em japonês ou com termos que remetam ao universo ninja. Por exemplo:
- "Dokugiri no Jutsu" (Técnica da Névoa Venenosa)
- "Shinkeigasu" (Gás Neurotóxico)
- "Chiyute no Doku" (Toque Curativo Venenoso)

### Tipo de Técnica

Selecione uma das três opções disponíveis:
- **Dokujutsu**: Técnicas focadas em venenos e toxinas
- **Iryō Ninjutsu**: Técnicas médicas e de cura
- **Híbrido**: Combinação das duas disciplinas, geralmente envolvendo venenos com propriedades medicinais ou curas que utilizam toxinas

A escolha do tipo influencia a interpretação da técnica pelo mestre e pode afetar como ela interage com outras habilidades e resistências.

### Efeito Base

Descreva o efeito fundamental da técnica de forma concisa. Este campo deve explicar o que a técnica faz em termos mecânicos. Exemplos:
- "Causa paralisia temporária por 1d4 turnos"
- "Reduz a visão do alvo em -4 por 3 turnos"
- "Cura 2d6 pontos de vida, mas causa 1d4 de dano por veneno"

### Método de Contágio

Especifique como a técnica afeta o alvo. As opções comuns incluem:
- Contato direto
- Arma envenenada
- Inalação
- Ingestão
- Ferimento aberto
- Projeção à distância

O método de contágio é crucial para determinar como os personagens podem se defender ou evitar a técnica.

### Veneno Usado

Indique qual substância tóxica é utilizada na técnica. Pode ser um veneno real ou fictício do universo de Shinobi no Sho. Exemplos:
- Veneno de aranha-violinista
- Extrato de cicuta
- Toxina de peixe-balão
- Veneno de cobra-coral
- Neurotoxina sintética Akado-V3

### Alvo / Área

Defina o escopo de afetação da técnica:
- Alvo único
- Área pequena (3m de raio)
- Área média (5m de raio)
- Linha reta (10m x 2m)
- Cone (6m)

### Venefício (nível)

Insira o nível de proficiência em venenos do personagem. Este valor influencia diretamente:
- O alcance máximo da técnica
- A dificuldade de resistência para os alvos

O valor padrão é 10, mas pode variar de 1 a 20 dependendo do nível do personagem e sua especialização.

### Custo (PM)

Defina quantos Pontos de Mana (PM) são necessários para executar a técnica. Técnicas mais poderosas geralmente custam mais PM. O valor padrão é 3, mas pode variar de 1 a 20 ou mais.

### Dano Base

Especifique o dano causado pela técnica, se aplicável. Use a notação padrão de RPG, como:
- "2d6 de veneno"
- "1d8 + Venefício de ácido"
- "3d4 de dano contínuo por 3 turnos"

Para técnicas de cura, indique a quantidade de pontos de vida recuperados.

### Descrição Narrativa

Este campo permite uma descrição detalhada e flavorful da técnica. Aqui você pode explicar:
- Como a técnica se manifesta visualmente
- Quais sensações ela causa
- Detalhes históricos sobre seu desenvolvimento
- Particularidades do Clã Akado relacionadas à técnica

Uma boa descrição narrativa enriquece a experiência de jogo e ajuda o mestre a visualizar como a técnica funciona no mundo.

## Gerando e Utilizando o Markdown

Após preencher todos os campos necessários:

1. Clique no botão "🧪 Gerar Técnica"
2. O sistema calculará automaticamente:
   - O alcance máximo baseado no nível de Venefício
   - A dificuldade de resistência para os alvos
3. O resultado será exibido na área de Markdown abaixo do formulário
4. Selecione todo o conteúdo gerado e copie (Ctrl+C ou Cmd+C)
5. Cole o conteúdo em seu sistema de notas preferido (Obsidian, Notion, etc.)

## Exemplos Práticos

### Exemplo 1: Técnica de Dokujutsu Ofensiva

**Campos preenchidos:**
- **Nome**: Kage no Doku (Veneno das Sombras)
- **Tipo**: Dokujutsu
- **Efeito Base**: Causa cegueira temporária e 2d4 de dano por veneno
- **Método de Contágio**: Projeção de pó tóxico
- **Veneno Usado**: Toxina de aranha-negra Akado
- **Alvo/Área**: Cone de 4m
- **Venefício**: 12
- **Custo (PM)**: 5
- **Dano Base**: 2d4 + 2 de veneno
- **Descrição**: Um pó negro é soprado das mãos do ninja, formando uma nuvem que parece absorver a luz ao redor. Ao entrar em contato com os olhos, causa uma cegueira temporária dolorosa, enquanto partículas tóxicas são absorvidas pela pele, causando dano interno.

**Resultado gerado:**
```markdown
## 🕷️ Técnica: Kage no Doku (Veneno das Sombras)

**Tipo:** Dokujutsu  
**Efeito Base:** Causa cegueira temporária e 2d4 de dano por veneno  
**Método de Contágio:** Projeção de pó tóxico  
**Veneno Usado:** Toxina de aranha-negra Akado  
**Alvo/Área:** Cone de 4m  
**Alcance Máximo:** 34m  
**Custo (PM):** 5  
**Dificuldade de Resistência:** 20  
**Dano Base:** 2d4 + 2 de veneno  

### 🩸 Descrição Narrativa  
> Um pó negro é soprado das mãos do ninja, formando uma nuvem que parece absorver a luz ao redor. Ao entrar em contato com os olhos, causa uma cegueira temporária dolorosa, enquanto partículas tóxicas são absorvidas pela pele, causando dano interno.
```

### Exemplo 2: Técnica de Iryō Ninjutsu Curativa

**Campos preenchidos:**
- **Nome**: Chiyute no Jutsu (Técnica da Mão Curativa)
- **Tipo**: Iryō Ninjutsu
- **Efeito Base**: Cura 3d6 pontos de vida e remove efeitos de veneno leve
- **Método de Contágio**: Contato direto
- **Veneno Usado**: Nenhum
- **Alvo/Área**: Alvo único
- **Venefício**: 8
- **Custo (PM)**: 4
- **Dano Base**: Cura 3d6 PV
- **Descrição**: As mãos do ninja emitem um suave brilho verde enquanto chakra curativo flui para o corpo do alvo. O toque é reconfortante e alivia a dor instantaneamente, enquanto acelera o processo natural de cura e neutraliza toxinas de baixa potência no organismo.

**Resultado gerado:**
```markdown
## 🕷️ Técnica: Chiyute no Jutsu (Técnica da Mão Curativa)

**Tipo:** Iryō Ninjutsu  
**Efeito Base:** Cura 3d6 pontos de vida e remove efeitos de veneno leve  
**Método de Contágio:** Contato direto  
**Veneno Usado:** Nenhum  
**Alvo/Área:** Alvo único  
**Alcance Máximo:** 26m  
**Custo (PM):** 4  
**Dificuldade de Resistência:** 16  
**Dano Base:** Cura 3d6 PV  

### 🩸 Descrição Narrativa  
> As mãos do ninja emitem um suave brilho verde enquanto chakra curativo flui para o corpo do alvo. O toque é reconfortante e alivia a dor instantaneamente, enquanto acelera o processo natural de cura e neutraliza toxinas de baixa potência no organismo.
```

### Exemplo 3: Técnica Híbrida

**Campos preenchidos:**
- **Nome**: Dokubana no Chiyute (Flor Venenosa da Cura)
- **Tipo**: Híbrido
- **Efeito Base**: Cura 2d8 PV no alvo aliado, causa 1d6 de dano em área ao redor
- **Método de Contágio**: Explosão de pólen
- **Veneno Usado**: Extrato de flor-rubra Akado
- **Alvo/Área**: Alvo principal + área de 2m
- **Venefício**: 15
- **Custo (PM)**: 7
- **Dano Base**: Cura 2d8 PV (alvo) / 1d6 dano (inimigos)
- **Descrição**: O ninja libera uma explosão de pólen vermelho brilhante que envolve o alvo aliado em um casulo curativo, enquanto se espalha ao redor afetando os inimigos próximos. O pólen tem propriedades curativas para quem possui a resistência do Clã Akado, mas é tóxico para os demais.

**Resultado gerado:**
```markdown
## 🕷️ Técnica: Dokubana no Chiyute (Flor Venenosa da Cura)

**Tipo:** Híbrido  
**Efeito Base:** Cura 2d8 PV no alvo aliado, causa 1d6 de dano em área ao redor  
**Método de Contágio:** Explosão de pólen  
**Veneno Usado:** Extrato de flor-rubra Akado  
**Alvo/Área:** Alvo principal + área de 2m  
**Alcance Máximo:** 40m  
**Custo (PM):** 7  
**Dificuldade de Resistência:** 23  
**Dano Base:** Cura 2d8 PV (alvo) / 1d6 dano (inimigos)  

### 🩸 Descrição Narrativa  
> O ninja libera uma explosão de pólen vermelho brilhante que envolve o alvo aliado em um casulo curativo, enquanto se espalha ao redor afetando os inimigos próximos. O pólen tem propriedades curativas para quem possui a resistência do Clã Akado, mas é tóxico para os demais.
```

## Dicas e Melhores Práticas

1. **Balanceamento**: Mantenha suas técnicas balanceadas considerando o custo de PM, o dano causado e os efeitos adicionais.

2. **Consistência Narrativa**: Crie técnicas que façam sentido dentro do contexto do Clã Akado e suas especialidades.

3. **Progressão**: Desenvolva uma linha de técnicas com diferentes níveis de poder para representar o crescimento do personagem.

4. **Colaboração**: Compartilhe suas técnicas com outros jogadores e o mestre para garantir que elas se encaixem na campanha.

5. **Organização**: Mantenha um repositório organizado de suas técnicas em Obsidian ou Notion para fácil referência durante as sessões.

## Solução de Problemas

Se você encontrar algum problema ao utilizar o Akado Tech Builder:

- Verifique se JavaScript está habilitado em seu navegador
- Tente atualizar a página (F5 ou Ctrl+R)
- Certifique-se de que todos os campos obrigatórios estão preenchidos
- Se o Markdown gerado parecer incorreto, verifique se não há caracteres especiais não suportados nos campos

---

Este guia foi desenvolvido para auxiliar membros do Clã Akado e outros jogadores de Shinobi no Sho a criar técnicas personalizadas de forma eficiente e consistente com o sistema. Boas criações!
