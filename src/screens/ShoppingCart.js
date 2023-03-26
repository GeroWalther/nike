import { FlatList } from "react-native";
import Btn from "../components/Btn";
import CartListItem from "../components/CartListItem";
import ListFooter from "../components/ListFooter";

import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.items);

  function checkout() {
    console.log("Checkout pressed!");
  }
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ListFooter}
      />
      <Btn onPress={checkout}>Checkout</Btn>
    </>
  );
};

export default ShoppingCart;
