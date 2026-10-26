const http = require('node:http');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(path.join(__dirname, 'cviko.db'), { readOnly: true });
const port = Number(process.env.PORT || 3000);

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character]);
}

const server = http.createServer((req, res) => {
    if (req.method !== 'GET' || req.url !== '/') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Stránka sa nenašla.');
        return;
    }

    try {
        const knihy = db.prepare(`
            SELECT id, "názov" AS nazov, autor_id, rok_vydania, cena
            FROM knihy
            ORDER BY id
        `).all();

        const rows = knihy.map(kniha => `
            <tr>
                <td>${escapeHtml(kniha.id)}</td>
                <td><strong>${escapeHtml(kniha.nazov)}</strong></td>
                <td>${escapeHtml(kniha.autor_id)}</td>
                <td>${escapeHtml(kniha.rok_vydania ?? '-')}</td>
                <td>${kniha.cena == null ? '-' : `${escapeHtml(kniha.cena)} EUR`}</td>
            </tr>
        `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!doctype html>
<html lang="sk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Katalóg kníh</title>
    <style>
        body { font-family: sans-serif; margin: 2rem; }
        table { border-collapse: collapse; }
        th, td { border: 1px solid #777; padding: 0.5rem; text-align: left; }
    </style>
</head>
<body>
    <h1>Katalóg kníh (SQLite)</h1>
    <table>
        <thead>
            <tr><th>ID</th><th>Názov knihy</th><th>Autor ID</th><th>Rok</th><th>Cena</th></tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>
</body>
</html>`);
    } catch (error) {
        console.error('Nepodarilo sa načítať knihy z databázy:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Knihy sa nepodarilo načítať.');
    }
});

server.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});

server.on('close', () => db.close());
