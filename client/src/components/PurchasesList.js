import PurchasesItem from './PurchasesItem';

export default function PurchasesList(props) {

    var itemsToSelect = [];
    var userPurchases = props.userData.purchases;

    const addItem = (item) => {
        /*var isItemSelected = false;

        userPurchases.forEach(purchase => {
            if (purchase.isSelected && purchase.id == item) {
                isItemSelected = true;
                return;
            }
        });

        if (isItemSelected)
            return;*/

        const index = itemsToSelect.indexOf(item);

        if (index === -1) {
            itemsToSelect.push(item);
        }
    }

    userPurchases.forEach(purchase => {
        if (purchase.isSelected) {
            addItem(purchase.id);
        }
    });

    const deleteItem = (item) => {
        const index = itemsToSelect.indexOf(item);

        if (index > -1) {
            itemsToSelect.splice(index, 1);
        }
    }

    const selectItems = () => {
        var userName = props.userData.userName;

        console.log("newItems: " + itemsToSelect);

        fetch("/shop/select-shop-items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ userName, itemsToSelect })
        })

        props.toggleShow();
        
        window.location.reload();
    }

    return (
        <div className="cart-modal">
            <i className="material-icons cart-modal-close" onClick={props.toggleShow}>
                close
            </i>

            <h5>Ваш список покупок</h5>

            { userPurchases.length ? (
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Наименование</th>
                            <th>Цвет</th>
                            <th>Выбрать</th>
                        </tr>
                    </thead>
                    <tbody id="purchasesItem">
                        { userPurchases.map(item =>
                            <PurchasesItem key={item.id} {...item} isSelected={item.isSelected} addItem={addItem} deleteItem={deleteItem}/>
                        )}
                    </tbody>
                </table>
            ) : (
                <p>Ваш список покупок пуст</p>
            )}
            <button type="submit" className="right btn btn-light" id="buttonBuy" onClick={ () => selectItems() }>Выбрать</button>
        </div>
    );
}