const Book = require("./book.model");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({
            message: "Book created successfully",
            book: newBook
        })
    } catch (error) {
        console.error("Error creating book: ", error);
        res.status(500).send({
            message: "Failed to create book",
        })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching book: ", error);
        res.status(500).send({
            message: "Failed to fetch book",
        })
    }
}

const getASingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book not found!" });
        }
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book: ", error);
        res.status(500).send({
            message: "Failed to fetch book",
        })
    }
}

const getSpecificBooks = async (req, res) => {
    try {
        //console.log("Query received: ", req.query);
        const { q } = req.query;
        if (!q || q.trim() === "") {
            return res.status(400).send({ message: "Query parameter is required" });
        }

        const regex = new RegExp(q.trim(), 'i');

        const books = await Book.find({
            $or: [
                { title: regex },
                { description: regex },
                { category: regex }
            ]
        })
        if (books.length === 0) {
            return res.status(404).send({ message: "No books found." });
        }

        res.status(200).json(books);
    }
    catch (error) {
        console.error("Error fetching specific books: ", error);
        res.status(500).send({ message: "Server error while searching books." });
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).send({ message: "Book is not Found!" })
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update a book" })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book is not Found!" })
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete a book" })
    }
};

module.exports = {
    postABook, getAllBooks, getASingleBook, updateBook, deleteBook, getSpecificBooks
}