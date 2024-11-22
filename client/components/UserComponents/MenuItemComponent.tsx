import React, { useContext, useRef, useCallback, useMemo } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "@/context/cart/CartContext";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import OrderDetailComponent from "./OrderDetailComponent";

const MenuItem = ({ item }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const handlePresentModalPress = useCallback(() => {
    if (item.isAvailable) bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (index == 1) console.log("its opened", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

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
            opacity: !item.isAvailable ? 0.5 : 1,
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
        <View
          style={[
            styles.imageContainer,
            { opacity: !item.isAvailable ? 0.5 : 1 },
          ]}
        >
          <Image source={{ uri: item.image }} style={[styles.image]} />
        </View>
        <View
          style={[
            styles.infoContainer,
            { opacity: !item.isAvailable ? 0.5 : 1 },
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>₹{item.price}</Text>
          </View>
        </View>

        {!item.isAvailable && (
          <Pressable
            style={{
              position: "absolute",
              right: 10,
              top: 60,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "green",
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 2,
            }}
          >
            <Text style={{ fontSize: 13, color: "green" }}>Notify</Text>
          </Pressable>
        )}
      </Pressable>

      <BottomSheetModal
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
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
    width: "80%",
    height: 90,
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
    color: "black",
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
