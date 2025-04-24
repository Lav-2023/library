# Library

This 'Library' project is part of 'The Odin project'.

This assignment is to create a small Library app using JavaScript, HTML, and CSS.


    1. Write a constructor for making “Book” objects. 
    Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.

    2. All of your book objects are going to be stored in an array, so you’ll need a constructor for books. 
    Then, add a separate function to the script (not inside the constructor) that can take some arguments, create a book from those arguments, and store the new book object into an array. 
    Also, all of your book objects should have a unique id, which can be generated using crypto.randomUUID(). 
    This ensures each book has a unique and stable identifier, preventing issues when books are removed or rearranged. 

    3. Write a function that loops through the array and displays each book on the page. 
    You can display them in some sort of table, or each on their own “card”. 
    It might help for now to manually add a few books to your array so you can see the display.

         * While it might look easier to manipulate the display of the books directly rather than store their data in an array first, from here forward, you should think of these responsibilities separately. 
         Therefore, consider the logic for displaying books to the user and the book structures that hold all information as distinct entities. 
         This separation will enhance the maintainability and scalability of your code.

    4. Add a “New Book” button that brings up a form allowing users to input the details for the new book 
    and add it to the library: author, title, number of pages, whether it’s been read and anything else you might want. 
    How you decide to display this form is up to you.

    5. Add a button on each book’s display to remove the book from the library.

         * You will need to associate your DOM elements with the actual book objects in some way. 
         One easy solution is giving them a data-attribute that corresponds to the unique id of the respective book object.

    6. Add a button on each book’s display to change its read status.

         * To facilitate this you will want to create Book prototype function that toggles a book instance’s read status.


## Acknowledgements

 - Image via Pixabay