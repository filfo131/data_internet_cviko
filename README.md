# data_internet_cviko
Cvičenia z databáz a internetu

Databázy a internet
5.10.2026

Zadanie 1

Zadanie je rozdelené do dvoch úloh.

Prvou úlohou je dokončenie webstránky z cvičenia, ktorá musí obsahovať:

1) index.html, form.html, table.html, list.html, javascript.html
   - na jednotlivých podstránkach musia byť príklady z cvičenia 1
   - všetky podstránky musia mať štýl definovaný v style.css
   - každá podstránka musí obsahovať <html>, <head> a <body>

2) style.css ako globálny stylesheet, v ktorom budú štýly pre:
   - jednotlivé podstránky
   - body pre všetky podstránky (definujte ho len raz a používajte na každej podstránke)
   - topbar.html

3) topbar.html – navigačný topbar z cvičenia, v ktorom je rozcestník na všetky podstránky

4) app.js
   - slúži ako globálny JavaScript
   - na každej podstránke sa pomocou neho vkladá topbar.html
   - v ňom sa nachádzajú aj skripty z podstránky javascript.html

5) Všetky podstránky musia mať upravený a jednotný vzhľad definovaný v style.css

6) Všetky obrázky ukladajte do priečinka IMG

Druhou úlohou je vytvorenie novej podstránky formular_zadanie.html:

1) Formulár musí obsahovať nasledujúce polia:
   - Meno a priezvisko – textové pole
   - E-mail – pole typu email
   - Telefónne číslo – pole typu tel
   - Dátum narodenia – pole typu date
   - Kurz – výber z možností HTML, CSS a JavaScript pomocou select
   - Úroveň – výber Beginner, Intermediate alebo Advanced pomocou radio
   - Poznámka – viacriadkové textové pole textarea
   - Súhlas s podmienkami – checkbox
   - Tlačidlo na odoslanie formulára

2) Formulár musí byť naštýlovaný v style.css:
   - formulár musí byť vizuálne oddelený od zvyšku stránky
   - jednotlivé input fieldy musia mať jednotný vzhľad
   - definujte vzhľad pre input, select, textarea a button
   - definujte stav :focus pre input fieldy
   - definujte stav :hover pre tlačidlo

3) Vedľa formulára vytvorte živý náhľad zadaných údajov:
   - formulár a náhľad musia byť na desktopovej obrazovke umiestnené vedľa seba
   - náhľad musí zobrazovať minimálne meno a priezvisko, e-mail, kurz, úroveň a poznámku
   - zobrazené údaje sa musia meniť priebežne počas vypĺňania formulára
   - na získanie elementov použite document.getElementById()
   - na sledovanie zmien použite eventy input a/alebo change
   - stránka sa pri aktualizácii náhľadu nesmie obnovovať

4) Odoslanie formulára bude iba simulované pomocou JavaScriptu:
   - formulár musí reagovať na event submit
   - pomocou event.preventDefault() zabráňte skutočnému odoslaniu a obnoveniu stránky
   - po odoslaní sa celý formulár skryje
   - po úspešnom odoslaní formulára zobrazte pomocou JavaScriptu funkcie alert() správu: „Formulár bol úspešne odoslaný.“
   - údaje sa neposielajú na server

5) JavaScript pre túto podstránku umiestnite do formular_zadanie.js.

6) Podstránka musí mať topbar.html ako v predchádzajúcich stránkach a vlastný CSS stylesheet formular_zadanie.css.

Celú webstránku zabaliť do .zip súboru a pomenujte ho ako priezvisko_zadanie1.zip.