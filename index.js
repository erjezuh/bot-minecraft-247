const express = require('express');
const mineflayer = require('mineflayer');

const app = express();

const HOST = 'mango.fps.ms';
const PORT_MC = 10563;
const VERSION = '1.21.1';
const BOT_NAME = 'KeepAliveBot';

let bot = null;
let reconnectTimeout = null;

// ===== EXPRESS SERVER (Render keep-alive) =====
app.get('/', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// ===== MINEFLAYER BOT =====
function createBot() {
  console.log('Iniciando bot...');

  bot = mineflayer.createBot({
    host: HOST,
    port: PORT_MC,
    username: BOT_NAME,
    version: VERSION
  });

  bot.on('login', () => {
    console.log('Bot conectado al servidor de Minecraft');
  });

  bot.on('spawn', () => {
    console.log('Bot ha spawneado correctamente');
  });

  bot.on('kicked', (reason) => {
    console.log('Bot expulsado:', reason);
    scheduleReconnect();
  });

  bot.on('error', (err) => {
    console.log('Error del bot:', err?.message || err);
    scheduleReconnect();
  });

  bot.on('end', () => {
    console.log('Conexión del bot cerrada');
    scheduleReconnect();
  });
}

// ===== RECONNECT LOGIC =====
function scheduleReconnect() {
  if (reconnectTimeout) return;

  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null;
    console.log('Reconectando bot...');
    createBot();
  }, 5000);
}

// Start bot
createBot();
