const mc = require('minecraft-protocol');

const config = {
    host: 'node-fi-free-03.tickhosting.com', 
    port: 42607,          
    username: 'Despertador247',
    version: '1.21.1'
};

function ejecutarBot() {
    console.log(`[${new Date().toLocaleTimeString()}] Enviando paquete de login ultra-ligero...`);
    
    const client = mc.createClient(config);
    let terminado = false;

    function finalizarCiclo(mensaje) {
        if (terminado) return;
        terminado = true;

        console.log(mensaje);
        try {
            client.end();
        } catch (e) {}

        const proximoIntento = 15000; 
        console.log(`Esperando ${proximoIntento / 1000} segundos para el próximo intento...\n`);
        setTimeout(ejecutarBot, proximoIntento);
    }

    client.on('success', () => {
        finalizarCiclo('¡Paquete de login aceptado! Servidor despierto.');
    });

    client.on('compress', () => {
        finalizarCiclo('¡Paquete de compresión recibido! El servidor está respondiendo.');
    });

    client.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            finalizarCiclo('El servidor está en hibernación. ¡Intento enviado para forzar encendido!');
        } else {
            finalizarCiclo(`Aviso de red: ${err.message}`);
        }
    });

    // Timeout por intento
    setTimeout(() => {
        finalizarCiclo('Timeout del intento actual.');
    }, 10000);
}

ejecutarBot();
