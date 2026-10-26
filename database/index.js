const express = require ( ’ express ’) ;
const Database = require ( ’ better - sqlite3 ’) ;
const app = express () ;
// Otvorenie d a t a b a z o v e h o suboru SQLite
const db = new Database ( ’ kniznica . db ’) ;
app . get ( ’/ ’ , ( req , res ) = > {
// Vyber vsetkych zaznamov z tabulky knihy
const knihy = db . prepare ( ’ SELECT * FROM knihy ’) . all () ;
let html = ’ <h1 > Katalog knih ( SQLite ) </ h1 > ’;
html += ’ < table border ="1" c e l l p a d d i n g ="8" style =" border - collapse :
collapse ;" > ’;
html += ’ <tr > < th > ID </ th > < th > Nazov knihy </ th > < th > Autor ID </ th > < th > Rok </
th > < th > Cena </ th > </ tr > ’;
knihy . forEach ( k = > {
html += ‘ <tr >
<td > $ { k . id } </ td >
<td > < strong > $ { k . nazov } </ strong > </ td >
<td > $ { k . autor_id } </ td >
<td > $ { k . r o k _ v y d a n i a || ’ - ’} </ td >
<td > $ { k . cena ? k . cena + ’ EUR ’ : ’ - ’} </ td >
</ tr > ‘;
}) ;
html += ’ </ table > ’;
res . send ( html ) ;
}) ;
// Spustenie weboveho servera
app . listen (3000 , () = > {
console . log ( ’ Server bezi na http :// localhost :3000 ’) ;
}) ;