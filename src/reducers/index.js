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
      // для начала найдём индекс этого элемента в массиве
      const itemIndex = state.cartItems.findIndex(({id}) => id === bookId);
      // мы ищем индекс элемента, у которого id точно такое же, как id
      // книги, с которой мы сейчас работаем. И этот itemIndex может быть либо индекс
      // элемента, либо -1 - если такого элемента не существует. Нам понадобится этот индекс,
      // чтобы знать какой элемент обновлять. Так же мы можем получить сам элемент
      const item = state.cartItems[itemIndex];

      // если у нас есть старый item, то мы создаём новый item на основании старого,
      // увеличивая его счётчик на 1
      let newItem;

      if (item) {
        newItem = {
          ...item,
          count: item.count + 1, // увеличиваем на 1 старое значение count
          total: item.total + book.price
        };
      } else { // а если его нет, тогда новый item будет создаваться точно также как раньше
        newItem = {
          id: book.id,
          title: book.title,
          count: 1,
          total: book.price
        };
      }
      // если индекс элемента меньше 0 (-1), то мы добавляем
      // наш элемент в конец массива
      if (itemIndex < 0) {
        return {
          ...state, // возвращаем state, у которого будут все теже элементы, что и у старого state
          cartItems: [ // кроме элемента cartItems, который будет новым массивом,
            ...state.cartItems, // у которого будут всё теже элементы, что и у state.cartItems
            newItem // плюс новый элемент newItem
          ]
        };
      } else { // в противоположном случае, если у нас есть индекс (т.е. существующий эл-т)
        return { // обновляем массив
          ...state,
          cartItems: [// разбиваем наш массив на 3 части:
            ...state.cartItems.slice(0, itemIndex),// 1. все те эл-ты, которые идут до нашего индекса
            newItem, // 2. затем вставляем элемент newItem
            ...state.cartItems.slice(itemIndex + 1),// 3. все эл-ты, которые идут после индекса
          ]
        };
      }

      default:
        return state;
  }
};

export default reducer;
