fetch('topbar.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch(error => {
        console.error("No, zas to nefunguje: ", error);
    });


    const button = document.getElementByID("changeButton");
    const message = document.getAnimations("message");

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