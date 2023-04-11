import {useState} from 'react';
import CartIcon from './CartIcon';
import ShowAlert from './ShowAlert';
import CartList from './CartList';
import ShopList from './ShopList';

export default function Content(props) {
    const [cartItems, setCartItems] = useState([]);
    const [cartShow, setCartShow] = useState(false); // модальное окно
    // для показа сообщения после добавления в корзину
    const [showAlert, setShowAlert] = useState(null);

    const appendToCart = (item) => {
        // нужно проверить, нет ли уже такого товара в корзине
        const itemIndex = cartItems.findIndex(value => value.id === item.id);

        if (itemIndex < 0) { // такого товара еще нет
            setCartItems([...cartItems, item]);
            setShowAlert('Цвет \'' + item.name + '\' добавлен в корзину');
        } else { // такой товар уже есть
            setShowAlert('Цвет \'' + item.name + '\' уже есть в корзине');
        }

        localStorage.setItem("cartItems", cartItems);
    };

    const removeFromCart = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
    }

    const clearCart = () => {
        const newCart = [];
        setCartItems(newCart);
    }

    const toggleCartShow = () => setCartShow(!cartShow);
    const hideAlert = () => setShowAlert(null);

    //const cartItemsCached = localStorage.getItem("cartItems");
    //setCartItems(cartItemsCached);

    return (
        <main className="container">
            <CartIcon length={cartItems.length} toggleShow={toggleCartShow} />

            { showAlert && <ShowAlert text={showAlert} hideAlert={hideAlert} /> }

            <ShopList cartItems={cartItems} userPurchases={props.userData.purchases} appendToCart={appendToCart} />

            { cartShow ? (
                <CartList items={cartItems} userData={props.userData} toggleShow={toggleCartShow} removeFromCart={removeFromCart} clearCart={clearCart}/>
            ) : (
                null
            )}
        </main>
    );
}