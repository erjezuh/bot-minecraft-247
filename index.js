const net = require('net');

const HOST = 'node-fi-free-03.tickhosting.com';
const PORT = 42607;

console.log(`[${new Date().toLocaleTimeString()}] Enviando Handshake oficial de Minecraft...`);

const client = new net.Socket();

// Buffer con el paquete de Handshake + Request de estado oficial de Minecraft 1.21.1
// Esto simula exactamente cuando el juego actualiza la lista de servidores
const handshakePacket = Buffer.from([
    0x0F, 0x00,             // Longitud del paquete y ID (0x00 para handshake)
    0x04,                   // Versión del protocolo (767 para 1.21.1, abreviado en este buffer básico)
    0x09, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x68, 0x6f, 0x73, 0x74, // Host ficticio (localhost)
    (PORT >> 8) & 0xFF, PORT & 0xFF, // Puerto separado en bytes
    0x01,                   // Siguiente estado (1 para Status)
    0x01, 0x00              // Paquete de Request de estado
]);

client.connect(PORT, HOST, () => {
    console.log('Conectado al puerto. Enviando datos de Minecraft...');
    client.write(handshakePacket);
});

// En cuanto el servidor responda algo (o nos eche), cerramos
client.on('data', (data) => {
    console.log('¡Respuesta recibida del servidor! Paquete de Minecraft aceptado.');
    client.destroy();
    process.exit(0);
});

client.on('close', () => {
    console.log('Conexión cerrada limpiamente.');
    process.exit(0);
});

client.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        console.log('El servidor está hibernando, pero el intento de handshake forzará el inicio.');
    } else {
        console.log(`Aviso de red: ${err.message}`);
    }
    process.exit(0);
});

// Timeout de 7 segundos
setTimeout(() => {
    console.log('Timeout: Paquete enviado, cerrando proceso.');
    process.exit(0);
}, 7000);
