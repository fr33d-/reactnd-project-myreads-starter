import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import Placeholder from './placeholder'

class SearchBooks extends Component {

	state = {
		"value": "none",
		"books": [],
		"searchedBooks": []
	}

	componentWillMount() {
	    // getter for local storage
		localStorage.getItem('books') && this.setState({
			books: JSON.parse(localStorage.getItem('books')),
			isLoading: false
		})
	}

	componentWillUpdate(nextProps, nextState) {
		// setter for local storage
		localStorage.setItem('books', JSON.stringify(this.state.books));
	}

	handleSearch = (event) => {

		const api = "https://reactnd-books-api.udacity.com"

		// Generate a unique token for storing your bookshelf data on the backend server.
		let token = localStorage.token
		if (!token)
		  token = localStorage.token = Math.random().toString(36).substr(-8)

		const headers = {
		  'Accept': 'application/json',
		  'Authorization': token
		}

		const search = (query) =>
		  fetch(`${api}/search`, {
		    method: 'POST',
		    headers: {
		      ...headers,
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ query })
		  }).then(res => res.json())
		  .catch(error => console.log(error))

		console.log("event.target.value: " + event.target.value)
	    search(event.target.value)
	    	.then(data => {
	    		console.log("Empfangene daten:" + data)
	    		console.log(data)
	    		if (data != null && data.error == null && data.books != null && data.books[0].title != null) {
	    			this.setState(() => ({ searchedBooks: data.books }))

	    		} else { //(data === null || data.error !== null || data.books.error !== null)

	    			console.log("Error")
					this.setState(() => ({ searchedBooks: [] }))
	    		}

	    	})
	}

	handleChange = (action, book) => {

		var newBook = book
		book.category = action.target.value

		this.setState((state ) => ({
			books: state.books.push(newBook)
		}))

	}

	render() {

		return (
			<div className="app">
				<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to="/">Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
						<input type="text" onChange={this.handleSearch} placeholder="Search by title or author" />
	              </div>
	            </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{( this.state.searchedBooks != null && this.state.searchedBooks.length > 0) ? this.state.searchedBooks.map(book => ( <Book book={book} onDeleteBook={this.handleChange} key={book.id} /> )) : <Placeholder />}
	              </ol>
	            </div>
	          </div>
	         </div>
		)
	}
}

export default SearchBooks
