import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_KEY =
  "pk_test_51MtvFIBwnmq4ruYjLEw3uL2C83LMcDEdlNEQ5FC1bSU7VMN7VEMT0Txu4AQm6m9xHf4twM4Rwqinmr0xyuZxx9vQ00NrGvkCaK";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <View style={styles.container}>
          <Navigation />
          <StatusBar style="auto" />
        </View>
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
