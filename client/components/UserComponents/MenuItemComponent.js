import React, { useContext, useRef, useCallback, useMemo } from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { CartContext } from "../../context/CartContext";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import OrderDetailComponent from "./OrderDetailComponent";
import CustomBackdrop from "../CustomBackdropComponent";

const MenuItem = ({ item }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "60.5%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    if (index == 1) console.log("its opened", index);
  }, []);

  return (
    <>
      <Pressable onPress={handlePresentModalPress} style={styles.container}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: 20,
            height: 20,
            borderWidth: 2,
            borderColor: item.classification === "Veg" ? "#088409" : "#92282a",
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
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>₹{item.price}</Text>
          </View>
        </View>
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={CustomBackdrop}
      >
        <OrderDetailComponent {...{ item }} />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    borderRadius: 5,
    width: "46.5%",
    alignItems: "center",
    height: 180,
  },
  imageContainer: {
    width: "100%",
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 7.5,
  },
  infoContainer: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    display: "flex",
    gap: 5,
    paddingVertical: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#355e4c",
  },
  addButtonContainer: {
    backgroundColor: "#00CC66",
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 28,
    width: 30,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MenuItem;
