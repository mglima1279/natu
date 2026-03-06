import { cartItem } from "./module.js"

let cartList = []
let userData

const cartItemContainer = document.querySelector(".items")
const spanValorTotal = document.getElementById("vTotal")
const spanValorFrete = document.getElementById("vFrete")
const spanValorLiq = document.getElementById("vLiq")

function updateTotals() {
    const totalItens = cartList.reduce((acc, el) => acc + (el.price * el.qtd), 0)
    spanValorTotal.textContent = totalItens.toFixed(2).replace(".", ",")
    
    const valorFrete = parseFloat(spanValorFrete.textContent.replace(",", "."))
    const valorLiquido = totalItens + valorFrete
    
    spanValorLiq.textContent = valorLiquido.toFixed(2).replace(".", ",")
}

function saveLocalStorage() {
    localStorage.setItem("cartList", JSON.stringify(cartList))
}

document.querySelector(".btnContinuar").addEventListener("click", ()=>{
    saveLocalStorage()
    window.location.href = "../"
})

function loadLocalStorage() {
    const saved = localStorage.getItem("cartList")
    if (saved) {
        cartList = JSON.parse(saved)
    }

    cartList.forEach(el => {
        const newCartItem = new cartItem(
            el.imgNam, 
            el.nam, 
            el.price, 
            el.und, 
            el.qtd, 
            el.id,
            (newQtd) => {
                el.qtd = newQtd
                saveLocalStorage()
                updateTotals()
            },
            () => {
                cartList = cartList.filter(item => item.id !== el.id)
                newCartItem.htmlEl.remove()
                saveLocalStorage()
                updateTotals()
            }
        )
        
        cartItemContainer.appendChild(newCartItem.htmlEl)
    })

    updateTotals()

    const tempUserData = localStorage.getItem("user")
    if (tempUserData) {
        userData = JSON.parse(tempUserData)

        const cepInput = document.getElementById("cep")
        cepInput.value = userData.address.cep
    }
}

document.querySelector(".btnContinuar").addEventListener("click", (e)=>{
    e.preventDefault()
})

document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault()

    if(!userData) {
        alert("Cadastre-se para prosseguir")
        return
    }

    const conf = confirm("Deseja realmente confirmar a compra??")

    if(conf){
        this.reset()
    }
})

loadLocalStorage()