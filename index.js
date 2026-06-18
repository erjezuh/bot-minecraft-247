const net = require('net');

const HOST = 'node-fi-free-03.tickhosting.com';
const PORT = 42607;

console.log(`[${new Date().toLocaleTimeString()}] Iniciando pulso de red para Cron-Job...`);

// Creamos una conexión TCP pura al puerto del servidor
const client = net.connect({ host: HOST, port: PORT }, () => {
    console.log('¡Conexión TCP establecida con éxito! Actividad de red registrada.');
    client.end(); // Cerramos la conexión de inmediato
});

// Si el servidor responde con éxito o rechaza, cerramos el proceso limpiamente
client.on('end', () => {
    console.log('Conexión cerrada de forma limpia.');
    process.exit(0);
});

// Manejo de errores (por si está hibernando/apagado)
client.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        console.log('El servidor está hibernando. El intento de conexión forzará su encendido.');
    } else {
        console.log(`Aviso de red: ${err.message}`);
    }
    process.exit(0); // Forzamos la salida limpia para que Render y Cron-Job no den error
});

// Timeout de seguridad de 10 segundos por si se queda colgado
setTimeout(() => {
    console.log('Timeout: El servidor no ha respondido a tiempo, cerrando script.');
    process.exit(0);
}, 10000);
