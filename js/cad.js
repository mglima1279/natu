import { app, getFirestore, setDoc, doc } from "./firebase/config.js"

const db = getFirestore()

const cepInput = document.getElementById("cep");
const addressItems = document.querySelectorAll(".hiddenItem");
let formExpanded = false;

cepInput.addEventListener("input", () => {
    if (val.length == 8 && !isNaN(val)) {
        expandForm(val);
    } else if (val.length < 8 && formExpanded) {
        collapseForm();
    }
});

function expandForm(cep) {
    fetch(wrapUrl(cep))
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                collapseForm();
                return;
            }

            addressItems[0].value = data.logradouro;

            addressItems.forEach(el => {
                el.classList.remove("hiddenItem")
            });
            formExpanded = true;
        })
        .catch(err => {
            console.error("Erro na busca:", err);
            collapseForm();
        });
}

function collapseForm() {
    addressItems.forEach(el => {
        el.classList.add("hiddenItem");
        el.value = "";
    });
    formExpanded = false;
}

function wrapUrl(cep) {
    return `https://viacep.com.br/ws/${cep}/json/`;
}