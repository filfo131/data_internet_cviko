fetch('topbar.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
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
    
    const name = document.getElementById("name");
    const output = document.getElementById("output");
    
    if (name && output) {
        name.addEventListener("input", () => {
            output.textContent = `Vitaj, ${name.value}!`;
        });
    }