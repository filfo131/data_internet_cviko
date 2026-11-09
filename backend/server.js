const express = require('express');
const mysql = require('mysql2');
const path = require('node:path');

const app = express();
const port = 3000;
app.use(express.json());

const db = mysql.createConnection({
    host: '172.31.240.1',
    user: 'cviko',
    password: 'change-me-local',
    database: 'kniznica',
});

db.connect(error => {
    if (error) {
        console.error('Chyba pripojenia k databáze:', error.message);
        db.destroy();
        return;
    }

    console.log('Databáza je pripojená.');

    app.get(['/', '/kniznica.html'], (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'kniznica.html'));
    });

    app.get('/api/kniznica', (req, res) => {
        db.query(`
            SELECT kniha.id, kniha.\`názov\` AS nazov, autori.meno AS autor,
                   kniha.rok_vydania AS rok, kniha.cena, kniha.\`žáner\` AS zaner
            FROM kniha
            LEFT JOIN autori ON kniha.autor_id = autori.id
            ORDER BY kniha.id`, (queryError, knihy) => {
            if (queryError) {
                console.error('Chyba pri načítaní kníh:', queryError.message);
                return res.status(500).json({ error: 'Knihy sa nepodarilo načítať.' });
            }

            res.json(knihy);
        });
    });

    app.get('/api/autori', (req, res) => {
        db.query('SELECT id, meno FROM autori ORDER BY meno', (queryError, autori) => {
            if (queryError) {
                console.error('Chyba pri načítaní autorov:', queryError.message);
                return res.status(500).json({ error: 'Autorov sa nepodarilo načítať.' });
            }

            res.json(autori);
        });
    });

    app.post('/api/kniznica', (req, res) => {
        const { nazov, autor_id, rok, cena, zaner } = req.body ?? {};
        const autorId = Number(autor_id);
        const rokVydania = Number(rok);
        const cenaKnihy = Number(cena);

        if (typeof nazov !== 'string' || !nazov.trim()) {
            return res.status(400).json({ error: 'Názov knihy je povinný.' });
        }
        if (!Number.isInteger(autorId) || autorId < 1) {
            return res.status(400).json({ error: 'Vyberte platného autora.' });
        }
        if (!Number.isInteger(rokVydania) || rokVydania < 1 || rokVydania > 9999) {
            return res.status(400).json({ error: 'Rok vydania musí byť celé číslo.' });
        }
        if (!Number.isFinite(cenaKnihy) || cenaKnihy < 0) {
            return res.status(400).json({ error: 'Cena musí byť nezáporné číslo.' });
        }
        if (zaner !== undefined && zaner !== '' && typeof zaner !== 'string') {
            return res.status(400).json({ error: 'Žáner musí byť text.' });
        }

        db.query(
            'INSERT INTO kniha (`názov`, autor_id, rok_vydania, cena, `žáner`) VALUES (?, ?, ?, ?, ?)',
            [nazov.trim(), autorId, rokVydania, cenaKnihy, zaner?.trim() || null],
            (queryError, result) => {
                if (queryError) {
                    console.error('Chyba pri pridávaní knihy:', queryError.message);
                    return res.status(500).json({ error: 'Knihu sa nepodarilo pridať.' });
                }

                res.status(201).json({ id: result.insertId, message: 'Kniha bola pridaná.' });
            },
        );
    });

    app.delete('/api/kniznica/:id', (req, res) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: 'Neplatné ID knihy.' });
        }

        db.query('DELETE FROM kniha WHERE id = ?', [id], (queryError, result) => {
            if (queryError) {
                console.error('Chyba pri mazaní knihy:', queryError.message);
                return res.status(500).json({ error: 'Knihu sa nepodarilo vymazať.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Kniha sa nenašla.' });
            }

            res.json({ message: 'Kniha bola vymazaná.' });
        });
    });

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server beží na porte ${port}.`);
    });
});
