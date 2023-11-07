import React, { useEffect, useState } from "react";
import { View, Text, Image, Switch, Pressable, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EditItemComponenent from "./EditItemModalComponent";
import axios from "../../axios";

export default function MenuItem({ item }) {
  const [openModal, setOpenModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(item.isAvailable);

  useEffect(() => {
    const updateItemAvailability = async () => {
      try {
        console.log(isEnabled);
        const res = await axios.put(`/auth/admin/item/${item._id}`, {
          isAvailable: isEnabled,
        });
        console.log(res.data);
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
      <View style={styles.imageContainer}>
        {item.image && (
          <Image source={{ uri: `${item.image}` }} style={styles.itemImage} />
        )}
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
              trackColor={{ false: "#767577", true: "#ff9e8c" }}
              thumbColor={isEnabled ? "#FF6347" : "#f4f3f4"}
            />
            {/* <Text style={{ color: "darkgray" }}>Available</Text> */}
          </View>
        </View>
        <Text style={{ fontSize: 15 }}>₹{item.price}</Text>
      </View>

      {/* <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#E5E4E2",
          paddingVertical: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => setOpenModal(true)}
          style={{
            gap: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FF6347",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 4,
          }}
        >
          <MaterialIcon name="edit" size={16} color="white" />
          <Text style={{ color: "white" }}>Edit</Text>
        </TouchableOpacity>
      </View> */}

      {openModal ? (
        <EditItemComponenent {...{ openModal, setOpenModal, item }} />
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    gap: 10,
    padding: 7.5,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: { width: 80, height: 80 },
  itemImage: { width: "100%", height: "100%", borderRadius: 5 },
  cardInfoContainer: { flex: 1, rowGap: 5 },
  cardInfoHeader: { display: "flex", flexDirection: "row" },
  cardInfoName: { fontSize: 16, fontWeight: "600", flex: 1 },
  cardInfoSwitchContainer: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
