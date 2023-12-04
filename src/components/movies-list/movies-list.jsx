import React from "react";
import { useSelector } from "react-redux";
import { BookCard } from "../book-card/book-card";
import { BooksFilter } from "../books-filter/books-filter"; import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export const BooksList = () => {
    const books = useSelector((state) => state.books.list); const filter = useSelector((state) =>
        state.books.filter).trim().toLowerCase();
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(filter)
    );
    return (<>
        <Row> <BooksFilter />
        </Row> <Row>
            {books.length === 0 ? (<Col>The list is empty!</Col>
            ) : (
                filteredBooks.map((book) => (
                    <Col className="mb-4" key={book.id} md={3}> <BookCard book={book} />
                    </Col>
                )))}
        </Row> </>
    );
};