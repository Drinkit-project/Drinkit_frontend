import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ToggleButton from "./components/ui/ToggleButton";
import Footer from "./components/Footer/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <div className="bg-pink-50">
      <ScrollToTop />
      <AuthContextProvider>
        <CartProvider>
          <div className="min-w-[348px] min-h-[100vh] mx-auto">
            <header className=" border-b-2 border-pink-200 bg-white w-full">
              <Navbar />
            </header>
            <div className="max-w-6xl min-h-[50%] mx-auto">
              <Outlet />
            </div>
          </div>
          <Footer />
          <ToggleButton />
        </CartProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
