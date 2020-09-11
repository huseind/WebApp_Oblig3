import './css.css';
window.onload = start;

//Array containing todoCard objects
const toDoCards = [{title:"Title", description: "Description", author:"Author"},
{title:"Title", description: "Description", author:"Author"},
{title:"Title", description: "Description", author:"Author"}];

let completedList = [{title:"Title1", description: "Description1", author: "Author1", date: "22.08.2020"}
,{title:"Title2", description: "Description2", author: "Author2", date: "22.10.2019"}];



///////////////////////////////////////MOST RECENT CARD METHODS/////////////////////////////////////////////////////////////

//method to create a card (takes a card element and its id)
function createCardElem (card, id){    
    const cardsWrapper = document.getElementById("cards");
    let thisCard = 
        "<article class='latestToDo' id='card" + id +  "'>" +
        "<h4>" + card.title + "</h4>" +
        "<p>" + card.description + "</p>" +
        "<button class='deleteButton'  id='d" + id + "'" + " onclick='delClick(this)'" + ">" + "Delete" + "</button>" +
        "<button class='completeButton' id='c" + id + "'" + " onclick='complClick(this)" + "'" + ">" + "Complete" + "</button>" +
        "</article>"
    
    cardsWrapper.innerHTML += thisCard;
}

//update cards, creates cards from the toDoCards Array
function updateCards(){
    document.getElementById("cards").innerHTML = ""; //reseting the inner html and creating cards again
    for(let i = 0; i<toDoCards.length; i++){
        createCardElem(toDoCards[i],i)
    }
    
}

//Delete card function takes a button as a param
function delClick (btn) {
    let elem = btn.id[btn.id.length-1]; //getting last char in btnID which is a number that corresponds with the index
    toDoCards.splice(elem,1);
    updateCards();
}

//Function that moves cardts to completed
function complClick(btn){
    let elem = btn.id[btn.id.length-1]; //getting last char in btnID which is a number that corresponds with the index
    let card = toDoCards[elem];
    let todaysDate = new Date().toLocaleDateString();
    let completed = {title: card.title, description:card.description, author: card.author, date:todaysDate };
    completedList.unshift(completed);

    /*Deleting card from todo, and updating most resent list*/ 
    toDoCards.splice(elem,1);
    updateCards();

    updateCompleted();
}


/////////////////////////////////////COMPETEDLIST METHODS//////////////////////////////////////

function createCompletedElem(card){
    
    let completedWrapper = document.getElementById("completedWrapper");
    

    let completedElem = "<li>" +
                        "<h4>"+card.title+"</h4>" +
                        "<h4>" +card.author + "</h4>" +
                        "<h4>" + card.description + "</h4>" +
                        "<h4>" + card.date + "</h4>" +
                        "</li>";
    completedWrapper.innerHTML += completedElem;
}

function updateCompleted(){
    completedWrapper.innerHTML="";
    for(let i = 0; i < completedList.length; i++){
        createCompletedElem(completedList[i]);
    }
}





function start(){
   

    //FORM VARIBLES
    const addTodoBtn = document.getElementById("toDoBtn"); //addTodo button
    const formWrapper = document.getElementById("formWrapper"); //formWrapper
    const exitFormBtn = document.getElementById("exitFormBtn");
    const form = document.getElementById("form");

    const inptTitle = document.getElementById("title");
    const inptDescription = document.getElementById("description");
    const descriptionLabel = document.getElementById("descriptionLabel");
    const inptAuthor = document.getElementById("author");



///////////////////////////////////////FORM METHODS///////////////////////////////////////
    //when addtodo is clickd form is displayed
    addTodoBtn.onclick = () =>{
        formWrapper.style.display="block";
    }


    //exit form btn onclick to hide form
    exitFormBtn.onclick = () =>{
        hideForm();
    }

    
    //Exit form when clicking outside the form
    window.onclick = (event) =>{
        if(event.target == formWrapper)
        formWrapper.style.display = "none";
    }


    //adding a eventlistener on the form submit button that call create todo method
    form.addEventListener("submit",(event) =>{
        //preventing the default submit
        event.preventDefault();
        
        //creating objects to represent cards
        let toDo = {title: inptTitle.value,
            description: inptDescription.value,
            author:inptAuthor.value};

        if(toDoCards.length < 3){  //checking if less than 3 cards already exist
            toDoCards.unshift(toDo); //if so adding another one to the list
            

        }
        else{  // if more that three cards exist, the oldest i removed and the newest added
            toDoCards.splice(2,1); //deleting the first added elemet
            toDoCards.unshift(toDo);
        }
        
        
        document.getElementById("cards").innerHTML ="";
        updateCards();
        form.reset();   //reseting form
        hideForm();     //hiding form

    });

    //ADDING A CHANGELISTENER TO DESCRIPTION INPUT
    inptDescription.addEventListener("input",updateCharLeft);
    
    function updateCharLeft(event){
        descriptionLabel.innerHTML="Description (" + (30-event.target.value.length) + " char left)"
    }


    //Method to hide a form
    function hideForm(){
        formWrapper.style.display = "none";
    }

////////////////////////////////////////////COMPLETEDLIST METHOD/////////////////////////////
const filterCheck = document.getElementById("checkbox");

//sorting the list befor updating the DOM
filterCheck.addEventListener("change",(event) => {
    if(event.target.checked){
        completedList.sort((a,b)=>{
            let dateA = a.date;
            let dateB = b.date;
            if(dateA<dateB){
                return 1;
            }
            if(dateA>dateB){
                return -1;
            }
            else{
                return 0;
            }
        });
        updateCompleted();
    }
    else{
        completedList.sort(sortOnTitle);
        updateCompleted();

    }

});

//method to sort an elemts on title
function sortOnTitle(a,b){
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    if(titleA<titleB){return -1;}
    if(titleA>titleB){return 1;}
    else {return 0;}
}




    //THE PROGRAM  (RUNS WHEN THE HTML IS LOADED)
    updateCards();
    updateCompleted();
}