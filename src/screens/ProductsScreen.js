import {
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";
import React from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { productSlice } from "../store/productSlice";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductsScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error fetching Products: {error.error}</Text>;
  }

  const products = data.data;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            //dispatch action to update selectedProduct
            // dispatch(productSlice.actions.setSelectedProduct(item.id));

            navigation.navigate("Details", { id: item._id });
          }}
          style={styles.itemCon}
        >
          <Image source={{ uri: item.image }} style={styles.img} />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  itemCon: {
    width: "50%",
    padding: 1,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
});
