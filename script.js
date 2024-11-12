let cards=document.querySelectorAll(".card")
let popUp = document.querySelector(".pop-up")
let clickTimes=0
let clickedCards=[]
let flippedCards=[]
let main = document.querySelector(".main")

function startGame() {
    clickTimes=0
    clickedCards=[]
    flippedCards=[]
    shuffleCards()
    flipCard()
}
function restartGame() {
    popUp.classList.remove("shown")
    main.style.opacity = 1
    cards.forEach(card => {
        card.classList.remove("flip")
    })
    startGame()
}

function shuffleCards() {
    let cardsArray = Array.from(cards);
    let currentIndex = cardsArray.length;
    
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cardsArray[currentIndex], cardsArray[randomIndex]] = [cardsArray[randomIndex], cardsArray[currentIndex]];
    }
    cardsArray.forEach((card, index) => {
        card.style.order = index; 
    });
}

function popupChange() {
    main.style.opacity = 0.5    
    popUp.classList.add("shown")
}
function flipCard() {
    cards.forEach(card=>{
        card.addEventListener("click", ()=>{
            if (flippedCards.includes(card)||(clickedCards.includes(card))) {
                return   
            }
            card.classList.add("flip")
            clickTimes++
            clickedCards.push(card) 
                
            if (clickTimes===2) {
                if (clickedCards[0].getAttribute("position") === clickedCards[1].getAttribute("position")) {
                    flippedCards.push(...clickedCards)  
                    clickedCards=[]
                }
                else{
                    setTimeout(() => {
                        clickedCards.forEach(card => card.classList.remove("flip"));
                        clickedCards = [];
                        
                    }, 1000)
                }
                clickTimes=0
                if (flippedCards.length ===16){
                    popupChange()
                }
            }
            
        })
    })
}

startGame()
