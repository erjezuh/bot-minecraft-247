const mcping = require('mc-server-ping');

const HOST = 'node-fi-free-03.tickhosting.com';
const PORT = 42607;

console.log(`[${new Date().toLocaleTimeString()}] Enviando ping oficial de Minecraft para Cron-Job...`);

mcping.ping(HOST, PORT, (err, res) => {
    if (err) {
        // Si da error de conexión rechazada, es que está apagado, pero el paquete ha "golpeado" el puerto
        if (err.code === 'ECONNREFUSED') {
            console.log('El servidor está hibernando. ¡Paquete de Minecraft enviado para forzar encendido!');
        } else {
            console.log(`Aviso de red: ${err.message}`);
        }
    } else {
        console.log('¡Ping de Minecraft enviado con éxito! El servidor está online.');
    }
    
    // Cerramos el proceso inmediatamente para Cron-Job
    process.exit(0);
}, 8000); // 8 segundos de timeout
