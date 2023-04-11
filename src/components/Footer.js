export default function Footer() {
    return (
        <footer className="page-footer">
            <div className="container">
                © {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    );
}