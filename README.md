# data_internet_cviko

Projekt z cvičení **Databázy a internet**. Obsahuje školské webové stránky,
formuláre a lokálny stack MariaDB s backendom pre katalóg kníh.

## Webové stránky

Príklady HTML a JavaScriptu sú na stránkach `index.html`, `form.html`,
`table.html`, `list.html` a `javascript.html`. Spoločnú navigáciu vkladá
`app.js` a vzhľad stránok určuje `style.css`.

`formular_zadanie.html` obsahuje polia pre meno, e-mail, telefón, dátum
narodenia, kurz, úroveň, poznámku a súhlas s podmienkami. Vyplnené údaje sa
zobrazujú v živom náhľade; odoslanie je iba simulované a nič sa neposiela na
server. Jeho štýly a skripty sú v `formular_zadanie.css` a
`formular_zadanie.js`. Obrázky patria do priečinka `IMG`. Pri odovzdávaní
zabaľte webové stránky do ZIP súboru pomenovaného
`priezvisko_zadanie1.zip`.

## Databáza a backend

MariaDB a phpMyAdmin sa spúšťajú cez Docker Compose. Databáza `kniznica`
obsahuje tabuľky `autori` a `knihy`; schéma sa vytvorí pri prvom spustení
a údaje sa uchovávajú vo volume `mariadb_data`.

Pred prvým spustením vytvorte `.env` a zmeňte ukážkové heslá:

```sh
cp .env.example .env
docker compose up -d
```

Backend spustíte v druhom termináli:

```sh
cd backend
npm start
```

V prehliadači:

- Webový katalóg: [http://localhost:3000](http://localhost:3000)
- phpMyAdmin: [http://localhost:8080](http://localhost:8080)
- API: `GET /api/kniznica`, `GET /api/autori`, `POST /api/kniznica`,
  `PUT /api/kniznica/:id`, `DELETE /api/kniznica/:id`

Do phpMyAdmin sa prihláste údajmi z `.env` (predvolený používateľ je `cviko`).
Backend má pripojenie k databáze nastavené v `backend/server.js`; pri zmene
prihlasovacích údajov ho upravte tiež. V Codespaces otvorte porty `3000` a
`8080` cez kartu **Ports**; port `8080` ponechajte ako **Private**.

## Export a obnova databázy

Export vytvorí SQL zálohu mimo projektu, aby sa omylom nepridala do Git-u:

```sh
docker compose exec -T mariadb sh -c 'exec mariadb-dump -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' > "$HOME/kniznica.sql"
```

Obnova zo zálohy:

```sh
docker compose exec -T mariadb sh -c 'exec mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' < "$HOME/kniznica.sql"
```

Obnova môže nahradiť existujúce tabuľky a ich údaje. Zálohu uchovávajte
bezpečne, najmä ak obsahuje osobné údaje. Zastavenie služieb:
`docker compose down` (volume s databázou zostane zachovaný).

Toto nastavenie je určené na lokálny vývoj. Pred sprístupnením mimo
počítača zmeňte ukážkové heslá.
