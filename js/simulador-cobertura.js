/**
 * simulador-cobertura.js - Simulador de Ciclo Dia/Noite com e sem cobertura
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleCoverBtn = document.getElementById('toggle-cover');
    const startBtn = document.getElementById('start-cycle');
    let isCoverOn = false;

    toggleCoverBtn.addEventListener('click', () => {
        isCoverOn = !isCoverOn;
        toggleCoverBtn.textContent = isCoverOn ? "Cobertura: LIGADA" : "Cobertura: DESLIGADA";
        toggleCoverBtn.setAttribute('aria-pressed', isCoverOn);
        drawChart();
    });

    startBtn.addEventListener('click', () => {
        drawChart(true);
    });

    function drawChart(animate = false) {
        // Dados simulados (hora, temp sem cobertura, temp com cobertura)
        // 6h: 20, 8h: 24, 10h: 27, 12h: 29, 14h: 30, 16h: 29, 18h: 26, 20h: 24
        const data = [
            {t: 20, tc: 20}, {t: 24, tc: 25}, {t: 27, tc: 29}, 
            {t: 29, tc: 32}, {t: 30, tc: 34}, {t: 29, tc: 33}, 
            {t: 26, tc: 30}, {t: 24, tc: 29}
        ];

        const width = 350;
        const height = 150;
        const maxX = 7;
        const maxY = 40;

        let pathSem = "M 30 170 ";
        let pathCom = "M 30 170 ";

        data.forEach((point, index) => {
            const x = 30 + (index / maxX) * width;
            const ySem = 170 - ((point.t - 15) / (maxY - 15)) * height;
            const yCom = 170 - ((point.tc - 15) / (maxY - 15)) * height;
            
            pathSem += `L ${x} ${ySem} `;
            pathCom += `L ${x} ${yCom} `;
        });

        document.getElementById('line-sem-cobertura').setAttribute('d', pathSem);
        document.getElementById('line-com-cobertura').setAttribute('d', pathCom);
        
        // Mostrar/esconder linha com cobertura
        document.getElementById('line-com-cobertura').style.display = isCoverOn ? 'block' : 'none';
        
        const finalTemp = isCoverOn ? data[data.length-1].tc : data[data.length-1].t;
        document.getElementById('cobertura-status').textContent = `Temperatura Final (18h): ${finalTemp} °C. A cobertura reduz a perda por evaporação e o efeito estufa retém o IR.`;
    }
    
    drawChart();
});
