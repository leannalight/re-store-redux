import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './book-list.css';

// так как у BookList будет метод жизненного цикла
// создаём его как класс
class BookList extends Component {

  componentDidMount() {
    // 1. receive data
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError } = this.props;

    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data)) // если асинхронные данные
      .catch((err) => booksError(err));

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
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = {
  /*  booksLoaded: (newBooks) => {
      dispatch(booksLoaded(newBooks));}*/
      booksLoaded,
      booksRequested,
      booksError
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
  )(BookList);

