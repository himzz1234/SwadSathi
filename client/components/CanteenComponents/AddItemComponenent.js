import React, { useContext, useState } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import axios from "../../axios";
import CustomModal from "../ModalComponent";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../context/AuthContext";

export default function AddItemComponenent({
  openModal,
  setOpenModal,
  setCanteenMenu,
}) {
  const { auth: canteen } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    isAvailable: true,
  });

  const addItem = async () => {
    const res = await axios.post("/auth/admin/item", {
      ...formData,
      canteenId: canteen._id,
    });

    setCanteenMenu((prev) => [...prev, res.data.newItem]);
    setOpenModal(false);
  };

  return (
    <CustomModal openFn={openModal}>
      <View
        style={{
          gap: 40,
          height: 500,
          display: "flex",
          borderRadius: 5,
          paddingVertical: 30,
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "white",
          width: Dimensions.get("screen").width - 40,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eef5ca",
          }}
        >
          <Ionicon name="camera" size={40} color="#2d7262" />
        </View>
        <View style={{ width: "100%", flex: 1, gap: 15 }}>
          <TextInput
            placeholder="Name"
            value={formData.name}
            style={styles.inputContainer}
            onChangeText={(e) => setFormData({ ...formData, name: e })}
          />
          <TextInput
            placeholder="Price"
            value={formData.price}
            style={styles.inputContainer}
            onChangeText={(e) => setFormData({ ...formData, price: e })}
          />

          <View
            style={{
              gap: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Switch
              style={{ width: 40 }}
              trackColor={{ false: "#767577", true: "#ff9e8c" }}
              thumbColor={isEnabled ? "#FF6347" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>In stock</Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={[
              {
                backgroundColor: "white",
                borderColor: "crimson",
              },
              styles.button,
            ]}
          >
            <Text
              style={{ color: "crimson", textAlign: "center", fontSize: 16 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addItem}
            style={[
              { backgroundColor: "#006442", borderColor: "transparent" },
              styles.button,
            ]}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: "#efeeea",
    borderRadius: 5,
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 12.5,
    elevation: 3,
    flex: 1,
  },
});
