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
        const timer = setTimeout(() => client.end(), 5000);

        client.on('connect', () => {
            clearTimeout(timer);
            client.end();
            res.status(200).send('OK');
        });

        client.on('error', (err) => {
            clearTimeout(timer);
            res.status(200).send('OK');
        });

    } catch (error) {
        res.status(200).send('OK');
    }
};
