import { Component } from 'react';
import React from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
state = {
  value: this.props.book.shelf,
}
handleChange = event => {
  this.setState({value: event.target.value});
  this.props.onupdateShelf(this.props.book,event.target.value);
}
    render() {
      const{book}=this.props;
        return(
            <li>
            <div className="book">
              <div className="book-top">

              <div className="book-cover" style={{ width: 128, height: 193,
                   backgroundImage: `url(${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail}})` }}>
                   </div>
                
                <div className="book-shelf-changer">
                  <select 
                   value={this.props.shelf || 'none'}
                   onChange={this.handleChange} > 
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
         
        )
    }
}

export default Book;