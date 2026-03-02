const cepInput = document.getElementById("cep")

let formExpanded = false

const addressItems = document.querySelectorAll(".hiddenItem")

cepInput.addEventListener("input", ()=>{
    const val = cepInput.value

    if(val.length == 8 && !isNaN(val)){
        expandForm(val)
    } else if(val.length <= 7 && formExpanded){
        colapseForm()
    }
})

function expandForm(cep){
    fetch(wrapUrl(cep))
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
}

function colapseForm(){
    addressItems.forEach(el=>{
        el.style.display = "none"
    })
}

function wrapUrl(cep){
    return encodeURI(`viacep.com.br/ws/${cep}/json/`)
}

//CONTINUA AQUI!!!!!