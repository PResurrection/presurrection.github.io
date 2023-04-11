export default function CartItem(props) {
    return (
        <tr>
            <td>{props.type}</td>
            <td>{props.name}</td>
            <td>
                <div style={{ backgroundColor: props.color, height: "40px", width: "40px" }}></div>
            </td>
            <td>{props.price}</td>
            <td>
                <i
                    className="material-icons cart-item-delete"
                    onClick={() => props.removeFromCart(props.id)}
                >
                    close
                </i>
            </td>
        </tr>
    );
}