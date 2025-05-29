/**
 * Akado Tech Builder - Módulo de Armazenamento
 * Responsável pelo armazenamento local de técnicas
 */

const STORAGE_KEY = 'akado_techniques';

// Salvar técnica no armazenamento local
function saveToLocalStorage(technique) {
  if (!technique || !technique.nome) return;
  
  let techniques = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
  // Verificar se a técnica já existe
  const index = techniques.findIndex(t => t.nome === technique.nome);
  
  if (index >= 0) {
    // Atualizar técnica existente
    techniques[index] = technique;
  } else {
    // Adicionar nova técnica
    techniques.push(technique);
  }
  
  // Limitar a 20 técnicas salvas
  if (techniques.length > 20) {
    techniques = techniques.slice(-20);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(techniques));
}

// Carregar técnicas do armazenamento local
function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

// Remover técnica do armazenamento local
function removeFromLocalStorage(techniqueName) {
  if (!techniqueName) return;
  
  let techniques = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  techniques = techniques.filter(t => t.nome !== techniqueName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(techniques));
}

// Carregar técnica específica
function loadTechnique(techniqueName) {
  if (!techniqueName) return null;
  
  const techniques = loadFromLocalStorage();
  return techniques.find(t => t.nome === techniqueName) || null;
}

// Listar nomes de técnicas salvas
function listSavedTechniques() {
  const techniques = loadFromLocalStorage();
  return techniques.map(t => t.nome);
}

// Criar interface de técnicas salvas
function createSavedTechniquesUI() {
  const techniques = loadFromLocalStorage();
  if (techniques.length === 0) return;
  
  // Verificar se já existe container
  let container = document.getElementById('savedTechniquesContainer');
  if (!container) {
    // Criar container
    container = document.createElement('div');
    container.id = 'savedTechniquesContainer';
    container.className = 'saved-techniques';
    container.style.marginTop = '20px';
    container.style.padding = '15px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    container.style.borderRadius = '5px';
    container.style.borderLeft = '3px solid #cc0000';
    
    // Adicionar título
    const title = document.createElement('h3');
    title.textContent = '💾 Técnicas Salvas';
    container.appendChild(title);
    
    // Adicionar lista
    const list = document.createElement('ul');
    list.id = 'savedTechniquesList';
    list.style.listStyle = 'none';
    list.style.padding = '0';
    container.appendChild(list);
    
    // Adicionar ao DOM
    const markdownOutput = document.getElementById('markdownOutput');
    if (markdownOutput && markdownOutput.parentNode) {
      markdownOutput.parentNode.appendChild(container);
    } else {
      document.body.appendChild(container);
    }
  }
  
  // Atualizar lista
  const list = document.getElementById('savedTechniquesList');
  if (!list) return;
  
  list.innerHTML = '';
  
  techniques.forEach(technique => {
    const item = document.createElement('li');
    item.style.margin = '5px 0';
    item.style.padding = '8px';
    item.style.backgroundColor = 'rgba(40, 40, 40, 0.7)';
    item.style.borderRadius = '3px';
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.style.alignItems = 'center';
    
    // Nome da técnica
    const nameSpan = document.createElement('span');
    nameSpan.textContent = technique.nome;
    nameSpan.style.fontWeight = 'bold';
    item.appendChild(nameSpan);
    
    // Botões de ação
    const actions = document.createElement('div');
    
    // Botão de carregar
    const loadButton = document.createElement('button');
    loadButton.textContent = '📂 Carregar';
    loadButton.style.marginRight = '5px';
    loadButton.style.padding = '3px 8px';
    loadButton.style.backgroundColor = '#444';
    loadButton.style.border = 'none';
    loadButton.style.borderRadius = '3px';
    loadButton.style.color = '#fff';
    loadButton.style.cursor = 'pointer';
    loadButton.onclick = function() {
      loadTechniqueToForm(technique.nome);
    };
    actions.appendChild(loadButton);
    
    // Botão de remover
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️ Remover';
    deleteButton.style.padding = '3px 8px';
    deleteButton.style.backgroundColor = '#570909';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '3px';
    deleteButton.style.color = '#fff';
    deleteButton.style.cursor = 'pointer';
    deleteButton.onclick = function() {
      if (confirm(`Tem certeza que deseja remover a técnica "${technique.nome}"?`)) {
        removeFromLocalStorage(technique.nome);
        createSavedTechniquesUI();
        showNotification('Técnica removida com sucesso!', 'success');
      }
    };
    actions.appendChild(deleteButton);
    
    item.appendChild(actions);
    list.appendChild(item);
  });
}

// Carregar técnica para o formulário
function loadTechniqueToForm(techniqueName) {
  const technique = loadTechnique(techniqueName);
  if (!technique) {
    showNotification('Técnica não encontrada!', 'error');
    return;
  }
  
  // Preencher formulário
  document.getElementById('nome').value = technique.nome || '';
  document.getElementById('tipo').value = technique.tipo || 'Dokujutsu';
  document.getElementById('efeito').value = technique.efeito || '';
  document.getElementById('contagio').value = technique.contagio || '';
  document.getElementById('veneno').value = technique.veneno || '';
  document.getElementById('alvo').value = technique.alvo || '';
  document.getElementById('veneficio').value = technique.veneficio || 10;
  document.getElementById('pm').value = technique.pm || 3;
  document.getElementById('dano').value = technique.dano || '';
  document.getElementById('descricao').value = technique.descricao || '';
  
  // Atualizar markdown
  document.getElementById('markdownOutput').value = technique.markdown || '';
  
  // Atualizar ícone do tipo se a função existir
  if (typeof updateTipoIcon === 'function') {
    updateTipoIcon();
  }
  
  showNotification(`Técnica "${techniqueName}" carregada com sucesso!`, 'success');
}

// Função auxiliar para notificações
function showNotification(message, type) {
  // Verificar se já existe elemento de notificação
  let notification = document.getElementById('notification');
  
  if (!notification) {
    // Criar elemento de notificação
    notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  // Configurar notificação
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';
  
  // Esconder após 3 segundos
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Exportar funções
window.saveToLocalStorage = saveToLocalStorage;
window.loadFromLocalStorage = loadFromLocalStorage;
window.removeFromLocalStorage = removeFromLocalStorage;
window.loadTechnique = loadTechnique;
window.listSavedTechniques = listSavedTechniques;
window.createSavedTechniquesUI = createSavedTechniquesUI;
window.loadTechniqueToForm = loadTechniqueToForm;
