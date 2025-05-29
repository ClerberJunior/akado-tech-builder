/**
 * Akado Tech Builder - Módulo de Clipboard
 * Responsável pela funcionalidade de copiar para área de transferência
 */

// Copiar para clipboard
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
window.copyToClipboard = copyToClipboard;
