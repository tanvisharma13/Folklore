const Book = require("./book.model");

// Create a new book
const postABook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body });
    await newBook.save();
    res.status(201).json({
      message: "Book posted successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("❌ Error creating book:", error.message);
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};

//  Get all books (with optional search)
const getAllBooks = async (req, res) => {
  const search = req.query.search || "";

  try {
    let books;

    if (search) {
      books = await Book.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });

      // Optional: Prioritize exact matches to start of title
      books.sort((a, b) => {
        const aStarts = a.title?.toLowerCase().startsWith(search.toLowerCase());
        const bStarts = b.title?.toLowerCase().startsWith(search.toLowerCase());

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
    } else {
      books = await Book.find().sort({ createdAt: -1 });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error.message);
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// Get a single book by ID
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error.message);
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};

//  Update a book by ID
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("❌ Error updating book:", error.message);
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

// Delete a book by ID
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("❌ Error deleting book:", error.message);
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
};
