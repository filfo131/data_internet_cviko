fetch('topbar.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("topbar-afterbegin", data);
    })
    .catch(error => {
        console.error("No, zas to nefunguje: ", error);
    });
