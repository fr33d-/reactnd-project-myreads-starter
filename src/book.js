import React, { Component } from 'react'

class Book extends Component {

  render() {

		return (
        	<li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+this.props.book.imageLinks.smallThumbnail+")" }}></div>
                {/*<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.book.imageURL }}></div>*/}
                <div className="book-shelf-changer">
                  <select onChange={(value) => this.props.onDeleteBook(value, this.props.book)} value={this.props.value} >
                  {/*<select onChange={this.props.onDeleteBook} value={this.props.value} >*/}
                    <option value="none" disabled selected={this.props.book.category !== null}>Move to...</option>
                    <option value="currently" selected={this.props.book.category === 'currently'}>Currently Reading</option>
                    <option value="want" selected={this.props.book.category === 'want'}>Want to Read</option>
                    <option value="read" selected={this.props.book.category === 'read'}>Read</option>
                    <option value="delete">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{this.props.book.author}</div>
            </div>
          </li>
		)
	}
}

export default Book