export default function ShopCard(props) {
    const {
        id,
        name,
        color,
        price,
        appendToCart
    } = props;

    const item = { id: id, type: props.type, name: name, color: color, price: price }

    return (
        <div id={"product-" + id} className="card">
            <div style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                <div style={{ backgroundColor: color, height: "40px", width: "40px", marginTop: "30px" }}>
                </div>
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    {name}
                </span>
                <p>Цена: {price} монет</p>
            </div>
            <div className="card-action">
                { props.userPurchases.find(item => item["id"] == id) ? (
                    <button className="btn-small" disabled>
                        Куплено
                    </button>
                ) : props.cartItems.includes(id) ? (
                    <button className="btn-small" onClick={() => appendToCart(item)}>
                        В корзине
                    </button>
                ) : (
                    <button className="btn-small" onClick={() => appendToCart(item)}>
                        Купить
                    </button>
                )}
            </div>
        </div>
    );
}