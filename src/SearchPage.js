import React from 'react'
import * as BooksAPI from './BooksAPI'
//import { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchPage extends React.Component {
    state = {
        query: "",
        searchBooks: [],
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ readBooks: books })
        })
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(books => {
            book.shelf = shelf;
            this.setState(currState => ({
                searchBooks: this.state.searchBooks.filter
                    (b => b.id !== book.id).concat([book])
            }))
        })

    }
    updateQuery = (query) => {
        this.setState({ query: query }, this.searchResult)
    }
    searchResult() {
        if (this.state.query === "") {
            return this.setState({ searchBooks: [] })
        }
        BooksAPI.search(this.state.query).then(books => {
            if (books.error) {
                return this.setState({ searchBooks: [] })
            }
            else {

                return this.setState({ searchBooks: books })
            }
        })
    }
    render() {
        const { books, searchBooks, readBooks, onupdateShelf, shelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map((book, key) => {
                            const bookOnShelf = this.state.readBooks.find(
                                ({ id }) => id === book.id
                            );
                            const shelf = bookOnShelf ? bookOnShelf.shelf : 'none';
                            console.log('found ', shelf);
                            return (
                                <Book
                                    key={key}
                                    book={book}
                                    readBooks={readBooks}
                                    searchBooks={searchBooks}
                                    shelf={shelf}
                                    onupdateShelf={this.props.onupdateShelf}
                                />
                            );
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchPage;