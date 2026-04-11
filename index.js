const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. CONFIGURACIÓN DEL SERVIDOR WEB (Para que Render no apague el bot)
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Bot Minecraft 24/7 activo.');
    res.end();
}).listen(process.env.PORT || 3000);

// 2. FUNCIÓN PARA CREAR EL BOT
function createBot() {
    console.log('--- Intentando conectar al servidor ---');
    
    const client = bedrock.createClient({
        host: '191.96.231.4',
        port: 12026,
        username: 'Bot_247', // Puedes cambiar el nombre si quieres
        offline: true,       // Como el server está en Online Mode: False, esto es correcto
        version: '1.26.10',
        skipPing: true       // Salta el ping para evitar el "Ping timed out"
    });

    client.on('join', () => {
        console.log('¡CONECTADO! El bot ya está dentro del servidor.');
    });

    client.on('error', (err) => {
        console.log('Error de conexión:', err.message);
    });

    client.on('close', () => {
        console.log('Conexión cerrada. Reconectando en 15 segundos...');
        setTimeout(createBot, 15000);
    });
}

// 3. ARRANCAR EL BOT
createBot();
