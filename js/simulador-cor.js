/**
 * simulador-cor.js - Simulador de Albedo e Cor da Lona
 */

document.addEventListener('DOMContentLoaded', () => {
    const corSelect = document.getElementById('cor-lona');
    const btnAquecer = document.getElementById('btn-aquecer-cor');
    const lonaVisual = document.getElementById('lona-visual');

    const cores = {
        '0.05': '#111111',
        '0.30': '#0077B6',
        '0.60': '#90BE6D',
        '0.85': '#FDF8F0'
    };

    corSelect.addEventListener('change', () => {
        lonaVisual.style.background = cores[corSelect.value];
    });

    btnAquecer.addEventListener('click', () => {
        const albedo = parseFloat(corSelect.value);
        // Fórmula simplificada: Ganho de temp = (1 - albedo) * fator_solar (ex: 8°C max)
        const variacao = ((1 - albedo) * 8.0).toFixed(1);
        
        document.getElementById('temp-variation').textContent = `+${variacao}`;
        
        let msg = "";
        if (albedo === 0.05) msg = "Máxima absorção! A lona preta converte quase toda a luz em calor.";
        else if (albedo === 0.85) msg = "Máxima reflexão! A lona branca mantém a água fria, ideal para climas muito quentes.";
        else msg = "Absorção intermediária. O albedo define quanta energia é 'rebatida' para fora do sistema.";
        
        document.getElementById('albedo-ranking').textContent = msg;
    });
});
