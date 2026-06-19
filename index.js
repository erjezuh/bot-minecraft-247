const mc = require('minecraft-protocol');

module.exports = async (req, res) => {
    // Configura tus datos de TickHosting aquí
    const config = {
        host: 'node-fi-free-03.tickhosting.com', 
        port: 42607,          
        username: 'KeepAliveBot',
        version: '1.21.1'
    };

    try {
        const client = mc.createClient(config);
        
        // Timeout de seguridad: Si no responde en 5 segundos, cerramos
        const timer = setTimeout(() => client.end(), 5000);

        client.on('connect', () => {
            clearTimeout(timer);
            client.end();
            res.status(200).send('Servidor tocado y despierto.');
        });

        client.on('error', (err) => {
            clearTimeout(timer);
            res.status(500).send('Error conectando: ' + err.message);
        });

    } catch (error) {
        res.status(500).send('Error interno: ' + error.message);
    }
};
