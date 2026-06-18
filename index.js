const mineflayer = require('mineflayer');

const config = {
    host: 'node-fi-free-03.tickhosting.com', 
    port: 42607,          
    username: 'Despertador247',
    version: '1.21.1'
};

console.log(`[${new Date().toLocaleTimeString()}] Ejecutando toque de Cron-Job...`);

const bot = mineflayer.createBot(config);

// Definimos una función para cerrar el script de forma limpia
function terminarScript(mensaje) {
    console.log(mensaje);
    console.log('Cerrando conexión limpiamente para Cron-Job.');
    process.exit(0); // Esto le dice a Render y a Cron-Job que todo ha terminado bien
}

// Si el servidor está online y acepta el inicio de conexión
bot.on('login', () => {
    terminarScript('¡Conexión establecida! Servidor despierto.');
});

// Si el servidor lo echa por los mods
bot.on('kicked', (reason) => {
    terminarScript('El servidor rechazó el login (normal por mods), pero detectó la actividad.');
});

// Si el servidor está hibernando (apagado)
bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        terminarScript('El servidor estaba apagado. ¡Se ha forzado el encendido automático!');
    } else {
        terminarScript(`Aviso de red: ${err.message}`);
    }
});

// Por seguridad, si a los 20 segundos no ha pasado nada, cerramos para no colgar a Cron-Job
setTimeout(() => {
    terminarScript('Timeout: El servidor ha tardado demasiado en responder, cerramos.');
}, 20000);
