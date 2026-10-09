

const inputy = ["name", "email", "tel", "kurz", "number", "uroven", "note"];

for(var i = 0; i < inputy.length; i++) {
const input = document.getElementById(inputy[i]);
const output = document.getElementById(inputy[i] + "-output");

    if (input && output) {
        input.addEventListener("input", () => { output.textContent = ` ${input.value}`;
        });
    }
}

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

const suhlas = document.getElementById("suhlas");
const suhlasOutput = document.getElementById("suhlas-output");

    if (suhlas && suhlasOutput) {
        suhlas.addEventListener("input", () => { suhlasOutput.textContent = ` ${suhlas.checked ? "Súhlasím" : "Nesúhlasím"}`;
        });
    }