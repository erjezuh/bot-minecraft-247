// ... dentro del client.on('connect', ...)
client.on('connect', () => {
    clearTimeout(timer);
    client.end();
    // Cambia esto a solo esto:
    res.status(200).send('OK'); 
});

// ... dentro del client.on('error', ...)
client.on('error', (err) => {
    clearTimeout(timer);
    // Cambia esto a solo esto:
    res.status(200).send('OK'); 
});
