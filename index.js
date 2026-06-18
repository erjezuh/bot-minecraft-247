const mineflayer = require('mineflayer');

const config = {
    host: 'node-fi-free-03.tickhosting.com', 
    port: 42607,          
    username: 'Despertador247',
    version: '1.21.1'
};

console.log(`[${new Date().toLocaleTimeString()}] Iniciando intento de login con Mineflayer...`);

const bot = mineflayer.createBot(config);

function terminar(mensaje) {
    console.log(mensaje);
    process.exit(0); // Cierra el script por completo para que Cron-Job no se sature
}

// Si el servidor está online, intentará entrar
bot.on('login', () => {
    terminar('¡Login iniciado con éxito! Servidor despierto.');
});

// Si el servidor lo echa por culpa de los mods (que es lo normal)
bot.on('kicked', (reason) => {
    terminar('El servidor rechazó el login por mods, pero detectó al bot perfectamente.');
});

// Si el servidor está totalmente apagado/hibernando
bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        terminar('El servidor está en hibernación. ¡Intento de login enviado para forzar encendido!');
    } else {
        terminar(`Aviso de red: ${err.message}`);
    }
});

// Timeout de seguridad: si a los 15 segundos no ha respondido, cerramos
setTimeout(() => {
    terminar('Timeout: El proceso ha terminado.');
}, 15000);
