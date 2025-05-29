# Documentação Técnica - Akado Tech Builder

Esta documentação técnica detalha a estrutura do código, arquitetura e possibilidades de extensão do Akado Tech Builder, uma ferramenta para criação de técnicas no sistema Shinobi no Sho.

## Estrutura de Arquivos

O projeto Akado Tech Builder está organizado da seguinte forma:

```
akado-tech-builder/
├── index.html              # Arquivo principal da aplicação
├── README.md               # Documentação básica
├── LICENSE                 # Licença MIT
├── assets/                 # Recursos estáticos
│   ├── css/
│   │   └── style.css       # Estilos da aplicação
│   ├── js/
│   │   └── main.js         # Lógica JavaScript principal
│   │   └── clipboard.js    # Funcionalidade de copiar para clipboard
│   │   └── storage.js      # Funcionalidade de armazenamento local
│   │   └── validation.js   # Validação de formulários
│   │   └── export.js       # Exportação em diferentes formatos
│   └── images/
│       ├── akado_logo.png  # Logo do Clã Akado
│       ├── favicon.png     # Favicon do site
│       ├── background.png  # Imagem de fundo
│       ├── dokujutsu_icon.png    # Ícone para técnicas de veneno
│       ├── iryo_ninjutsu_icon.png # Ícone para técnicas médicas
│       └── hibrido_icon.png      # Ícone para técnicas híbridas
└── docs/                   # Documentação detalhada
    ├── README_expanded.md  # README completo com detalhes técnicos
    ├── guia_usuario.md     # Guia do usuário com exemplos
    └── documentacao_tecnica.md  # Este arquivo
```

## Arquitetura do Código

### HTML (index.html)

O arquivo `index.html` contém a estrutura básica da aplicação, incluindo:

1. **Cabeçalho**: Metadados, título e referências a arquivos CSS
2. **Formulário**: Campos para entrada de dados da técnica
3. **Área de Resultado**: Exibição do Markdown gerado
4. **Referências a Scripts**: Carregamento dos arquivos JavaScript

### CSS (style.css)

O arquivo `style.css` contém todos os estilos da aplicação, organizados em:

1. **Variáveis CSS**: Definição de cores, espaçamentos e fontes
2. **Estilos Base**: Configurações gerais para o corpo da página
3. **Componentes**: Estilos específicos para formulários, botões e áreas de resultado
4. **Responsividade**: Media queries para adaptação a diferentes tamanhos de tela
5. **Animações**: Efeitos visuais para melhorar a experiência do usuário

### JavaScript

A lógica da aplicação está dividida em vários arquivos JavaScript:

#### main.js

Arquivo principal que coordena todas as funcionalidades:

```javascript
// Importação de módulos
import { validateForm } from './validation.js';
import { copyToClipboard } from './clipboard.js';
import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';
import { exportAsPDF, exportAsHTML } from './export.js';

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
  // Carregar técnicas salvas
  loadSavedTechniques();
  
  // Configurar event listeners
  setupEventListeners();
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
  document.getElementById('gerarButton').addEventListener('click', gerarMarkdown);
  
  // Botão de copiar para clipboard
  document.getElementById('copyButton').addEventListener('click', () => {
    const markdown = document.getElementById('markdownOutput').value;
    copyToClipboard(markdown);
  });
  
  // Botões de exportação
  document.getElementById('exportPDFButton').addEventListener('click', exportAsPDF);
  document.getElementById('exportHTMLButton').addEventListener('click', exportAsHTML);
}

// Exibir notificações
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Carregar técnicas salvas
function loadSavedTechniques() {
  const techniques = loadFromLocalStorage();
  // Implementação da exibição de técnicas salvas
}

// Exportar funções para uso global
window.gerarMarkdown = gerarMarkdown;
```

#### validation.js

Contém funções para validação de formulários:

```javascript
// Validação de formulário
export function validateForm() {
  const requiredFields = ['nome', 'efeito', 'contagio', 'alvo', 'veneficio', 'pm'];
  
  for (const field of requiredFields) {
    const element = document.getElementById(field);
    if (!element.value.trim()) {
      element.focus();
      return false;
    }
  }
  
  return true;
}

// Validação de valores numéricos
export function validateNumericField(field, min, max) {
  const value = parseInt(document.getElementById(field).value);
  
  if (isNaN(value) || value < min || value > max) {
    return false;
  }
  
  return true;
}
```

#### clipboard.js

Implementa a funcionalidade de copiar para a área de transferência:

```javascript
// Copiar para clipboard
export function copyToClipboard(text) {
  if (!text) {
    showNotification('Nada para copiar. Gere uma técnica primeiro.', 'error');
    return;
  }
  
  navigator.clipboard.writeText(text)
    .then(() => {
      showNotification('Copiado para a área de transferência!', 'success');
    })
    .catch(err => {
      showNotification('Erro ao copiar: ' + err, 'error');
    });
}

// Função auxiliar para notificações
function showNotification(message, type) {
  // Implementação similar à função em main.js
}
```

#### storage.js

