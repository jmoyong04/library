/* 
Function{
function is called when submit button is clicked.
parameters it takes are the inputs of the input function


}
*/
const myLibrary = [];
let sendData = document.querySelector("#send-data")
let newBookForm = document.querySelector(".new-book-form");
let toggleForm = document.querySelector(".toggle-form");
let bookShelf = document.querySelector(".bookshelf")
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
Book.prototype.changeReadStatus = function(){
  if(this.read === "Already read."){
    this.read = "Not read yet."
  }
  else{
    this.read = "Already read."
  }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    bookShelf.replaceChildren();
    
    for(const book of myLibrary){
      let bookData = document.createElement("div");
      let removeButton = document.createElement('button')
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        bookData.remove();
        const i = myLibrary.findIndex(b => b.id === book.id);
        myLibrary.splice(i, 1);
        })
      let readButton = document.createElement('button');
      readButton.textContent = "Change Read Status";
      readButton.addEventListener('click', ()=>{
        newBook.changeReadStatus();
        bookData.querySelector('.read').textContent = book.read;
      })
      bookData.innerHTML = `Title: ${book.title} Author: ${book.author} Pages: ${book.pages} ` +
      `Read?: <span class="read">${book.read}</span>`;
      bookData.appendChild(readButton);
      bookData.appendChild(removeButton)
      bookData.classList.add("book");
      bookShelf.appendChild(bookData);
      
    }
    
  // take params, create a book then store it in the array
};

function createBook(){
  let newTitle = document.getElementById("book-title");
  let newAuthor = document.getElementById("author")
  let newPages = document.getElementById("pages");
  let newRead = document.querySelector('input[name ="read"]:checked')
  addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.value);
  newTitle.value = ""
  newAuthor.value = ""
  newPages.value = ""
  if (newRead){
    newRead.checked = false
  }
  newBookForm.style.display = "none"
}
toggleForm.addEventListener("click", () => {
    if (newBookForm.style.display == "none"){
        newBookForm.style.display = "flex"
    }
    else{
        newBookForm.style.display = "none"
    }
})
sendData.addEventListener('click', createBook)




