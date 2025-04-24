// Book Constructor
function Book(title, author, pages, published, status) {
    this.id = crypto.randomUUID(); // Generate a unique id for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published; // Publication year
    this.status = status; // 'Read' or 'Not Read'
};

// Toggle read status function
Book.prototype.toggleStatus = function() {
    this.status = this.status === "Read" ? "Not Read" : "Read";
};

// Library Array
let myLibrary = [];

// Function to display Library
function displayLibrary(filteredBooks = myLibrary) {
    const libraryContainer = document.querySelector("#library");
    libraryContainer.textContent = ""; // Clear previous content safely

    if(filteredBooks.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No books found. Try a different search term!";
        libraryContainer.appendChild(message);
        return;
    }

    filteredBooks.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-id", book.id);
        bookCard.classList.add(book.status === "Read" ? "read-book" : "unread-book");

        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = `Pages: ${book.pages}`;

        const publishedElement = document.createElement("p");
        publishedElement.textContent = `Published: ${book.published}`;

        const statusElement = document.createElement("p");
        statusElement.textContent = `Status: ${book.status}`;

        const idElement = document.createElement("p");
        idElement.textContent = `ID: ${book.id}`;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read Status";
        toggleBtn.classList.add("toggle-btn");
        toggleBtn.addEventListener("click", () => toggleStatus(book.id));

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => confirmDelete(book.id));

        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(publishedElement);
        bookCard.appendChild(statusElement);
        bookCard.appendChild(idElement);
        bookCard.appendChild(toggleBtn);
        bookCard.appendChild(removeBtn);

        libraryContainer.appendChild(bookCard);
    })
};

// Function to Toggle Book Status
function toggleStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if(book) {
        book.toggleStatus();
        displayLibrary(); // Refresh display
    }
};

// Function to Remove a Book
function confirmDelete(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if(confirm(`Are you sure you want to delete "${book.title}" by ${book.author}?`)) {
        lastDeletedBook = book; // Store for undo
        myLibrary = myLibrary.filter(book => book.id !== bookId);
        displayLibrary();
        showUndoBtn();
    };
};

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        const bookId = event.target.parentElement.getAttribute("data-id");
        confirmDelete(bookId);
    }
});

// Undo Last Delete Function
function showUndoBtn() {
    const undoBtn = document.querySelector("#undoBtn");
    undoBtn.style.display = "block";
};

document.querySelector("#undoBtn").addEventListener("click", () => {
    if(lastDeletedBook) {
        myLibrary.push(lastDeletedBook);
        lastDeletedBook = null;
        displayLibrary();
        document.querySelector("#undoBtn").style.display = "none";
    }
});

// Sorting Function
function sortLibrary(criteria) {
    myLibrary.sort((a, b) => {
        if(typeof a[criteria] === "string") {
            return a[criteria].localeCompare(b[criteria]);
        } else {
            return a[criteria] - b[criteria];
        }
    });
    displayLibrary();
};

// Event Listener for Sorting
document.querySelector("#sortSelect").addEventListener("change", function() {
    sortLibrary(this.value);
});

// Function to Sort by Published Year
function sortLibraryByPublished(order) {
    myLibrary.sort((a, b) => order === 'asc' ? a.published - b.published : b.published - a.published);
    displayLibrary();
};

// Event Listener for Sorting Year
document.querySelector("#sortYearSelect").addEventListener("change", function() {
    sortLibraryByPublished(this.value);
});

// Function to Filter Books by Status
function filterLibrary(status) {
    const filteredBooks = status === "All" ? myLibrary : myLibrary.filter(book => book.status === status);
    displayLibrary(filteredBooks);
};

// Event Listener for Filtering
document.querySelector("#filterSelect").addEventListener("change", function() {
    filterLibrary(this.value);
});

document.querySelector("#showAllBooksBtn").addEventListener("click", function() {
    document.querySelector("#filterSelect").value = "All"; // Reset dropdown to "All"
    displayLibrary(myLibrary); // Show all books
});

// Function to Search Books
function searchLibrary(query) {
    if (!query.trim()) { // Checks if query is empty or only spaces
        displayLibrary(myLibrary);
        return;
    }
    const filteredBooks = myLibrary.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    displayLibrary(filteredBooks);
};

// Event Listener for Search Input
document.querySelector("#searchInput").addEventListener("input", function() {
    searchLibrary(this.value);
});

// Show All Books
document.querySelector("#showAllBooksBtn").addEventListener("click", function() {
    document.querySelector("#searchInput").value = ""; // Clear search box
    displayLibrary(myLibrary); // Show all books again
});

// Function to Add New Book
document.querySelector("#newBookBtn").addEventListener("click", function() { 
    document.querySelector("#bookFormContainer").style.display = "block";
});

document.querySelector("#cancelBtn").addEventListener("click", function () {
    document.querySelector("#bookFormContainer").style.display = "none";
});

document.querySelector("#bookForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const published = document.querySelector("#published").value;
    const status = document.querySelector("#status").value;

    const newBook = new Book(title, author, pages, published, status);
    myLibrary.push(newBook);
    displayLibrary(); // Refresh display after adding book

    document.querySelector("#bookFormContainer").style.display = "none";
    this.reset(); // Clear form
});

// Example books
myLibrary.push(new Book("The Lost Bookshop", "Evie Woods ", 448, 2023, "Not read"));
myLibrary.push(new Book("All the Broken Places", "John Boyne", 400, 2023, "Read"));
myLibrary.push(new Book("The Paper Palace", "Miranda Cowley Heller", 400, 2022, "Read"));
myLibrary.push(new Book("In Five Years", "Rebecca Serle", 288, 2021, "Not Read"));
myLibrary.push(new Book("Homecoming Queen", "Chad Boudreaux", 344, 2024, "Read"));
myLibrary.push(new Book("All the Light We Cannot See", "Anthony Doerr", 560, 2017, "Not Read"));
myLibrary.push(new Book("Great Circle", "Maggie Shipstead", 672, 2022, "Not Read"));
myLibrary.push(new Book("The Truth About Horses", "Christy Cashman", 392, 2023, "Not Read"));
myLibrary.push(new Book("Emma", "Jane Austen", 448, 1815, "Not Read"));
myLibrary.push(new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 345, 1997, "Read"));
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 384, 1937, "Read"));
myLibrary.push(new Book("Pride and Prejudice", "Jane Austen", 320, 1813, "Read"));
myLibrary.push(new Book("Mother Of All Christmases", "Milly Johnson", 528, 2018, "Not Read"));
myLibrary.push(new Book("The Little Prince", "Antoine de Saint-Exupéry", 96, 1943, "Not Read"));
myLibrary.push(new Book("The Godfather", "Mario Puzo", 448, 1969, "Read"));
myLibrary.push(new Book("Persuasion", "Jane Austen", 250, 1817, "Not Read"));
myLibrary.push(new Book("Lonesome Dove", "Larry McMurtry", 960, 1985, "Not Read"));
myLibrary.push(new Book("The Hunger Games", "Suzanne Collins", 374, 2008, "Read"));
myLibrary.push(new Book("Harry Potter and the Half-Blood Prince", "J.K. Rowling", 652, 2005, "Read"));
myLibrary.push(new Book("Rhythm of War", "Brandon Sanderson", 1232, 2020, "Not Read"));
myLibrary.push(new Book("Harry Potter and the Deathly Hallows", "J.K. Rowling", 316, 2007, "Read"));
myLibrary.push(new Book("Matilda", "Roald Dahl", 240,1988, "Read"));

// Initial display
displayLibrary();
