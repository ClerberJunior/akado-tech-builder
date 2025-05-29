/**
 * Shinobi no Sho - Dados do Sistema
 * Contém as tabelas e informações necessárias para o gerador
 */

const SHINOBI_DATA = {
  // Elementos e suas características
  elements: {
    ninpou: {
      name: "Ninpou",
      displayName: "Ninpou (Neutro)",
      color: "#9ca3af",
      class: "element-ninpou",
      description: "Técnicas neutras sem afinidade elemental"
    },
    katon: {
      name: "Katon",
      displayName: "Katon (Fogo)",
      color: "#ef4444",
      class: "element-katon",
      description: "Técnicas de fogo, caracterizadas por dano e explosões"
    },
    suiton: {
      name: "Suiton",
      displayName: "Suiton (Água)",
      color: "#3b82f6",
      class: "element-suiton",
      description: "Técnicas de água, versáteis e adaptáveis"
    },
    doton: {
      name: "Doton",
      displayName: "Doton (Terra)",
      color: "#84cc16",
      class: "element-doton",
      description: "Técnicas de terra, focadas em defesa e controle"
    },
    fuuton: {
      name: "Fuuton",
      displayName: "Fuuton (Vento)",
      color: "#a3e635",
      class: "element-fuuton",
      description: "Técnicas de vento, afiadas e com grande alcance"
    },
    raiton: {
      name: "Raiton",
      displayName: "Raiton (Raio)",
      color: "#facc15",
      class: "element-raiton",
      description: "Técnicas de raio, rápidas e com alto dano"
    }
  },
  
  // Tipos de ação
  actionTypes: {
    padrao: {
      name: "Padrão",
      description: "Uma ação padrão por turno"
    },
    movimento: {
      name: "Movimento",
      description: "Uma ação de movimento por turno"
    },
    completa: {
      name: "Completa",
      description: "Consome todas as ações do turno"
    },
    reacao: {
      name: "Reação",
      description: "Pode ser usada fora do seu turno como reação"
    }
  },
  
  // Áreas de efeito
  areaTypes: {
    alvo: {
      name: "Alvo único",
      description: "Afeta apenas um alvo"
    },
    linha: {
      name: "Linha",
      description: "Afeta todos os alvos em uma linha reta"
    },
    cone: {
      name: "Cone",
      description: "Afeta uma área em formato de cone"
    },
    esfera: {
      name: "Esfera",
      description: "Afeta uma área esférica ao redor do ponto de impacto"
    },
    onda: {
      name: "Onda",
      description: "Afeta uma área em formato de onda a partir do usuário"
    }
  },
  
  // Durações de efeito
  durations: {
    instantanea: {
      name: "Instantânea",
      description: "O efeito ocorre imediatamente e termina"
    },
    concentracao: {
      name: "Concentração",
      description: "Dura enquanto o usuário mantiver concentração"
    },
    sustentada: {
      name: "Sustentada",
      description: "Dura enquanto o usuário gastar chakra para manter"
    },
    cena: {
      name: "Cena",
      description: "Dura até o final da cena atual"
    },
    permanente: {
      name: "Permanente",
      description: "Efeito permanente até ser dissipado"
    }
  },
  
  // Efeitos por nível
  effects: {
    // Nível 1
    "1": [
      {
        id: "projetil",
        name: "Projétil",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "alvo",
        damage: "comum",
        duration: "instantanea",
        description: "Você dispara um projétil de energia ou elemento contra um alvo, causando dano comum do poder."
      },
      {
        id: "toque",
        name: "Toque",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "toque",
        area: "alvo",
        damage: "comum+1",
        duration: "instantanea",
        description: "Você canaliza energia ou elemento em suas mãos e toca um alvo, causando dano comum do poder +1."
      }
    ],
    
    // Nível 2
    "2": [
      {
        id: "rajada",
        name: "Rajada",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "cone",
        damage: "comum-1",
        duration: "instantanea",
        description: "Você libera uma rajada de energia ou elemento que atinge múltiplos alvos em uma área cônica."
      },
      {
        id: "escudo",
        name: "Escudo",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "reacao",
        range: "pessoal",
        area: "pessoal",
        damage: "nenhum",
        duration: "instantanea",
        description: "Você cria um escudo de energia ou elemento que o protege contra um ataque, concedendo +2 na defesa."
      }
    ],
    
    // Nível 3
    "3": [
      {
        id: "barreira",
        name: "Barreira",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "linha",
        damage: "nenhum",
        duration: "concentracao",
        description: "Você cria uma barreira de energia ou elemento que bloqueia passagem e ataques, com dureza igual ao nível do poder x2."
      },
      {
        id: "explosao",
        name: "Explosão",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "esfera",
        damage: "comum",
        duration: "instantanea",
        description: "Você causa uma explosão de energia ou elemento em um ponto, afetando todos na área."
      }
    ],
    
    // Nível 4
    "4": [
      {
        id: "controle",
        name: "Controle",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "alvo",
        damage: "nenhum",
        duration: "concentracao",
        description: "Você manipula o elemento para controlar movimentos do alvo, que deve fazer um teste de resistência ou ficar impedido."
      },
      {
        id: "nuvem",
        name: "Nuvem",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "esfera",
        damage: "comum/turno",
        duration: "concentracao",
        description: "Você cria uma nuvem de elemento que causa dano a cada turno a quem estiver dentro dela."
      }
    ],
    
    // Nível 5
    "5": [
      {
        id: "correnteza",
        name: "Correnteza",
        elements: ["ninpou", "doton", "fuuton", "suiton"],
        action: "padrao",
        range: "poder",
        area: "onda",
        damage: "comum",
        duration: "instantanea",
        description: "Você conjura uma correnteza que varre seus oponentes, empurrando-os e causando dano."
      },
      {
        id: "sopro",
        name: "Sopro Destrutivo",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "cone",
        damage: "comum",
        duration: "instantanea",
        description: "Você projeta um sopro poderoso que causa dano em uma área cônica ampla."
      }
    ],
    
    // Nível 6
    "6": [
      {
        id: "algemar",
        name: "Algemar",
        elements: ["ninpou", "doton", "suiton"],
        action: "padrao",
        range: "poder",
        area: "alvo",
        damage: "nenhum",
        duration: "concentracao",
        description: "Você prende as pernas do inimigo com amarras do elemento, impedindo sua movimentação."
      },
      {
        id: "onda_explosiva",
        name: "Onda Explosiva",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "pessoal",
        area: "esfera",
        damage: "comum",
        duration: "instantanea",
        description: "Você libera uma onda de choque ao seu redor, atingindo todos os alvos próximos."
      }
    ],
    
    // Nível 7
    "7": [
      {
        id: "clone",
        name: "Clone Elemental",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "completa",
        range: "poder",
        area: "alvo",
        damage: "especial",
        duration: "cena",
        description: "Você cria um clone feito do elemento escolhido que pode realizar ações básicas."
      },
      {
        id: "arma",
        name: "Arma Elemental",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "pessoal",
        area: "pessoal",
        damage: "comum+2",
        duration: "sustentada",
        description: "Você cria uma arma feita de energia ou elemento que causa dano adicional."
      }
    ],
    
    // Nível 8
    "8": [
      {
        id: "prisao",
        name: "Prisão Elemental",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "padrao",
        range: "poder",
        area: "alvo",
        damage: "comum/turno",
        duration: "sustentada",
        description: "Você prende completamente o alvo em uma prisão do elemento, causando dano a cada turno."
      },
      {
        id: "tempestade",
        name: "Tempestade",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "completa",
        range: "poder x2",
        area: "esfera",
        damage: "comum+1/turno",
        duration: "sustentada",
        description: "Você cria uma tempestade do elemento que causa dano contínuo em uma grande área."
      }
    ],
    
    // Nível 9
    "9": [
      {
        id: "avatar",
        name: "Avatar Elemental",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "completa",
        range: "pessoal",
        area: "pessoal",
        damage: "especial",
        duration: "sustentada",
        description: "Você se envolve em uma armadura do elemento, ganhando resistência e aumentando o dano de suas técnicas."
      },
      {
        id: "invocacao",
        name: "Invocação Elemental",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "completa",
        range: "poder",
        area: "alvo",
        damage: "especial",
        duration: "cena",
        description: "Você invoca uma criatura poderosa feita do elemento escolhido para lutar ao seu lado."
      }
    ],
    
    // Nível 10
    "10": [
      {
        id: "cataclisma",
        name: "Cataclisma",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "completa",
        range: "poder x3",
        area: "esfera",
        damage: "comum+3",
        duration: "instantanea",
        description: "Você desencadeia um cataclisma do elemento escolhido, causando destruição massiva na área."
      },
      {
        id: "transformacao",
        name: "Transformação Elemental",
        elements: ["ninpou", "katon", "suiton", "doton", "fuuton", "raiton"],
        action: "completa",
        range: "pessoal",
        area: "pessoal",
        damage: "especial",
        duration: "sustentada",
        description: "Você se transforma temporariamente no próprio elemento, ganhando imunidades e poderes especiais."
      }
    ]
  },
  
  // Fórmulas de cálculo
  formulas: {
    // Cálculo de dano base por nível de poder
    damageByPower: {
      1: "1d6",
      2: "1d6+1",
      3: "1d8+1",
      4: "1d8+2",
      5: "1d10+2",
      6: "1d10+3",
      7: "2d6+3",
      8: "2d8+3",
      9: "2d10+4",
      10: "3d8+4"
    },
    
    // Cálculo de custo de chakra
    chakraCost: function(effectLevel, powerLevel) {
      return effectLevel + Math.floor(powerLevel / 2);
    },
    
    // Cálculo de alcance
    range: function(powerLevel) {
      return powerLevel * 5 + "m";
    }
  }
};
