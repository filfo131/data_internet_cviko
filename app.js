// Importovanie navigačného panela z topbar.html podľa príkladu na cviku
fetch('topbar.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch(error => {
        console.error("No, zas to nefunguje: ", error);
    });

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch(error => {
        console.error("No, zas to nefunguje: ", error);
    });


    const button = document.getElementById("changeButton");
    const message = document.getElementById("message");

    if (button && message) {
        button.addEventListener("click", () => {
            message.textContent = "Klikol si na tlačidlo!";
        });
    }
    
    const nameInput = document.getElementById("name");
    const output = document.getElementById("output");
    
    if (nameInput && output) {
        nameInput.addEventListener("input", () => {
            output.textContent = `Vitaj, ${nameInput.value}!`;
        });
    }

    // Zmena názvu karty a hlavného nadpisu podľa názvu HTML súboru
    const nadpis = document.getElementById("nazov_stranky");
    const nazovSuboru = window.location.pathname.split("/").pop().replace(".html", "");

    if (nazovSuboru) {
        document.title = nazovSuboru;

        if (nadpis) {
            nadpis.textContent = nazovSuboru;
        }
    }