import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Take all remaining vertical space between Header and Footer. */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>
            {/* React does not re-render Header/Footer differently for every page. Only what you pass as children changes. */}

            <Footer />
        </div>
    );
};

export default Layout;
