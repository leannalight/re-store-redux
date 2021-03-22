const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
};

const reducer = (state = initialState, action) => {

  console.log(action.type);

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        // cartItems: state.cartItems, // передаём поля, не изменяя их значения
        // orderTotal: state.orderTotal,
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId );
      const newItem = {
        id: book.id,
        name: book.title,
        count: 1,
        total: book.price
      };

      return {
        ...state, // возвращаем state, у которого будут все теже элементы, что и у старого state
        cartItems: [ // кроме элемента cartItems, который будет новым массивом,
          ...state.cartItems, // у которого будут всё теже элементы, что и у state.cartItems
          newItem // плюс новый элемент newItem
        ]
      }

      default:
        return state;
  }
};

export default reducer;
