import CartItem from './CartItem';

export default function CartList(props) {
    // общая стоимость товаров в корзине
    const cost = props.items.reduce((sum, item) => sum + item.price, 0);

    const purchaseItems = (items) => {
        var itemsToPurchase = [];

        items.forEach(item => itemsToPurchase.push({ "id" : item.id, 
                                                        "type": item.type, 
                                                        "name": item.name, 
                                                        "color": item.color, 
                                                        "isSelected": false }));

        var userName = props.userData.userName;

        fetch("/shop/buy-shop-items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ userName, itemsToPurchase, cost })
        })

        props.toggleShow();

        props.clearCart();
        
        window.location.reload();
    }

    return (
        <div className="cart-modal">
            <i className="material-icons cart-modal-close" onClick={props.toggleShow}>
                close
            </i>

            <h5>Ваша корзина</h5>

            { props.items.length ? (
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Наименование</th>
                            <th>Цвет</th>
                            <th>Стоимость</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.items.map(item =>
                            <CartItem key={item.id} {...item} removeFromCart={props.removeFromCart} />
                        )}
                        <tr>
                            <th colSpan="3">Итого</th>
                            <th>{cost}</th>
                            <th>монет</th>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
            { props.items.length ? cost <= props.userData.balance ? (
                <button type="submit" className="right btn btn-light" id="buttonBuy" onClick={ () => purchaseItems(props.items, cost) }>Купить</button>
            ) : (
                <button type="submit" className="right btn btn-light" id="buttonBuy" disabled>Купить</button>
            ) : (
                null
            )}

        </div>
    );
}