// Fragment bileşenini React'ten içe aktarır
import { Fragment } from "react";
// Cart bileşenini içe aktarır
import Cart from "../components/Cart/Cart";

// CartPage bileşeni tanımlanır
const CartPage = () => {
  return (
    // Fragment kullanarak gereksiz DOM düğümlerini önler
    <Fragment>
      {/* Cart bileşenini çağırır */}
      <Cart />
    </Fragment>
  );
};

// CartPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CartPage;
