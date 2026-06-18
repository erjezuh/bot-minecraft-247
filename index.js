const mineflayer = require('mineflayer');

const config = {
    host: 'node-fi-free-03.tickhosting.com', 
    port: 42607,          
    username: 'Despertador247',
    version: '1.21.1'
};

console.log(`[${new Date().toLocaleTimeString()}] Iniciando intento de login con Mineflayer...`);

let bot = mineflayer.createBot(config);

function limpiarBot(mensaje) {
    console.log(mensaje);
    if (bot) {
        try {
            bot.quit(); // Desconecta el bot de forma segura
        } catch (e) {}
        bot = null; // Liberamos la memoria
    }
    console.log('Script en espera del próximo toque de Cron-Job.');
    // NO usamos process.exit(). El código se queda estático y Render no detecta error.
}

// Si el servidor está online
bot.on('login', () => {
    limpiarBot('¡Login iniciado con éxito! Servidor despierto.');
});

// Si el servidor lo echa por los mods
bot.on('kicked', (reason) => {
    limpiarBot('El servidor rechazó el login por mods, pero detectó al bot perfectamente.');
});

// Si el servidor está apagado o hibernando
bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        limpiarBot('El servidor está en hibernación. ¡Intento de login enviado para forzar encendido!');
    } else {
        limpiarBot(`Aviso de red: ${err.message}`);
    }
});

// Timeout de seguridad por si se queda colgado
setTimeout(() => {
    if (bot) {
        limpiarBot('Timeout: El proceso de intento ha terminado.');
    }
}, 15000);
