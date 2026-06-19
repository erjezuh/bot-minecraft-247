const mc = require('minecraft-protocol');

module.exports = async (req, res) => {
    const config = {
        host: 'node-fi-free-03.tickhosting.com', 
        port: 42607,          
        username: 'KeepAliveBot',
        version: '1.21.1' // Asegúrate de que coincide con la versión del server
    };

    try {
        // Creamos el cliente (esto inicia el proceso de login real)
        const client = mc.createClient(config);
        
        // Le damos 7 segundos de margen para que complete la entrada
        const timer = setTimeout(() => {
            client.end();
            res.status(200).send('OK');
        }, 7000);

        // EVENTO CLAVE: Se activa cuando el bot ha entrado al mundo con éxito
        client.on('login', () => {
            clearTimeout(timer);
            setTimeout(() => {
                client.end(); // Se desconecta tras asegurar el despertar
                res.status(200).send('OK');
            }, 1000);
        });

        // Si da error (por ejemplo, si el server está offline total), respondemos OK a Cron-Job
        client.on('error', (err) => {
            clearTimeout(timer);
            res.status(200).send('OK');
        });

    } catch (error) {
        res.status(200).send('OK');
    }
};
