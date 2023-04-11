export default function Login() {
    return (
        <main className="container">
            <div id="form">
                <h5 id="textLogin">Введите ваш логин в игре SeaBattle:</h5>

                <input type="text" name="userName" id="userName" autoComplete="off"/><br/>
                <button type="submit" className="btn btn-light" id="buttonSubmit" onClick={ () => { localStorage.setItem("userName", document.getElementById("userName").value); window.location.reload(); } }>Войти</button>
            </div>
        </main>
    );
}