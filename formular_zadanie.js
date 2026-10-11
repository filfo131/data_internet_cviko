// odoslanie formulára - block reload stránky a zobrazenie alertu
document.getElementById("formular").addEventListener("submit", function(event){
if (!document.getElementById("formular").checkValidity()) {
    return;
}
  event.preventDefault(),
  document.getElementById("formular_div").style.display = "none",
  alert("Formulár bol úspešne odoslaný.")
});

// výpis hodnot do outputu
const inputy = ["name", "email", "tel", "uroven", "kurz", "note"];

//defatult hodnoty pre kurz a úroveň
if (document.getElementById(inputy[3]) && !document.getElementById(inputy[3]).value) {
    document.getElementById(inputy[3]).value = "HTML";
}
if (document.getElementById(inputy[4]) && !document.getElementById(inputy[4]).value) {
    document.getElementById(inputy[4]).value = "Beginner";
}

// event hodnoty do outputu
for(var i = 0; i < inputy.length; i++) {
    var output = document.getElementById(inputy[i] + "-output");
    
    if (document.getElementById(inputy[i]) && output && inputy[i] != "uroven" && input.type !== "checkbox" && input.type !== "date" && input.type !== "radio") {
        var input = document.getElementById(inputy[i]);
        input.addEventListener("input", () => { output.textContent = ` ${input.value}`;});
    }
    else if (output && inputy[i] == "uroven") {
        var input = document.querySelectorAll(`input[name="uroven"]`);
        input.addEventListener("input", () => { output.textContent = ` ${input.options[input.selectedIndex].text}`;});
    }

}

// event hodnoty do outputu pre datum s koreciou formou zobrazenia
const date = document.getElementById("date");
const dateOutput = document.getElementById("date-output");

    if (date && dateOutput) {
        date.addEventListener("input", () => {
            if (date.value) {
                const [rok, mesiac, den] = date.value.split("-");
                dateOutput.textContent = `${den}.${mesiac}.${rok}`;
            } else {
                dateOutput.textContent = "";
            }
        });
    }

// event hodnoty do outputu pre checkbox
const suhlas = document.getElementById("suhlas");
const suhlasOutput = document.getElementById("suhlas-output");

    if (suhlas && suhlasOutput) {
        suhlas.addEventListener("input", () => { suhlasOutput.textContent = ` ${suhlas.checked ? "Súhlasím" : "Nesúhlasím"}`;
        });
    }