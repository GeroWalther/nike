import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import Btn from "../components/Btn";

import {
  // useSelector,
  useDispatch,
} from "react-redux";
import { cartSlice } from "../store/cartSlice";

import { useGetProductQuery } from "../store/apiSlice";

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const { data, isLoading, error } = useGetProductQuery(id);

  const product = data?.data;

  // const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  function addToCart() {
    dispatch(cartSlice.actions.addCartItem({ product }));
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching the product. {error.error}</Text>;
  }

  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width,
                aspectRatio: 1,
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Btn onPress={addToCart}>Add to Cart</Btn>

      {/* Navigation icon
      <Pressable style={styles.icon}>
        <Ionicons name="close" size={24} color="white" />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  icon: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#000000AA",
    borderRadius: 50,
    padding: 5,
  },
});

export default ProductDetailsScreen;
