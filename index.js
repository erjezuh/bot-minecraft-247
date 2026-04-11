const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. SERVIDOR WEB FORZADO (Esto quita los errores amarillos de Render)
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Online');
});

// Forzamos a que escuche en el puerto 10000 o el que Render asigne
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor web detectado en puerto ${PORT}`);
});

// 2. FUNCIÓN DEL BOT
function createBot() {
    console.log('--- Intentando conectar a Minecraft ---');
    
    const client = bedrock.createClient({
        host: '191.96.231.4',
        port: 12026,
        username: 'Bot_247',
        offline: true,
        version: '1.26.10',
        skipPing: true
    });

    client.on('join', () => {
        console.log('¡CONECTADO! El bot ya está dentro.');
    });

    client.on('error', (err) => {
        console.log('Error de conexión:', err.message);
    });

    client.on('close', () => {
        console.log('Reconectando...');
        setTimeout(createBot, 15000);
    });
}

createBot();
