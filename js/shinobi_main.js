/**
 * Shinobi no Sho - Lógica Principal
 * Implementa a automação e interatividade do gerador
 */

document.addEventListener('DOMContentLoaded', function() {
  // Elementos da interface
  const techniqueForm = document.getElementById('technique-form');
  const techniqueElement = document.getElementById('technique-element');
  const techniqueLevel = document.getElementById('technique-level');
  const techniqueEffect = document.getElementById('technique-effect');
  const techniqueName = document.getElementById('technique-name');
  const techniquePower = document.getElementById('technique-power');
  const techniqueAction = document.getElementById('technique-action');
  const techniqueArea = document.getElementById('technique-area');
  const techniqueDescription = document.getElementById('technique-description');
  const generateButton = document.getElementById('generate-technique');
  const copyButton = document.getElementById('copy-technique');
  const exportButton = document.getElementById('export-technique');
  const saveButton = document.getElementById('save-technique');
  const loadButton = document.getElementById('load-technique');
  const markdownOutput = document.getElementById('markdown-output');
  const notification = document.getElementById('notification');
  
  // Elementos de preview
  const previewName = document.getElementById('preview-name');
  const previewElement = document.getElementById('preview-element');
  const previewLevel = document.getElementById('preview-level');
  const previewAction = document.getElementById('preview-action');
  const previewRange = document.getElementById('preview-range');
  const previewArea = document.getElementById('preview-area');
  const previewDamage = document.getElementById('preview-damage');
  const previewCost = document.getElementById('preview-cost');
  const previewDuration = document.getElementById('preview-duration');
  const previewDescription = document.getElementById('preview-description');
  
  // Navegação por abas
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover classe ativa de todas as abas
      navTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Adicionar classe ativa à aba clicada
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Atualizar efeitos disponíveis quando o nível mudar
  techniqueLevel.addEventListener('change', updateAvailableEffects);
  
  // Inicializar efeitos disponíveis
  updateAvailableEffects();
  
  // Gerar técnica quando o botão for clicado
  generateButton.addEventListener('click', generateTechnique);
  
  // Copiar técnica para a área de transferência
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(markdownOutput.textContent)
      .then(() => showNotification('Técnica copiada para a área de transferência!', 'success'))
      .catch(err => showNotification('Erro ao copiar: ' + err, 'error'));
  });
  
  // Exportar técnica como arquivo Markdown
  exportButton.addEventListener('click', () => {
    const name = techniqueName.value || 'tecnica';
    const filename = name.toLowerCase().replace(/\s+/g, '_') + '.md';
    const blob = new Blob([markdownOutput.textContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Técnica exportada como ' + filename, 'success');
  });
  
  // Salvar técnica no armazenamento local
  saveButton.addEventListener('click', () => {
    const technique = {
      name: techniqueName.value,
      element: techniqueElement.value,
      level: techniqueLevel.value,
      effect: techniqueEffect.value,
      power: techniquePower.value,
      action: techniqueAction.value,
      area: techniqueArea.value,
      description: techniqueDescription.value
    };
    
    // Obter técnicas salvas ou inicializar array vazio
    const savedTechniques = JSON.parse(localStorage.getItem('shinobi_techniques') || '[]');
    
    // Verificar se já existe uma técnica com o mesmo nome
    const existingIndex = savedTechniques.findIndex(t => t.name === technique.name);
    
    if (existingIndex >= 0) {
      // Substituir técnica existente
      savedTechniques[existingIndex] = technique;
      showNotification('Técnica atualizada com sucesso!', 'success');
    } else {
      // Adicionar nova técnica
      savedTechniques.push(technique);
      showNotification('Técnica salva com sucesso!', 'success');
    }
    
    // Salvar no armazenamento local
    localStorage.setItem('shinobi_techniques', JSON.stringify(savedTechniques));
  });
  
  // Carregar técnica do armazenamento local
  loadButton.addEventListener('click', () => {
    const savedTechniques = JSON.parse(localStorage.getItem('shinobi_techniques') || '[]');
    
    if (savedTechniques.length === 0) {
      showNotification('Nenhuma técnica salva encontrada.', 'info');
      return;
    }
    
    // Criar modal para seleção de técnica
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'var(--card-bg-color)';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = 'var(--border-radius)';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    
    const modalHeader = document.createElement('div');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.marginBottom = '15px';
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Carregar Técnica';
    modalTitle.style.margin = '0';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--text-color)';
    closeButton.onclick = () => document.body.removeChild(modal);
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    
    const techniqueList = document.createElement('div');
    techniqueList.style.maxHeight = '300px';
    techniqueList.style.overflowY = 'auto';
    
    savedTechniques.forEach(technique => {
      const item = document.createElement('div');
      item.style.padding = '10px';
      item.style.borderBottom = '1px solid var(--border-color)';
      item.style.cursor = 'pointer';
      
      const elementClass = SHINOBI_DATA.elements[technique.element].class;
      
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${technique.name || 'Sem nome'}</strong>
            <div>
              <span class="element-badge ${elementClass}">${SHINOBI_DATA.elements[technique.element].name}</span>
              <span>Nível ${technique.level}</span>
            </div>
          </div>
          <button class="btn btn-outline load-technique-btn">Carregar</button>
        </div>
      `;
      
      item.querySelector('.load-technique-btn').addEventListener('click', () => {
        loadTechniqueData(technique);
        document.body.removeChild(modal);
        showNotification('Técnica carregada com sucesso!', 'success');
      });
      
      techniqueList.appendChild(item);
    });
    
    modalContent.appendChild(techniqueList);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  });
  
  // Função para atualizar efeitos disponíveis com base no nível selecionado
  function updateAvailableEffects() {
    const level = techniqueLevel.value;
    const element = techniqueElement.value;
    
    // Limpar opções atuais
    techniqueEffect.innerHTML = '';
    
    // Filtrar efeitos disponíveis para o elemento e nível selecionados
    const availableEffects = SHINOBI_DATA.effects[level].filter(effect => 
      effect.elements.includes(element)
    );
    
    // Adicionar opções de efeito
    availableEffects.forEach(effect => {
      const option = document.createElement('option');
      option.value = effect.id;
      option.textContent = effect.name;
      techniqueEffect.appendChild(option);
    });
  }
  
  // Função para gerar a técnica com base nos inputs
  function generateTechnique() {
    // Validar inputs
    if (!techniqueName.value) {
      showNotification('Por favor, dê um nome à sua técnica.', 'error');
      return;
    }
    
    if (!techniqueEffect.value) {
      showNotification('Por favor, selecione um efeito para sua técnica.', 'error');
      return;
    }
    
    // Obter dados do formulário
    const name = techniqueName.value;
    const element = techniqueElement.value;
    const level = parseInt(techniqueLevel.value);
    const effectId = techniqueEffect.value;
    const power = parseInt(techniquePower.value);
    const action = techniqueAction.value;
    const area = techniqueArea.value;
    const description = techniqueDescription.value;
    
    // Obter detalhes do efeito selecionado
    const effect = SHINOBI_DATA.effects[level].find(e => e.id === effectId);
    
    // Calcular valores derivados
    const elementData = SHINOBI_DATA.elements[element];
    const actionData = SHINOBI_DATA.actionTypes[action];
    const areaData = SHINOBI_DATA.areaTypes[area];
    const baseDamage = SHINOBI_DATA.formulas.damageByPower[power];
    const range = SHINOBI_DATA.formulas.range(power);
    const chakraCost = SHINOBI_DATA.formulas.chakraCost(level, power);
    
    // Determinar dano final com base no efeito
    let finalDamage = "Nenhum";
    if (effect.damage === "comum") {
      finalDamage = baseDamage;
    } else if (effect.damage === "comum+1") {
      finalDamage = baseDamage + "+1";
    } else if (effect.damage === "comum+2") {
      finalDamage = baseDamage + "+2";
    } else if (effect.damage === "comum+3") {
      finalDamage = baseDamage + "+3";
    } else if (effect.damage === "comum-1") {
      finalDamage = baseDamage + "-1";
    } else if (effect.damage === "comum/turno") {
      finalDamage = baseDamage + " por turno";
    } else if (effect.damage === "especial") {
      finalDamage = "Especial (ver descrição)";
    }
    
    // Atualizar preview
    previewName.textContent = name;
    previewElement.textContent = elementData.name;
    previewElement.className = `element-badge ${elementData.class}`;
    previewLevel.textContent = `Nível ${level}`;
    previewAction.textContent = actionData.name;
    previewRange.textContent = range;
    previewArea.textContent = areaData.name;
    previewDamage.textContent = finalDamage;
    previewCost.textContent = chakraCost;
    previewDuration.textContent = SHINOBI_DATA.durations[effect.duration].name;
    previewDescription.textContent = description || effect.description;
    
    // Gerar markdown
    const markdown = `# Técnica: ${name}

**Elemento:** ${elementData.displayName}  
**Nível:** ${level}  
**Ação:** ${actionData.name}  
**Alcance:** ${range}  
**Área:** ${areaData.name}  
**Dano:** ${finalDamage}  
**Custo (Chakra):** ${chakraCost}  
**Duração:** ${SHINOBI_DATA.durations[effect.duration].name}  

## Descrição
${description || effect.description}

## Efeito Base
${effect.name}: ${effect.description}
`;
    
    // Atualizar output
    markdownOutput.textContent = markdown;
    
    // Mostrar notificação
    showNotification('Técnica gerada com sucesso!', 'success');
  }
  
  // Função para carregar dados de uma técnica salva
  function loadTechniqueData(technique) {
    techniqueName.value = technique.name;
    techniqueElement.value = technique.element;
    techniqueLevel.value = technique.level;
    
    // Atualizar efeitos disponíveis antes de definir o valor
    updateAvailableEffects();
    
    techniqueEffect.value = technique.effect;
    techniquePower.value = technique.power;
    techniqueAction.value = technique.action;
    techniqueArea.value = technique.area;
    techniqueDescription.value = technique.description;
    
    // Gerar a técnica para atualizar a visualização
    generateTechnique();
  }
  
  // Função para mostrar notificações
  function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(`notification-${type}`);
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
  // Atualizar efeitos quando o elemento mudar
  techniqueElement.addEventListener('change', updateAvailableEffects);
  
  // Inicializar com uma técnica de exemplo
  techniqueName.value = "Katon: Goukakyuu no Jutsu";
  techniqueElement.value = "katon";
  techniqueLevel.value = "3";
  updateAvailableEffects();
  techniqueEffect.value = "explosao";
  techniquePower.value = "3";
  techniqueAction.value = "padrao";
  techniqueArea.value = "esfera";
  techniqueDescription.value = "O usuário molda seu chakra em fogo e expele uma grande bola de fogo pela boca, causando uma explosão devastadora ao atingir o alvo.";
  
  // Gerar técnica inicial
  generateTechnique();
});
