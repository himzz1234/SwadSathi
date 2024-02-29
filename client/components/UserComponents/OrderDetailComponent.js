import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CartContext } from "../../context/CartContext";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

export default function OrderDetailComponent({ item }) {
  const { cart, dispatch } = useContext(CartContext);
  const [pquantity, setPQuantity] = useState(
    cart.find(
      (cartItem) => cartItem.id === item._id && cartItem.type === "Parcel"
    )
      ? cart.find(
          (cartItem) => cartItem.id === item._id && cartItem.type === "Parcel"
        ).qty
      : 0
  );

  const [dquantity, setDQuantity] = useState(
    cart.find(
      (cartItem) => cartItem.id === item._id && cartItem.type === "Dine-In"
    )
      ? cart.find(
          (cartItem) => cartItem.id === item._id && cartItem.type === "Dine-In"
        ).qty
      : 0
  );
  const { dismissAll } = useBottomSheetModal();

  const addItem = () => {
    const items = [];
    if (pquantity > 0) {
      items.push({
        id: item._id,
        cId: item.canteenId,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: pquantity,
        type: "Parcel",
      });
    }

    if (dquantity > 0) {
      items.push({
        id: item._id,
        cId: item.canteenId,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: dquantity,
        type: "Dine-In",
      });
    }

    items.forEach((data) => {
      dispatch({
        type: "ADD_ITEM",
        payload: data,
      });
    });

    dismissAll();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor:
                  item.classification === "Veg" ? "#088409" : "#92282a",
                borderRadius: 2,
                zIndex: 10,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor:
                    item.classification === "Veg" ? "#088409" : "#92282a",
                  borderRadius: 999,
                }}
              ></View>
            </View>
          </View>
          <Text style={styles.priceText}>₹{item.price}</Text>
          <View style={{ marginTop: 30, gap: 15 }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "500", flex: 1 }}>
                Parcel
              </Text>
              <View style={styles.quantityButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (pquantity > 0) setPQuantity((prev) => prev - 1);
                  }}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{pquantity}</Text>
                <TouchableOpacity
                  onPress={() => setPQuantity((prev) => prev + 1)}
                  style={[
                    styles.quantityButton,
                    { backgroundColor: "#355e4c" },
                  ]}
                >
                  <Text style={[styles.quantityButtonText, { color: "white" }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "500", flex: 1 }}>
                Dine-In
              </Text>

              <View style={styles.quantityButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (dquantity > 0) setDQuantity((prev) => prev - 1);
                  }}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{dquantity}</Text>
                <TouchableOpacity
                  onPress={() => setDQuantity((prev) => prev + 1)}
                  style={[
                    styles.quantityButton,
                    { backgroundColor: "#355e4c" },
                  ]}
                >
                  <Text style={[styles.quantityButtonText, { color: "white" }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={
          dquantity || pquantity ? ["#2e7653", "#355e4c"] : ["gray", "gray"]
        }
        style={[styles.button, styles.saveButton]}
      >
        <TouchableOpacity onPress={addItem} disabled={!pquantity && !dquantity}>
          <Text style={styles.saveButtonText}>
            Add To Cart (₹{item.price * pquantity + item.price * dquantity})
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 170,
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    borderRadius: 5,
  },
  itemName: {
    fontWeight: "600",
    fontSize: 20,
    flex: 1,
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 15,
  },
  quantityButtonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  quantityButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 22,
    height: 22,
    backgroundColor: "#e3e9e7",
    borderRadius: 999,
  },
  quantityButtonText: {
    fontSize: 13,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceText: {
    color: "#355e4c",
    fontWeight: "600",
    fontSize: 17,
    marginTop: 10,
  },
  button: {
    borderRadius: 7.5,
    paddingVertical: 15,
    elevation: 5,
  },
  saveButton: {
    borderColor: "transparent",
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
