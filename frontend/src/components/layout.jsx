import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;
