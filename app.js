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

    // DARK MODe

    const themeButton = document.getElementById("themeButton");

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                themeButton.textContent = "Light mode";
            } else {
                themeButton.textContent = "Dark mode";
            }
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


