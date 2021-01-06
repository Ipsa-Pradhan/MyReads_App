import { Component } from 'react';
import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

    render() {
        const{books,shelf,shelfType,onupdateShelf}=this.props;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfType}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.book.map((book,key) =>
                        <Book
                        key={key}
                        book={book}
                        books={books}
                        shelf={book.shelf ? book.shelf : 'none'}
                        onupdateShelf={onupdateShelf} />
                        )}
                    </ol>
                    </div></div>
        )
    }
}
export default BookShelf;