/**
 * Akado Tech Builder - Módulo de Validação
 * Responsável pela validação de formulários e campos
 */

// Validação de formulário
function validateForm() {
  const requiredFields = ['nome', 'efeito', 'contagio', 'alvo', 'veneficio', 'pm'];
  
  for (const field of requiredFields) {
    const element = document.getElementById(field);
    if (!element || !element.value.trim()) {
      highlightField(field);
      return false;
    }
  }
  
  // Validar valores numéricos
  if (!validateNumericField('veneficio', 1, 20)) {
    return false;
  }
  
  if (!validateNumericField('pm', 1, 30)) {
    return false;
  }
  
  return true;
}

// Validação de valores numéricos
function validateNumericField(fieldId, min, max) {
  const element = document.getElementById(fieldId);
  if (!element) return true; // Ignorar se o campo não existir
  
  const value = parseInt(element.value);
  
  if (isNaN(value) || value < min || value > max) {
    highlightField(fieldId);
    showValidationError(fieldId, `Valor deve estar entre ${min} e ${max}`);
    return false;
  }
  
  return true;
}

// Destacar campo com erro
function highlightField(fieldId) {
  const element = document.getElementById(fieldId);
  if (!element) return;
  
  // Adicionar classe de erro
  element.classList.add('error-field');
  
  // Remover classe após correção
  element.addEventListener('input', function onInput() {
    element.classList.remove('error-field');
    element.removeEventListener('input', onInput);
  });
  
  // Focar no campo
  element.focus();
}

// Mostrar erro de validação
function showValidationError(fieldId, message) {
  const element = document.getElementById(fieldId);
  if (!element) return;
  
  // Verificar se já existe mensagem de erro
  let errorElement = document.getElementById(`${fieldId}-error`);
  
  if (!errorElement) {
    // Criar elemento de erro
    errorElement = document.createElement('div');
    errorElement.id = `${fieldId}-error`;
    errorElement.className = 'validation-error';
    errorElement.style.color = '#cc0000';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '-8px';
    errorElement.style.marginBottom = '8px';
    
    // Inserir após o campo
    element.parentNode.insertBefore(errorElement, element.nextSibling);
  }
  
  // Definir mensagem
  errorElement.textContent = message;
  
  // Remover mensagem após correção
  element.addEventListener('input', function onInput() {
    errorElement.textContent = '';
    element.removeEventListener('input', onInput);
  });
}

// Exportar funções
window.validateForm = validateForm;
window.validateNumericField = validateNumericField;
