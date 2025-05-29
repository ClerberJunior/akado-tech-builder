/**
 * Akado Tech Builder - Módulo Principal
 * Coordena todas as funcionalidades da aplicação
 */

// Importação de módulos (quando em produção)
// import { validateForm } from './validation.js';
// import { copyToClipboard } from './clipboard.js';
// import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';
// import { exportAsPDF, exportAsHTML } from './export.js';

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
  // Carregar técnicas salvas
  loadSavedTechniques();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Adicionar ícones aos tipos de técnica
  setupTipoIcons();
});

// Função principal para gerar Markdown
function gerarMarkdown() {
  // Validar formulário
  if (!validateForm()) {
    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }
  
  // Obter valores do formulário
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const efeito = document.getElementById("efeito").value;
  const contagio = document.getElementById("contagio").value;
  const veneno = document.getElementById("veneno").value;
  const alvo = document.getElementById("alvo").value;
  const veneficio = parseInt(document.getElementById("veneficio").value);
  const pm = document.getElementById("pm").value;
  const dano = document.getElementById("dano").value;
  const descricao = document.getElementById("descricao").value;

  // Calcular valores derivados
  const dificuldade = 8 + veneficio;
  const alcance = 10 + (2 * veneficio);

  // Gerar Markdown
  const markdown = `## 🕷️ Técnica: ${nome}

**Tipo:** ${tipo}  
**Efeito Base:** ${efeito}  
**Método de Contágio:** ${contagio}  
**Veneno Usado:** ${veneno}  
**Alvo/Área:** ${alvo}  
**Alcance Máximo:** ${alcance}m  
**Custo (PM):** ${pm}  
**Dificuldade de Resistência:** ${dificuldade}  
**Dano Base:** ${dano}  

### 🩸 Descrição Narrativa  
> ${descricao}
`;

  // Exibir resultado
  document.getElementById("markdownOutput").value = markdown;
  
  // Salvar técnica
  saveToLocalStorage({
    nome, tipo, efeito, contagio, veneno, alvo, 
    veneficio, pm, dano, descricao, markdown
  });
  
  // Mostrar notificação de sucesso
  showNotification('Técnica gerada com sucesso!', 'success');
}

// Configuração de event listeners
function setupEventListeners() {
  // Botão de gerar Markdown
  const gerarButton = document.getElementById('gerarButton');
  if (gerarButton) {
    gerarButton.addEventListener('click', gerarMarkdown);
  } else {
    // Compatibilidade com o HTML original
    document.querySelector('button[onclick="gerarMarkdown()"]').onclick = function(e) {
      e.preventDefault();
      gerarMarkdown();
    };
  }
  
  // Adicionar botões de ação se não existirem
  addActionButtons();
}

// Adicionar botões de ação se não existirem no HTML original
function addActionButtons() {
  const markdownOutput = document.getElementById('markdownOutput');
  if (!markdownOutput) return;
  
  // Verificar se já existe container de botões
  let actionContainer = document.querySelector('.action-buttons');
  if (!actionContainer) {
    actionContainer = document.createElement('div');
    actionContainer.className = 'action-buttons';
    markdownOutput.parentNode.insertBefore(actionContainer, markdownOutput.nextSibling);
    
    // Botão de copiar
    const copyButton = document.createElement('button');
    copyButton.id = 'copyButton';
    copyButton.className = 'action-button';
    copyButton.textContent = '📋 Copiar para Clipboard';
    copyButton.onclick = function() {
      copyToClipboard(markdownOutput.value);
    };
    actionContainer.appendChild(copyButton);
    
    // Botão de salvar
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.className = 'action-button';
    saveButton.textContent = '💾 Salvar Técnica';
    saveButton.onclick = function() {
      const markdown = markdownOutput.value;
      if (markdown) {
        saveToLocalStorage(getCurrentTechnique());
        showNotification('Técnica salva com sucesso!', 'success');
      } else {
        showNotification('Nada para salvar. Gere uma técnica primeiro.', 'error');
      }
    };
    actionContainer.appendChild(saveButton);
  }
}

