import {useState} from 'react';
import PurchasesList from './PurchasesList';

export default function Header(props) {

    var userName = props.userData.userName;
    var userBalance = props.userData.balance;

    const [purchasesShow, setPurchasesShow] = useState(false); // модальное окно

    const togglePurchasesShow = () => setPurchasesShow(!purchasesShow);

    return (
        <header>
            <nav>
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo">SeaBattle Shop</a>
                    { userName ? (
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <button type="exit" className="btn btn-light" onClick={ () => { localStorage.removeItem("userName"); window.location.reload(); }}>Выход</button>
                        </ul>
                    ) : (
                        null
                    )}
                    { userName ? (
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">Игрок: {userName}</a></li>
                        </ul>
                    ) : (
                        null
                    )}
                    { userBalance != null ? (
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">Баланс: {userBalance} монет</a></li>
                        </ul>
                    ) : (
                        null
                    )}
                    { userName ? (
                        <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ marginLeft: 250 + 'px' }}>
                            <button type="exit" className="btn btn-light" onClick={togglePurchasesShow}>Покупки</button>
                        </ul>
                    ) : (
                        null
                    )}
                </div>
            </nav>
            { purchasesShow ? (
                <PurchasesList userData={props.userData} toggleShow={togglePurchasesShow}/>
            ) : (
                null
            )}
        </header>
    );
}