Gerencia o armazenamento local de técnicas:

```javascript
const STORAGE_KEY = 'akado_techniques';

// Salvar técnica no armazenamento local
export function saveToLocalStorage(technique) {
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
export function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

// Remover técnica do armazenamento local
export function removeFromLocalStorage(techniqueName) {
  let techniques = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  techniques = techniques.filter(t => t.nome !== techniqueName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(techniques));
}
```

#### export.js

Implementa funcionalidades de exportação em diferentes formatos:

```javascript
// Exportar como PDF
export function exportAsPDF() {
  const markdown = document.getElementById('markdownOutput').value;
  
  if (!markdown) {
    showNotification('Nada para exportar. Gere uma técnica primeiro.', 'error');
    return;
  }
  
  // Implementação da conversão para PDF
  // Pode utilizar bibliotecas como jsPDF ou enviar para um serviço de conversão
}

// Exportar como HTML
export function exportAsHTML() {
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
  a.download = 'tecnica.html';
  a.click();
  
  URL.revokeObjectURL(url);
}

// Converter Markdown para HTML
function convertMarkdownToHTML(markdown) {
  // Implementação simples de conversão
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Técnica Akado</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h2 { color: #cc0000; }
    h3 { color: #570909; }
    blockquote { border-left: 3px solid #cc0000; padding-left: 10px; font-style: italic; }
  </style>
</head>
<body>`;
  
  // Substituições básicas de Markdown para HTML
  html += markdown
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
    .replace(/  \n/g, '<br>');
  
  html += `</body></html>`;
  
  return html;
}

// Função auxiliar para notificações
function showNotification(message, type) {
  // Implementação similar à função em main.js
}
```

## Possibilidades de Extensão

O Akado Tech Builder foi projetado para ser facilmente extensível. Aqui estão algumas possibilidades de expansão:

### 1. Novas Funcionalidades

#### Sistema de Contas de Usuário
- Implementar login/registro para salvar técnicas na nuvem
- Permitir compartilhamento de técnicas entre usuários

#### Biblioteca de Técnicas
- Criar uma biblioteca de técnicas pré-definidas
- Implementar sistema de categorias e tags
- Adicionar funcionalidade de busca e filtragem

#### Visualização Avançada
- Adicionar visualização em cards
- Implementar modo de visualização em lista
- Criar uma visualização de árvore de técnicas relacionadas

### 2. Melhorias Técnicas

#### Otimização de Performance
- Implementar lazy loading para recursos
- Utilizar service workers para funcionamento offline
- Otimizar carregamento de assets

#### Acessibilidade
- Melhorar suporte a leitores de tela
- Implementar navegação por teclado
- Adicionar temas de alto contraste

#### Internacionalização
- Adicionar suporte a múltiplos idiomas
- Implementar sistema de tradução automática

### 3. Integração com Outros Sistemas

#### Integração com VTTs (Virtual Tabletop)
- Exportar técnicas para Roll20, Foundry VTT, etc.
- Criar módulos específicos para sistemas de VTT

#### API para Desenvolvedores
- Criar uma API REST para acesso programático
- Documentar endpoints e formatos de dados
- Fornecer exemplos de integração

#### Extensões para Navegadores
- Desenvolver extensão para Chrome/Firefox
- Permitir acesso rápido à ferramenta a partir de qualquer página

## Guia de Contribuição

Para desenvolvedores interessados em contribuir com o projeto:

1. **Ambiente de Desenvolvimento**
   - Clone o repositório
   - Não são necessárias dependências especiais, basta um editor de texto e um navegador

2. **Padrões de Código**
   - Seguir convenções de nomenclatura camelCase para JavaScript
   - Manter indentação consistente (2 espaços)
   - Comentar funções e blocos complexos

3. **Processo de Contribuição**
   - Criar fork do repositório
   - Implementar mudanças em branch separado
   - Enviar pull request com descrição detalhada

4. **Testes**
   - Testar em múltiplos navegadores (Chrome, Firefox, Safari)
   - Verificar responsividade em diferentes tamanhos de tela
   - Garantir que todas as funcionalidades existentes continuam funcionando

## Considerações de Segurança

O Akado Tech Builder é uma aplicação client-side, o que significa que todos os dados são processados localmente no navegador do usuário. Isso traz algumas considerações importantes:

1. **Armazenamento Local**
   - Os dados são salvos no localStorage do navegador
   - Não há transmissão de dados para servidores externos
   - Os dados podem ser perdidos se o usuário limpar o cache do navegador

2. **Privacidade**
   - Nenhum dado pessoal é coletado
   - Não há cookies de rastreamento
   - Não há análise de comportamento do usuário

3. **Limitações**
   - O armazenamento local tem limite de tamanho (geralmente 5-10MB)
   - Não há sincronização automática entre dispositivos
   - Não há backup automático dos dados

---

Esta documentação técnica foi desenvolvida para auxiliar desenvolvedores a entender, utilizar e estender o Akado Tech Builder. Para dúvidas ou sugestões, entre em contato com a equipe do Clã Akado.
