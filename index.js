import {menuArray} from "/data.js"

const menu = document.getElementById("menu-element")
const itemsInOrder = document.getElementById("items-in-order")
const totalPrice = document.getElementById("total-price")
const popUp = document.getElementById("pop-up")

menu.innerHTML = renderMenu()   // CALLING renderMenu
let itemsInArray = []
let hasFinishedOrder = false

// RENDERING MENU ITEMS FROM DATA

function renderMenu(){
    return menuArray.map(function(menuItem){
                 return `<section id="${menuItem.id}">
                            <div class="icon">${menuItem.emoji}</div>
                            <div>
                                <h3>${menuItem.name}</h3>
                                <p>${menuItem.ingredients.join(", ")}</p>
                                <h4>$${menuItem.price}</h4>
                            </div>
                            <button class="plus-btn align-right" id="plus-btn">+</button>
                        </section>`
    }).join('')
}

// LISTENING FOR CLICKS

document.addEventListener('click', function(e){                                 // IF CLICKING ON + BTNS, ADDS ITEMS INTO itemsArray 
    if(e.target.id === "plus-btn" && !hasFinishedOrder){                        // AND RENDERS IT IN YOUR CART(renderOrder)
        const index = e.target.parentElement.id
        itemsInArray.push(menuArray[index])
        renderOrder()
        
    } if(e.target.id === "remove-btn" && !hasFinishedOrder){                    // IF CLICKING ON REMOVE BTNS, REMOVES ITEMS FROM itemsArray 
        const index = e.target.parentElement.id                                 // AND RENDERS YOUR CART(renderOrder)
        delete itemsInArray[index]
        renderOrder()
        
    } if(e.target.id === "complete-order-btn" && returnTotalPrice() > 0){       // IF CLICKING COMPLETE ORDER AND PRICE > 0, UNHIDES POP-UP
        popUp.classList.remove("hide")
        processPay()
        hasFinishedOrder = true
    }
})

function returnTotalPrice(){            
    const totalPrice = itemsInArray.reduce(function(total,current){             //FUNCTION THAT RETURNS TOTAL PRICE OF YOUR ORDER FROM itemsArray 
        return total + current.price
    },0)
    return totalPrice 
}

function renderOrder(){                                                         // RENDERS WHAT YOU PUT IN YOUR CART BY MAKING A NEW ARRAY THAT 
    document.getElementById("your-order").classList.remove("hide")              // CONVERTED itemsArray INTO HTML
    const arrayToRender = []
        itemsInArray.forEach(function (item, index){
            arrayToRender.push(
                        `<div class="checkout" id="${index}">
                            <h3>${item.name}</h3>
                            <button class="remove" id="remove-btn">Remove</button>
                            <div>
                                <h4>$${item.price}</h4>
                            </div>
                        </div>`)
        })
       itemsInOrder.innerHTML = arrayToRender.join('') 
       totalPrice.innerHTML = `$${returnTotalPrice()}`
}

function processPay(){                                                          // GETTING USERS NAME FROM THE FORM  
    const loginForm = document.getElementById("form")
    loginForm.addEventListener("submit", function(e){
        e.preventDefault()
        const nameSubmitted = new FormData(loginForm)
        popUp.classList.add("hide")                                             //HIDING POP-UP
        document.getElementById('your-order').innerHTML = 
        `<div class="finale">Thanks, ${nameSubmitted.get("name")}! Your order is on it's way</div>`     //RENDERING FINAL MESSAGE
    })

}