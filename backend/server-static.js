const express = require('express'); // import modulu express
const app = express(); // inicializácia aplikácie pre obsluhu servera
const port = 4000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); // middleware pre parsovanie JSON requestov

app.listen(port, () => {
    console.log('Server is runnging on http://localhost:${port}'); // spustenie servera na definovanom porte a vypisuje info o tom
});