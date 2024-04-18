export function addCartUtil(cartContext,book) {
    const {cart, setCart} = cartContext
    const existingBook = cart.books.find(item => item.id === book.id);
    if (existingBook) {
        setCart(prevCart => ({
            ...prevCart,
            books: prevCart.books.map(item =>
                item.id === existingBook.id ? {...item, quantity: item.quantity + 1} : item
            ),
            total: prevCart.total + book.price,
            volume: prevCart.volume + 1
        }));
    } else {
        setCart(prevCart => ({
            books: [...prevCart.books, {id: book.id, title: book.title, thumbnailUrl: book.thumbnailUrl, price: book.price, quantity: 1}],
            total: prevCart.total + book.price,
            volume: prevCart.volume + 1
        }));
    }
}
export function addBookUtil(cartContext, book) {
    const {setCart} = cartContext
    setCart(prevCart => ({
        ...prevCart,
        books: prevCart.books.map(item =>
            item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        total: prevCart.total + book.price,
        volume: prevCart.volume + 1
    }));
}

export function subtractBookUtil(cartContext, book){
    const {setCart} = cartContext
    setCart(prevCart => ({
        ...prevCart,
        books: prevCart.books.map(item =>
            item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item
        ),
        total: prevCart.total - book.price,
        volume: prevCart.volume - 1
    }));
    setCart(prevCart => {return {...prevCart, books: prevCart.books.filter(item => item.quantity > 0)}})
}

export function removeBookUtil(cartContext, book){
    const {setCart} = cartContext
    setCart(prevCart => ({
        ...prevCart,
        total: prevCart.total - (book.price*book.quantity),
        volume: prevCart.volume - book.quantity
    }));
    setCart(prevCart => {return {...prevCart, books: prevCart.books.filter(item => item.id !== book.id)}})
}

export function clearCartUtil(cartContext){
    const {setCart} = cartContext
    setCart({books:[],
    total:0,
    volume:0})
}
