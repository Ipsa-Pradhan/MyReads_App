import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
//import Book from './Book'
import SearchPage from './SearchPage'
import { BrowserRouter, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    readBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ readBooks: books })
    })
  }

  updateShelf = (book, shelf) => {
    console.log("Updating Shelf")
    BooksAPI.update(book, shelf).then(books => {
      book.shelf = shelf;
      this.setState(currState => ({
        readBooks: this.state.readBooks.filter
          (b => b.id !== book.id).concat([book])
      }))
    })

  }
  render() {
    const { readBooks} = this.state;
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/search"
            render={() => (
              <SearchPage
                readBooks={readBooks}
                onupdateShelf={this.updateShelf} />
            )} />

          <Route exact path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <BookShelf shelfType="currentlyReading"
                    onupdateShelf={this.updateShelf}
                    book={this.state.readBooks.filter(book =>
                      book.shelf === "currentlyReading"
                    )} />
                  <BookShelf shelfType="wantToRead"
                    onupdateShelf={this.updateShelf}
                    book={this.state.readBooks.filter(book =>
                      book.shelf === "wantToRead"
                    )} />
                  <BookShelf shelfType="Read"
                    onupdateShelf={this.updateShelf}
                    book={this.state.readBooks.filter(book =>
                      book.shelf === "read"
                    )} />
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Search Books</button>
                  </Link>
                </div>
              </div>
            )} />
        </BrowserRouter>
      </div>

    );
  }
}

export default BooksApp;
