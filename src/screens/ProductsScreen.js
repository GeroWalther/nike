import { StyleSheet, View, FlatList, Image, Pressable } from "react-native";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { productSlice } from "../store/productSlice";

const ProductsScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            //dispatch action to update selectedProduct
            dispatch(productSlice.actions.setSelectedProduct(item.id));

            navigation.navigate("Details");
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
