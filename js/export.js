/**
 * Akado Tech Builder - Módulo de Exportação
 * Responsável pela exportação em diferentes formatos
 */

// Exportar como PDF
function exportAsPDF() {
  const markdown = document.getElementById('markdownOutput').value;
  
  if (!markdown) {
    showNotification('Nada para exportar. Gere uma técnica primeiro.', 'error');
    return;
  }
  
  // Criar HTML para conversão
  const html = convertMarkdownToHTML(markdown);
  
  // Criar um elemento iframe temporário
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  // Escrever HTML no iframe
  iframe.contentDocument.write(html);
  iframe.contentDocument.close();
  
  // Esperar carregamento
  setTimeout(() => {
    // Imprimir iframe como PDF
    iframe.contentWindow.print();
    
    // Remover iframe após impressão
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
  
  showNotification('Preparando PDF para impressão...', 'success');
}

// Exportar como HTML
function exportAsHTML() {
  const markdown = document.getElementById('markdownOutput').value;
  
  if (!markdown) {
    showNotification('Nada para exportar. Gere uma técnica primeiro.', 'error');
    return;
  }
  
  // Converter Markdown para HTML
  const html = convertMarkdownToHTML(markdown);
  
  // Criar blob e link para download
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tecnica_akado.html';
  a.click();
  
  URL.revokeObjectURL(url);
  
  showNotification('HTML exportado com sucesso!', 'success');
}

// Converter Markdown para HTML
function convertMarkdownToHTML(markdown) {
  // Extrair nome da técnica para título
  let title = 'Técnica Akado';
  const titleMatch = markdown.match(/## 🕷️ Técnica: (.*)/);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1];
  }
  
  // Criar HTML base
  let html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Clã Akado</title>
  <style>
    body {
      font-family: 'Noto Sans', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #111;
      color: #eee;
    }
    h2 {
      color: #cc0000;
      border-bottom: 1px solid #333;
      padding-bottom: 10px;
    }
    h3 {
      color: #cc0000;
      margin-top: 20px;
    }
    strong {
      color: #cc0000;
    }
    blockquote {
      border-left: 3px solid #cc0000;
      padding-left: 15px;
      margin-left: 0;
      font-style: italic;
      color: #ccc;
    }
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .logo {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 0.8em;
      color: #666;
    }
    @media print {
      body {
        background-color: white;
        color: black;
      }
      h2, h3, strong {
        color: #570909;
      }
      blockquote {
        border-color: #570909;
        color: #333;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <img class="logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjY2MwMDAwIiBkPSJNNTAgMTBjLTUgMC0xMCAyLTE1IDUtNSAzLTggNy0xMCAxMi0yIDQtMyA5LTMgMTMgMCA1IDEgOSAzIDEzIDIgNSA1IDkgMTAgMTIgNSAzIDEwIDUgMTUgNXMxMC0yIDE1LTVjNS0zIDgtNyAxMC0xMiAyLTQgMy05IDMtMTMgMC01LTEtOS0zLTEzLTItNS01LTktMTAtMTItNS0zLTEwLTUtMTUtNXptMCA4YzMgMCA2IDEgOSAzIDMgMiA1IDQgNiA3IDEgMyAyIDUgMiA4IDAgMyAwIDYtMiA4LTEgMy0zIDUtNiA3LTMgMi02IDMtOSAzcy02LTEtOS0zYy0zLTItNS00LTYtNy0xLTMtMi01LTItOCAwLTMgMC02IDItOCAxLTMgMy01IDYtNyAzLTIgNi0zIDktM3oiLz48cGF0aCBmaWxsPSIjY2MwMDAwIiBkPSJNNTAgMzBjLTMgMC01IDEtNyAzLTIgMS0zIDMtMyA1LTEgMi0xIDQtMSA2IDAgMiAwIDQgMSA2IDAgMiAxIDQgMyA1IDIgMiA0IDMgNyAzczUtMSA3LTNjMi0xIDMtMyAzLTUgMS0yIDEtNCAxLTYgMC0yIDAtNCAxLTYgMC0yLTEtNC0zLTUtMi0yLTQtMy03LTN6Ii8+PHBhdGggZmlsbD0iI2NjMDAwMCIgZD0iTTIwIDUwYy0yIDAtNCAxLTYgMi0xIDEtMiAzLTIgNXYyMGMwIDIgMSA0IDIgNSAyIDEgNCAxIDYgMXM0IDAgNi0xYzEtMSAyLTMgMi01VjU3YzAtMi0xLTQtMi01LTItMS00LTItNi0yek04MCA1MGMtMiAwLTQgMS02IDItMSAxLTIgMy0yIDV2MjBjMCAyIDEgNCAyIDUgMiAxIDQgMSA2IDFzNC0wIDYtMWMxLTEgMi0zIDItNVY1N2MwLTItMS00LTItNS0yLTEtNC0yLTYtMnpNMzUgMTVjLTIgMC00IDEtNSAyLTIgMS0zIDMtMyA1djIwYzAgMiAxIDQgMyA1IDEgMSAzIDIgNSAyczQtMSA1LTJjMi0xIDMtMyAzLTV2LTIwYzAtMi0xLTQtMy01LTEtMS0zLTItNS0yek02NSAxNWMtMiAwLTQgMS01IDItMiAxLTMgMy0zIDV2MjBjMCAyIDEgNCAzIDUgMSAxIDMgMiA1IDJzNC0xIDUtMmMyLTEgMy0zIDMtNXYtMjBjMC0yLTEtNC0zLTUtMS0xLTMtMi01LTJ6TTM1IDY1Yy0yIDAtNCAxLTUgMi0yIDEtMyAzLTMgNXYyMGMwIDIgMSA0IDMgNSAxIDEgMyAyIDUgMnM0LTEgNS0yYzItMSAzLTMgMy01di0yMGMwLTItMS00LTMtNS0xLTEtMy0yLTUtMnpNNjUgNjVjLTIgMC00IDEtNSAyLTIgMS0zIDMtMyA1djIwYzAgMiAxIDQgMyA1IDEgMSAzIDIgNSAyczQtMSA1LTJjMi0xIDMtMyAzLTV2LTIwYzAtMi0xLTQtMy01LTEtMS0zLTItNS0yeiIvPjwvc3ZnPg==" alt="Logo Clã Akado">
    <h1>Clã Akado - Shinobi no Sho</h1>
  </div>`;
  
  // Converter Markdown para HTML
  html += markdown
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
    .replace(/  \n/g, '<br>');
  
  // Adicionar rodapé
  html += `
  <div class="footer">
    <p>Gerado pelo Akado Tech Builder - Clã Akado</p>
    <p>Sistema Shinobi no Sho</p>
  </div>
</body>
</html>`;
  
  return html;
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
window.exportAsPDF = exportAsPDF;
window.exportAsHTML = exportAsHTML;
