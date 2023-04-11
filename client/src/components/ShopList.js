import {useState, useEffect} from 'react';
import Preloader from './Preloader';
import ShopCard from './ShopCard';

export default function ShopList(props) {
    const [shopItems, setShopItems] = useState([]); // товары магазина
    const [loading, setLoading] = useState(true); // идет загрузка?

    useEffect(() => {
        fetch("/shop/get-items-list")
            .then(response => response.json())
            .then(data => {
                setShopItems(data.shop_items_list)

                setLoading(false);
            });
    }, []);

    return (
        <div className="items">
            <h3>Цвет кораблей</h3>
            { loading ? (
                <Preloader />
            ) : shopItems ? (
                shopItems.ships_color.items.map(item => (
                    <ShopCard key={item.id} type={shopItems.ships_color.type} {...item} cartItems={props.cartItems} userPurchases={props.userPurchases} appendToCart={props.appendToCart} />
                ))
            ) : (
                <p>Не удалось загрузить список товаров</p>
            )}
            <h3>Цвет поля</h3>
            { loading ? (
                <Preloader />
            ) : shopItems ? (
                shopItems.field_color.items.map(item => (
                    <ShopCard key={item.id} type={shopItems.field_color.type} {...item} cartItems={props.cartItems} userPurchases={props.userPurchases} appendToCart={props.appendToCart} />
                ))
            ) : (
                <p>Не удалось загрузить список товаров</p>
            )}
            <h3>Цвет фона</h3>
            { loading ? (
                <Preloader />
            ) : shopItems ? (
                shopItems.background_color.items.map(item => (
                    <ShopCard key={item.id} type={shopItems.background_color.type} {...item} cartItems={props.cartItems} userPurchases={props.userPurchases} appendToCart={props.appendToCart} />
                ))
            ) : (
                <p>Не удалось загрузить список товаров</p>
            )}
        </div>
    );
}