// Adicionar ícones aos tipos de técnica
function setupTipoIcons() {
  const tipoSelect = document.getElementById('tipo');
  if (!tipoSelect) return;
  
  // Adicionar container para ícone se não existir
  const tipoLabel = document.querySelector('label[for="tipo"]');
  if (tipoLabel && !document.querySelector('.tipo-icon-container')) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tipo-icon-container';
    iconContainer.style.display = 'inline-block';
    iconContainer.style.marginLeft = '10px';
    iconContainer.style.verticalAlign = 'middle';
    
    const icon = document.createElement('img');
    icon.id = 'tipoIcon';
    icon.className = 'tipo-icon';
    icon.alt = 'Ícone do tipo de técnica';
    icon.width = 24;
    icon.height = 24;
    
    iconContainer.appendChild(icon);
    tipoLabel.appendChild(iconContainer);
    
    // Atualizar ícone quando o tipo mudar
    tipoSelect.addEventListener('change', updateTipoIcon);
    
    // Definir ícone inicial
    updateTipoIcon();
  }
}

// Atualizar ícone baseado no tipo selecionado
function updateTipoIcon() {
  const tipoSelect = document.getElementById('tipo');
  const tipoIcon = document.getElementById('tipoIcon');
  if (!tipoSelect || !tipoIcon) return;
  
  const tipo = tipoSelect.value;
  let iconPath = '';
  
  switch (tipo) {
    case 'Dokujutsu':
      iconPath = 'assets/images/dokujutsu_icon.png';
      break;
    case 'Iryō Ninjutsu':
      iconPath = 'assets/images/iryo_ninjutsu_icon.png';
      break;
    case 'Híbrido':
      iconPath = 'assets/images/hibrido_icon.png';
      break;
    default:
      iconPath = 'assets/images/dokujutsu_icon.png';
  }
  
  tipoIcon.src = iconPath;
}

// Obter dados da técnica atual
function getCurrentTechnique() {
  return {
    nome: document.getElementById("nome").value,
    tipo: document.getElementById("tipo").value,
    efeito: document.getElementById("efeito").value,
    contagio: document.getElementById("contagio").value,
    veneno: document.getElementById("veneno").value,
    alvo: document.getElementById("alvo").value,
    veneficio: parseInt(document.getElementById("veneficio").value),
    pm: document.getElementById("pm").value,
    dano: document.getElementById("dano").value,
    descricao: document.getElementById("descricao").value,
    markdown: document.getElementById("markdownOutput").value
  };
}

// Exibir notificações
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

// Carregar técnicas salvas
function loadSavedTechniques() {
  const techniques = loadFromLocalStorage();
  // Implementação da exibição de técnicas salvas será adicionada posteriormente
}

// Validação de formulário (será movido para validation.js)
function validateForm() {
  const requiredFields = ['nome', 'efeito', 'contagio', 'alvo', 'veneficio', 'pm'];
  
  for (const field of requiredFields) {
    const element = document.getElementById(field);
    if (!element || !element.value.trim()) {
      return false;
    }
  }
  
  return true;
}

// Copiar para clipboard (será movido para clipboard.js)
function copyToClipboard(text) {
  if (!text) {
    showNotification('Nada para copiar. Gere uma técnica primeiro.', 'error');
    return;
  }
  
  // Usar API moderna de clipboard se disponível
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showNotification('Copiado para a área de transferência!', 'success');
      })
      .catch(err => {
        showNotification('Erro ao copiar: ' + err, 'error');
        fallbackCopyToClipboard(text);
      });
  } else {
    fallbackCopyToClipboard(text);
  }
}

// Método alternativo para copiar para clipboard
function fallbackCopyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showNotification('Copiado para a área de transferência!', 'success');
    } else {
      showNotification('Falha ao copiar para a área de transferência.', 'error');
    }
  } catch (err) {
    showNotification('Erro ao copiar: ' + err, 'error');
  }
  
  document.body.removeChild(textarea);
}

// Armazenamento local (será movido para storage.js)
function saveToLocalStorage(technique) {
  if (!technique || !technique.nome) return;
  
  let techniques = JSON.parse(localStorage.getItem('akado_techniques') || '[]');
  
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
  
  localStorage.setItem('akado_techniques', JSON.stringify(techniques));
}

// Carregar técnicas do armazenamento local
function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem('akado_techniques') || '[]');
}

// Exportar funções para uso global
window.gerarMarkdown = gerarMarkdown;
