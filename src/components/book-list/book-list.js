import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './book-list.css';

// отвечает только за отрисовку компонента
const BookList = ({ books }) => {
  return (
    <ul>
      {
        books.map((book) => {
          return (
            <li key={book.id}><BookListItem book={book}/></li>
          )
        })
      }
    </ul>
  );
}

// отвечает за поведение. Так как у BookListContainer будет метод жизненного цикла
// создаём его как класс
class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
    // 1. receive data
    //2. dispatch action to store
    // у нашего компонента появляется новое св-во
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      <Spinner />
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} />
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  /*  booksLoaded: (newBooks) => {
      dispatch(booksLoaded(newBooks));}*/
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
  )(BookListContainer);

