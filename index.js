const mineflayer = require('mineflayer');

const config = {
    host: 'node-fi-free-03.tickhosting.com', 
    port: 42607,          
    username: 'Despertador247',
    version: '1.21.1'
};

function ejecutarBot() {
    console.log(`[${new Date().toLocaleTimeString()}] Iniciando intento de login con Mineflayer...`);
    
    const bot = mineflayer.createBot(config);
    let terminado = false;

    function finalizarCiclo(mensaje) {
        if (terminado) return;
        terminado = true;

        console.log(mensaje);
        try {
            bot.quit();
        } catch (e) {}

        // En lugar de cerrar el programa, programamos el siguiente intento en 15 segundos
        const proximoInvento = 15000; 
        console.log(`Esperando ${proximoInvento / 1000} segundos para el próximo intento...\n`);
        setTimeout(ejecutarBot, proximoInvento);
    }

    // Si el servidor está online
    bot.on('login', () => {
        finalizarCiclo('¡Login iniciado con éxito! Servidor despierto.');
    });

    // Si el servidor lo echa por los mods
    bot.on('kicked', (reason) => {
        finalizarCiclo('El servidor rechazó el login por mods, pero detectó la actividad.');
    });

    // Si el servidor está apagado o hibernando
    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            finalizarCiclo('El servidor está en hibernación. ¡Intento enviado para forzar encendido!');
        } else {
            finalizarCiclo(`Aviso de red: ${err.message}`);
        }
    });

    // Timeout de seguridad por si se queda colgado intentando conectar
    setTimeout(() => {
        finalizarCiclo('Timeout: El intento actual ha tardado demasiado.');
    }, 12000);
}

// Arranca el bucle por primera vez
ejecutarBot();
