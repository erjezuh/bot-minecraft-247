const http = require('http');
const mineflayer = require('mineflayer');

// 1. EL CORAZÓN (Mantiene vivo el bot en Render)
http.createServer((req, res) => {
  res.write('El bot está despierto');
  res.end();
}).listen(process.env.PORT || 3000);

// 2. LA CONFIGURACIÓN
const botArgs = {
  host: '191.96.231.11',
  port: 12169,
  username: 'InmortalBot',
  version: '1.20.1' 
};

// 3. FUNCIÓN DE CONEXIÓN (Para que si muere, resucite)
function createBot() {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => console.log('Bot en el servidor.'));
  
  bot.on('end', () => {
    console.log('Bot desconectado. Reintentando en 30 segundos...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', (err) => {
    console.log('Error de conexión:', err);
    setTimeout(createBot, 30000);
  });
}

createBot();
