//Book Class: Represent a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: User Interface
class UI {
    static StoredBooks = [
        {
            title: 'Book One',
            author: 'John Doe',
            isbn: '343434'
        },
        {
            title: 'Book Two',
            author: 'Jane Doe',
            isbn: '1212123'
        },
    ];
    static displayBooks(){
        const books = UI.StoredBooks;

        books.forEach((book)=>{
            UI.addBookToList(book);
        })
    }

    
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" id="deleteButton" class="btn btn-danger btn-sm">x</a></td>
        `;

        list.appendChild(row);
    }

    //Clear Fields
    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    //Delete Book
    static deleteBook(event){
        if(event.target.id === "deleteButton"){
            const tr = event.target.closest('tr')
            const tds = tr.querySelectorAll('td')
            tr.style.display = "none"
            const isbn = tds[2].innerText
            const updatedBooks = UI.StoredBooks.filter(book => book.isbn !== isbn);
        }
    }

}

//Store Class: Handles Storage


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event: Add a book
document.querySelector('#book-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Instatiate book
    const book = new Book(title, author, isbn);

    console.log(book);

    //Add book to UI
    UI.addBookToList(book);
    UI.StoredBooks.push(book);

    //Clear Fields
    UI.clearFields();

})
//Event:Remove a book
document.querySelector('tbody').addEventListener('click', (event)=>{
    UI.deleteBook(event)
})