const mineflayer = require('mineflayer');

const config = {
    host: 'node-fi-free-03.tickhosting.com', 
    port: 42607,          
    username: 'Despertador247',
    version: '1.21.1'
};

function crearBot() {
    console.log(`[${new Date().toLocaleTimeString()}] Tocando la puerta del servidor para mantenerlo despierto...`);

    const bot = mineflayer.createBot(config);

    // Si el servidor está online, intentará loguear
    bot.on('login', () => {
        console.log('¡Conexión establecida con éxito! Reiniciando el contador del hosting.');
        // Nos desconectamos a los 10 segundos para no saturar
        setTimeout(() => bot.quit(), 10000);
    });

    // Captura cuando el servidor lo echa (por culpa de los mods o por estar apagado)
    bot.on('kicked', (reason) => {
        console.log('El servidor ha rechazado el login completo (Normal en servers con mods o cargando).');
    });

    // Manejo de errores (Crucial para cuando el servidor está totalmente hibernando)
    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('El servidor está en hibernación profunda. ¡Petición de encendido automático enviada!');
        } else {
            console.log('Aviso de red:', err.message);
        }
    });

    // Bucle infinito: en cuanto se cierra la conexión, espera 3 minutos y vuelve a empezar
    bot.on('end', () => {
        const tiempoEspera = 180000; // 3 minutos (el hosting hiberna a los 5)
        console.log(`Ciclo completado. Próximo intento en 3 minutos...\n`);
        setTimeout(crearBot, tiempoEspera);
    });
}

// Arranca el bot por primera vez
crearBot();
