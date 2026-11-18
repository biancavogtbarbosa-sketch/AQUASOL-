/**
 * acessibilidade.js - Controles de acessibilidade e persistência
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccessibilityBar();
    loadPreferences();
});

function initAccessibilityBar() {
    const toggleBtn = document.getElementById('toggle-access-menu');
    const options = document.getElementById('access-options');
    
    // Toggle menu
    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        options.classList.toggle('hidden');
    });

    // Ações
    document.getElementById('font-increase').addEventListener('click', () => changeFontSize(1));
    document.getElementById('font-decrease').addEventListener('click', () => changeFontSize(-1));
    document.getElementById('font-reset').addEventListener('click', () => {
        document.body.style.fontSize = '';
        localStorage.setItem('aquasol_fontsize', '');
    });
    
    document.getElementById('toggle-dyslexic').addEventListener('click', () => toggleClass('fonte-dislexia'));
    document.getElementById('toggle-contrast').addEventListener('click', () => toggleClass('alto-contraste'));
    document.getElementById('toggle-dark').addEventListener('click', () => toggleClass('modo-escuro'));
    document.getElementById('toggle-underline').addEventListener('click', () => toggleClass('links-sublinhados'));
    document.getElementById('toggle-motion').addEventListener('click', () => toggleClass('reduzir-movimento'));
    
    document.getElementById('speak-page').addEventListener('click', speakCurrentContent);
}

function changeFontSize(direction) {
    const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    const newSize = currentSize + (direction * 2);
    if (newSize >= 12 && newSize <= 32) {
        document.body.style.fontSize = `${newSize}px`;
        localStorage.setItem('aquasol_fontsize', `${newSize}px`);
    }
}

function toggleClass(className) {
    document.body.classList.toggle(className);
    localStorage.setItem(`aquasol_${className}`, document.body.classList.contains(className));
}

function loadPreferences() {
    const fontSize = localStorage.getItem('aquasol_fontsize');
    if (fontSize) document.body.style.fontSize = fontSize;

    ['fonte-dislexia', 'alto-contraste', 'modo-escuro', 'links-sublinhados', 'reduzir-movimento'].forEach(cls => {
        if (localStorage.getItem(`aquasol_${cls}`) === 'true') {
            document.body.classList.add(cls);
        }
    });
}

// --- Web Speech API (Leitor de Texto) ---
function speakCurrentContent() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Parar fala anterior
        
        const activePanel = document.querySelector('.tab-content.active');
        const textToRead = activePanel.innerText;
        
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Seu navegador não suporta a API de síntese de voz.');
    }
}
