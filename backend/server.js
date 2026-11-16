// Načítanie Expressu, MySQL klienta a pomocníka na skladanie ciest k súborom.
const express = require('express');
const mysql = require('mysql2');
const path = require('node:path');

// Vytvorenie webového servera a nastavenie portu.
const app = express();
const port = 3000;

// Umožní spracovať JSON telo požiadaviek, napríklad pri pridávaní knihy.
app.use(express.json());

// Vytvorenie pripojenia k databáze knižnice.
const db = mysql.createConnection({
    host: '172.31.240.1',
    user: 'cviko',
    password: 'change-me-local',
    database: 'kniznica',
});
const databaza = db.promise();

// Overí údaje knihy; pri úprave prázdne polia doplní pôvodnými hodnotami.
function spracujUdajeKnihy(udaje = {}, povodnaKniha) {
    const nazovVstup = udaje.nazov;
    if (nazovVstup !== undefined && nazovVstup !== '' && typeof nazovVstup !== 'string') {
        return { chyba: 'Názov knihy musí byť text.' };
    }
    const nazov = typeof nazovVstup === 'string' && nazovVstup.trim()
        ? nazovVstup.trim()
        : povodnaKniha?.nazov;
    if (!nazov) return { chyba: 'Názov knihy je povinný.' };

    const autorVstup = udaje.autor_id;
    const autorId = autorVstup === undefined || autorVstup === ''
        ? povodnaKniha?.autor_id
        : Number(autorVstup);
    if (!Number.isInteger(autorId) || autorId < 1) {
        return { chyba: 'Vyberte platného autora.' };
    }

    const rokVstup = udaje.rok;
    const rok = rokVstup === undefined || rokVstup === ''
        ? povodnaKniha?.rok
        : Number(rokVstup);
    if (!Number.isInteger(rok) || rok < 1 || rok > 9999) {
        return { chyba: 'Rok vydania musí byť celé číslo.' };
    }

    const cenaVstup = udaje.cena;
    const cena = cenaVstup === undefined || cenaVstup === ''
        ? Number(povodnaKniha?.cena)
        : Number(cenaVstup);
    if (!Number.isFinite(cena) || cena < 0) {
        return { chyba: 'Cena musí byť nezáporné číslo.' };
    }

    const zanerVstup = udaje.zaner;
    if (zanerVstup !== undefined && zanerVstup !== '' && typeof zanerVstup !== 'string') {
        return { chyba: 'Žáner musí byť text.' };
    }
    const zaner = typeof zanerVstup === 'string' && zanerVstup.trim()
        ? zanerVstup.trim()
        : povodnaKniha?.zaner ?? null;

    return { kniha: { nazov, autorId, rok, cena, zaner } };
}

