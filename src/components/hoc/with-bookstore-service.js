import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

// возвращает ф-ию, которая принимает компонент, который ы будем оборачивать
const withBookstoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                       return (
                        <Wrapped {...props}
                        bookstoreService={bookstoreService}/>
                       );
                    }
                }
            </BookstoreServiceConsumer>
        );
    }
};

export default withBookstoreService;