import { FlatList, Alert } from "react-native";
import Btn from "../components/Btn";
import CartListItem from "../components/CartListItem";
import ListFooter from "../components/ListFooter";
import { useCreateOrderMutation } from "../store/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubtotal,
  selectDeliveryPrice,
  selectTotal,
  cartSlice,
} from "../store/cartSlice";

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubtotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  async function onCheckout() {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      delivery,
      total,
      customer: {
        name: "Gero",
        address: "123 Main St.",
        email: "gerosmail@gm.com",
      },
    });
    if (result.data?.status === "OK") {
      Alert.alert(
        "Order has been submitted",
        `Your order reference for tracking is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  }

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ListFooter}
      />
      <Btn onPress={onCheckout} isLoading={isLoading}>
        Checkout
      </Btn>
    </>
  );
};

export default ShoppingCart;
