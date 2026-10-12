const express = require('express'); // import modulu express
const app = express(); // inicializácia aplikácie pre obsluhu servera
const port = 3000;

app.use(express.json()); // middleware pre parsovanie JSON requestov

app.use((req, res, next) => {
    console.log('${req.method} ${req.utl}');
    next();
}); // middleware pre logovanie requestov

app.get('/', (req, res) => {
    res.send('Ahoj, Vitaj tu na stránke'); // definicia GET request na URL /stranka
});

app.listen(port, () => {
    console.log('Server is runnging on http://localhost:${port}'); // spustenie servera na definovanom porte a vypisuje info o tom
});