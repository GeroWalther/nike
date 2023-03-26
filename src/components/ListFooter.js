import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectSubtotal,
  selectDeliveryPrice,
  selectTotal,
} from "../store/cartSlice";

const ListFooter = () => {
  const subtotal = useSelector(selectSubtotal);
  const shippingFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  return (
    <View style={styles.totalContainer}>
      <View style={styles.row}>
        <Text style={styles.txt}>Subtotal</Text>
        <Text style={styles.txt}>${subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txt}>Shipping</Text>
        <Text style={styles.txt}>${shippingFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtBold}>Total</Text>
        <Text style={styles.txtBold}>${total}</Text>
      </View>
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  totalContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  txt: {
    fontSize: 16,
    color: "grey",
  },
  txtBold: {
    fontSize: 16,
    fontWeight: "500",
  },
});
