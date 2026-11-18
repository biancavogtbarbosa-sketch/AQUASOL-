/**
 * main.js - Navegação por abas, Trilha do Conhecimento e Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initKnowledgeTrail();
    initQuiz();
    initPresentationMode();
});

// --- Navegação por Abas Acessível ---
function initTabs() {
    const tabList = document.querySelector('[role="tablist"]');
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    // Menu mobile
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        navUl.classList.toggle('expanded');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab(tab, tabs, panels);
        });

        // Navegação por teclado (Setas, Home, End)
        tab.addEventListener('keydown', (e) => {
            let index = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                activateTab(tabs[(index + 1) % tabs.length], tabs, panels);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                activateTab(tabs[(index - 1 + tabs.length) % tabs.length], tabs, panels);
            } else if (e.key === 'Home') {
                e.preventDefault();
                activateTab(tabs[0], tabs, panels);
            } else if (e.key === 'End') {
                e.preventDefault();
                activateTab(tabs[tabs.length - 1], tabs, panels);
            }
        });
    });

    // Deep-linking via hash na URL
    if (window.location.hash) {
        const targetTab = document.querySelector(`a[href="${window.location.hash}"]`);
        if (targetTab) {
            activateTab(targetTab, tabs, panels);
        }
    }
}

function activateTab(newTab, allTabs, allPanels) {
    // Desativar todos
    allTabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('active');
        t.style.borderBottomColor = 'transparent';
        t.style.borderLeftColor = 'transparent';
    });
    allPanels.forEach(p => p.classList.add('hidden'));

    // Ativar novo
    newTab.setAttribute('aria-selected', 'true');
    newTab.classList.add('active');
    
    // Cor de destaque da aba
    const color = newTab.getAttribute('data-color');
    if (window.innerWidth >= 768) {
        newTab.style.borderBottomColor = color;
    } else {
        newTab.style.borderLeftColor = color;
    }

    const panelId = newTab.getAttribute('href').substring(1);
    const targetPanel = document.getElementById(panelId);
    targetPanel.classList.remove('hidden');
    
    // Atualizar URL sem recarregar
    history.pushState(null, null, `#${panelId}`);
    
    // Atualizar trilha
    updateTrail(panelId);
    
    // Fechar menu mobile se aberto
    document.querySelector('nav ul').classList.remove('expanded');
    document.querySelector('.mobile-menu-btn').setAttribute('aria-expanded', 'false');
    
    // Mover foco para o painel para leitores de tela
    targetPanel.setAttribute('tabindex', '-1');
    targetPanel.focus();
}

// --- Trilha do Conhecimento (localStorage) ---
function initKnowledgeTrail() {
    const visited = JSON.parse(localStorage.getItem('aquasol_visited') || '[]');
    updateProgressBar(visited);
}

function updateTrail(sectionId) {
    let visited = JSON.parse(localStorage.getItem('aquasol_visited') || '[]');
    if (!visited.includes(sectionId)) {
        visited.push(sectionId);
        localStorage.setItem('aquasol_visited', JSON.stringify(visited));
        updateProgressBar(visited);
    }
}

function updateProgressBar(visited) {
    const totalSections = 7; // Total de abas
    const progress = Math.min((visited.length / totalSections) * 100, 100);
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('trail-text');
    const container = document.querySelector('.progress-container');
    
    bar.style.width = `${progress}%`;
    container.setAttribute('aria-valuenow', progress);
    text.textContent = `Você explorou ${Math.round(progress)}% do conteúdo. Continue navegando!`;
}

// --- Quiz Interativo ---
function initQuiz() {
    const buttons = document.querySelectorAll('.quiz-btn');
    const feedback = document.getElementById('quiz-feedback');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            const message = btn.getAttribute('data-feedback');
            
            feedback.textContent = message;
            feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            
            // Anunciar para leitor de tela
            feedback.setAttribute('role', 'status');
        });
    });
}

// --- Modo Apresentação ---
function initPresentationMode() {
    const btn = document.getElementById('presentation-mode-btn');
    btn.addEventListener('click', () => {
        document.body.classList.toggle('presentation-mode');
        const isActive = document.body.classList.contains('presentation-mode');
        btn.textContent = isActive ? '❌ Sair do Modo Apresentação' : '🖥️ Modo Apresentação (Sala de Aula)';
    });
}
