const mc = require('minecraft-protocol');

module.exports = async (req, res) => {
    const config = {
        host: 'node-fi-free-03.tickhosting.com',
        port: 42607,
        username: 'KeepAliveBot',
        version: '1.21.1'
    };

    try {
        const client = mc.createClient(config);
        
        // El temporizador de seguridad original
        const timer = setTimeout(() => {
            client.end();
            res.status(200).send('OK');
        }, 5000);

        // Volvemos a escuchar el connect original que le gustaba a TickHosting
        client.on('connect', () => {
            clearTimeout(timer);
            // Le damos un mini respiro antes de cerrar para que el hosting registre el login
            setTimeout(() => {
                client.end();
                res.status(200).send('OK');
            }, 1000);
        });

        client.on('error', (err) => {
            clearTimeout(timer);
            res.status(200).send('OK');
        });

    } catch (error) {
        res.status(200).send('OK');
    }
};
