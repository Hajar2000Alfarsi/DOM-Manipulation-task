const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const addBtn = document.getElementById("addBtn");
const bookContainer = document.getElementById("bookContainer");
const counter = document.getElementById("counter");

let count = 0;

//Add event listener to button
addBtn.addEventListener("click", addBook);
//Function to add book
function addBook(){
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if(title === "" || author === ""){
        alert("Please enter both title and author!");
        return;
    }

    //Create Book Card 
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookInfo = document.createElement("span");
    bookInfo.textContent = `Title: ${title} | Author: ${author}`;

    //Delete functionality
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
    deleteBook(bookCard);})

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(deleteBtn);

    bookContainer.appendChild(bookCard);

    //Clear inputs
    titleInput.value = "";
    authorInput.value = "";

    // Update counter
    count++;
    updateCounter();
}

//Delete function
function deleteBook(bookElement){
    bookElement.remove();
    count--;
    updateCounter();
}

//Update Counter
function updateCounter(){
    counter.textContent = `Total Books: ${count}`;
}