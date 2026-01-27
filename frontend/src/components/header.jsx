import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="border-b border-gray-200">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

                <h1 className="text-xl font-semibold">Singh Tour & Travels</h1>

                <nav className="flex gap-6 text-sm font-medium">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/cars" className="hover:text-blue-600">Cars</Link>
                    <Link to="/login" className="hover:text-blue-600">Login</Link>
                </nav>

            </div>
        </header>
    );
};

export default Header;