// Po nadviazaní spojenia zaregistruje trasy a spustí server.
db.connect(error => {
    if (error) {
        // Pri neúspešnom pripojení vypíše dôvod a ukončí databázové spojenie.
        console.error('Chyba pripojenia k databáze:', error.message);
        db.destroy();
        return;
    }

    console.log('Databáza je pripojená.');

    // Zobrazí stránku knižnice na koreňovej adrese aj na /kniznica.html.
    app.get(['/', '/kniznica.html'], (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'kniznica.html'));
    });

    // Sprístupní súbory potrebné na zobrazenie spoločného navigačného panela.
    app.get('/topbar.html', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'topbar.html'));
    });
    app.get('/style.css', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'style.css'));
    });
    app.get('/kniznica.css', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'kniznica.css'));
    });
    app.get('/IMG/logo_sjf.png', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'IMG', 'logo_sjf.png'));
    });

    // Vráti knihy aj s menom autora.
    app.get('/api/kniznica', async (req, res) => {
        try {
            const [knihy] = await databaza.query(`
                SELECT kniha.id, kniha.autor_id, kniha.\`názov\` AS nazov, autori.meno AS autor,
                       kniha.rok_vydania AS rok, kniha.cena, kniha.\`žáner\` AS zaner
                FROM kniha
                LEFT JOIN autori ON kniha.autor_id = autori.id
                ORDER BY kniha.id`);
            res.json(knihy);
        } catch (chyba) {
            console.error('Chyba pri načítaní kníh:', chyba.message);
            res.status(500).json({ error: 'Knihy sa nepodarilo načítať.' });
        }
    });

    // Vráti autorov zoradených podľa mena pre výber vo formulári.
    app.get('/api/autori', async (req, res) => {
        try {
            const [autori] = await databaza.query('SELECT id, meno FROM autori ORDER BY meno');
            res.json(autori);
        } catch (chyba) {
            console.error('Chyba pri načítaní autorov:', chyba.message);
            res.status(500).json({ error: 'Autorov sa nepodarilo načítať.' });
        }
    });

    // Overí a pridá novú knihu.
    app.post('/api/kniznica', async (req, res) => {
        const vysledok = spracujUdajeKnihy(req.body ?? {});
        if (vysledok.chyba) return res.status(400).json({ error: vysledok.chyba });

        const { nazov, autorId, rok, cena, zaner } = vysledok.kniha;
        try {
            const [vysledokVlozenia] = await databaza.query(
                'INSERT INTO kniha (`názov`, autor_id, rok_vydania, cena, `žáner`) VALUES (?, ?, ?, ?, ?)',
                [nazov, autorId, rok, cena, zaner],
            );
            res.status(201).json({ id: vysledokVlozenia.insertId, message: 'Kniha bola pridaná.' });
        } catch (chyba) {
            console.error('Chyba pri pridávaní knihy:', chyba.message);
            res.status(500).json({ error: 'Knihu sa nepodarilo pridať.' });
        }
    });

    // Prázdne polia pri úprave ponechajú pôvodné hodnoty knihy.
    app.put('/api/kniznica/:id', async (req, res) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Neplatné ID knihy.' });

        try {
            const [knihy] = await databaza.query(
                'SELECT `názov` AS nazov, autor_id, rok_vydania AS rok, cena, `žáner` AS zaner FROM kniha WHERE id = ?',
                [id],
            );
            if (knihy.length === 0) return res.status(404).json({ error: 'Kniha sa nenašla.' });

            const vysledok = spracujUdajeKnihy(req.body ?? {}, knihy[0]);
            if (vysledok.chyba) return res.status(400).json({ error: vysledok.chyba });

            const { nazov, autorId, rok, cena, zaner } = vysledok.kniha;
            const [zmena] = await databaza.query(
                'UPDATE kniha SET `názov` = ?, autor_id = ?, rok_vydania = ?, cena = ?, `žáner` = ? WHERE id = ?',
                [nazov, autorId, rok, cena, zaner, id],
            );

            if (zmena.affectedRows === 0) {
                const [zostava] = await databaza.query('SELECT id FROM kniha WHERE id = ?', [id]);
                if (zostava.length === 0) return res.status(404).json({ error: 'Kniha sa nenašla.' });
            }
            res.json({ message: 'Kniha bola upravená.' });
        } catch (chyba) {
            console.error('Chyba pri úprave knihy:', chyba.message);
            res.status(500).json({ error: 'Knihu sa nepodarilo upraviť.' });
        }
    });

    // Vymaže knihu podľa ID.
    app.delete('/api/kniznica/:id', async (req, res) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Neplatné ID knihy.' });

        try {
            const [vysledok] = await databaza.query('DELETE FROM kniha WHERE id = ?', [id]);
            if (vysledok.affectedRows === 0) return res.status(404).json({ error: 'Kniha sa nenašla.' });
            res.json({ message: 'Kniha bola vymazaná.' });
        } catch (chyba) {
            console.error('Chyba pri mazaní knihy:', chyba.message);
            res.status(500).json({ error: 'Knihu sa nepodarilo vymazať.' });
        }
    });

    // Jednoduchá odpoveď pre neexistujúce adresy.
    app.use((req, res) => {
        if (req.path === '/api' || req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API trasa sa nenašla.' });
        }
        res.status(404).send('Stránka sa nenašla.');
    });

    // Spustí server na všetkých sieťových rozhraniach zariadenia.
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server beží na porte ${port}.`);
    });

});
