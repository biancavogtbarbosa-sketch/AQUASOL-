/**
 * simulador-arduino.js - Réplica interativa do circuito com TMP36 e LDR
 */

document.addEventListener('DOMContentLoaded', () => {
    const sliderLDR = document.getElementById('sim-ldr');
    const sliderTemp = document.getElementById('sim-temp');
    const ledRed = document.getElementById('led-red-virtual');
    const ledGreen = document.getElementById('led-green-virtual');
    const serialOutput = document.getElementById('serial-output');

    function updateSimulation() {
        const ldrVal = parseInt(sliderLDR.value);
        const tempADC = parseInt(sliderTemp.value);
        
        // Atualizar labels
        document.getElementById('ldr-val').textContent = ldrVal;
        document.getElementById('temp-adc-val').textContent = tempADC;
        document.getElementById('calc-adc').textContent = tempADC;
        
        // Cálculos exatos do código Arduino
        const voltagem = (tempADC / 1023.0) * 5.0;
        const temperaturaC = (voltagem - 0.5) * 100.0;
        
        document.getElementById('calc-v').textContent = voltagem.toFixed(2);
        document.getElementById('calc-v2').textContent = voltagem.toFixed(2);
        document.getElementById('calc-t').textContent = temperaturaC.toFixed(1);
        
        // Lógica dos LEDs
        if (temperaturaC < 28.0) {
            ledRed.classList.remove('off');
            ledRed.classList.add('on');
            ledGreen.classList.remove('on');
            ledGreen.classList.add('off');
        } else {
            ledRed.classList.remove('on');
            ledRed.classList.add('off');
            ledGreen.classList.remove('off');
            ledGreen.classList.add('on');
        }
        
        // Atualizar Monitor Serial
        serialOutput.textContent = `Luz: ${ldrVal} | Temp: ${temperaturaC.toFixed(2)} C`;
    }

    sliderLDR.addEventListener('input', updateSimulation);
    sliderTemp.addEventListener('input', updateSimulation);
    
    // Inicializar
    updateSimulation();
});
