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
    static displayBooks(){
        const StoredBooks = [
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

        const books = StoredBooks;

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
            <td><a href="#" class="btn btn-danger btn-sm">x</a></td>
        `;

        list.appendChild(row);
    }

    //Clear Fields
    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
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

    //Clear Fields
    UI.clearFields();

})
//Event:Remove a book

