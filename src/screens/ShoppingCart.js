import { FlatList, Alert } from "react-native";
import Btn from "../components/Btn";
import CartListItem from "../components/CartListItem";
import ListFooter from "../components/ListFooter";
import {
  useCreateOrderMutation,
  useCreatePaymentIntenetMutation,
} from "../store/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubtotal,
  selectDeliveryPrice,
  selectTotal,
  cartSlice,
} from "../store/cartSlice";
import { useStripe } from "@stripe/stripe-react-native";

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubtotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const [createPaymentIntenet] = useCreatePaymentIntenetMutation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentIntenet({
      amount: Math.floor(total * 100),
    });
    if (response.error) {
      Alert.alert("Something went wrong", response.error);
      return;
    }
    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Nike Shoe Store",
      paymentIntentClientSecret: response.data.paymentIntent,
      // defaultBillingDetails: {},// for the name,address etc.
    });
    if (initResponse.error) {
      // console.log(initResponse.error);
      Alert.alert("Something went wrong");
      return;
    }
    // 3. Present the Payment Sheet from Stripe
    const { error: paymentError } = await presentPaymentSheet();
    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }
    // 4. If payment ok -> create the order
    onCreateOrder();
  };

  async function onCreateOrder() {
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
