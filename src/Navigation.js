import { Pressable, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FontAwesome5 } from "@expo/vector-icons";

import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShoppingCart from "./screens/ShoppingCart";

import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

function Navigation() {
  const numberofItems = useSelector(selectNumberOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ contentStyle: styles.container }}>
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{ flexDirection: "row" }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={styles.cartItems}>{numberofItems}</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;

const styles = StyleSheet.create({
  cartItems: { marginLeft: 5, fontWeight: "500" },
  container: { backgroundColor: "white" },
});
