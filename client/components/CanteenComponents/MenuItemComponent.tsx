import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  Image,
  Switch,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import EditItemComponenent from "./EditItemModalComponent";
import axios from "../../axios";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

export default function MenuItem({ item, setCanteenMenu }) {
  const [isEnabled, setIsEnabled] = useState(item.isAvailable);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["78.5%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  useEffect(() => {
    const updateItemAvailability = async () => {
      try {
        const res = await axios.put(`/auth/canteen/item/${item._id}`, {
          isAvailable: isEnabled,
        });
      } catch (error) {
        console.error(error);
      }
    };

    updateItemAvailability();
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.imageContainer}>
          {item.image && (
            <Image source={{ uri: `${item.image}` }} style={styles.itemImage} />
          )}
        </View>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={{
            backgroundColor: "#e8f5db",
            marginTop: 10,
            padding: 5,
            borderRadius: 2,
          }}
        >
          <Text
            style={{
              color: "#355e4c",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardInfoHeader}>
          <Text style={styles.cardInfoName}>{item.name}</Text>
          <View style={styles.cardInfoSwitchContainer}>
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              style={{
                width: 60,
                height: 10,
                transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
              }}
              trackColor={{ false: "#767577", true: "#cfe1b9" }}
              thumbColor={isEnabled ? "#355e4c" : "#f4f3f4"}
            />
            {/* <Text style={{ color: "darkgray" }}>Available</Text> */}
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>₹{item.price}</Text>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <EditItemComponenent {...{ item, setCanteenMenu }} />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    gap: 10,
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: { width: 100, height: 80 },
  itemImage: { width: "100%", height: "100%", borderRadius: 5 },
  cardInfoContainer: { flex: 1, rowGap: 5 },
  cardInfoHeader: { display: "flex", flexDirection: "row" },
  cardInfoName: { fontSize: 17, fontWeight: "600", flex: 1 },
  cardInfoSwitchContainer: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
