export default function PurchasesItem(props) {

    const reselectItems = () => {
        document.getElementById("purchasesItem").childNodes.forEach((node) => {
            if (node.firstChild.textContent === props.type && node.lastChild.firstChild.textContent === "check") {
                node.lastChild.firstChild.textContent = "0";
                props.deleteItem(node.lastChild.firstChild.id.slice(13));
            }
        })
        
        props.addItem(props.id);

        if (document.getElementById("selectButton-" + props.id).firstChild.textContent === "check")
            document.getElementById("selectButton-" + props.id).firstChild.textContent = "0";
        else
            document.getElementById("selectButton-" + props.id).firstChild.textContent = "check";
    }

    return (
        <tr>
            <td>{props.type}</td>
            <td>{props.name}</td>
            <td>
                <div style={{ backgroundColor: props.color, height: "40px", width: "40px" }}></div>
            </td>
            <td>
                <i  id={"selectButton-" + props.id}
                    className="material-icons cart-item-delete"
                    onClick={() => reselectItems() }
                >
                    { props.isSelected ? "check" : "0" }
                </i>
            </td>
        </tr>
    );
}