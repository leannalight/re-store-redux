// создаём класс, который будет возвращать пустой массив книг

export default class BookstoreService {

    getBooks() {
        return [
            { 
              id: 1,
              title: 'Production-Ready Microservices',
              author: 'Susan J. Fowler' },
            { 
                id: 2,
                name: 'Release It!',
                author: 'Michael T. Nygard' }
        ];
    }
}