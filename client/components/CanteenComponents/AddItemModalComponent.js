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
  Image,
} from "react-native";
import axios from "../../axios";
import CustomModal from "../ModalComponent";
import * as ImagePicker from "expo-image-picker";
import useUpload from "../../hooks/useUpload";
import { AuthContext } from "../../context/AuthContext";

export default function AddItemComponenent({
  openModal,
  setOpenModal,
  setCanteenMenu,
}) {
  const { auth: canteen } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [itemData, setItemData] = useState({
    name: "",
    image: "",
    price: "",
    isAvailable: true,
  });

  const { uploadedImage, isLoading } = useUpload(itemData.image);

  const addItem = async () => {
    if ((itemData.name, itemData.price)) {
      const res = await axios.post("/auth/admin/item", {
        ...itemData,
        image: uploadedImage,
        canteenId: canteen._id,
      });

      setCanteenMenu((prev) => [...prev, res.data.newItem]);
      setItemData({
        name: "",
        image: "",
        price: "",
        isAvailable: true,
      });

      setOpenModal(false);
    }
  };

  const pickImage = async () => {
    try {
      const imagePickResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!imagePickResponse.canceled) {
        setItemData({ ...itemData, image: imagePickResponse.assets[0].uri });
      }
    } catch (error) {
      console.log(error);
    }
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
        <TouchableOpacity
          onPress={pickImage}
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
          {!uploadedImage ? (
            <Ionicon name="camera" size={40} color="#2d7262" />
          ) : (
            <Image
              source={{ uri: uploadedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 999 }}
            />
          )}
        </TouchableOpacity>
        <View style={{ width: "100%", flex: 1, gap: 15 }}>
          <TextInput
            placeholder="Name"
            value={itemData.name}
            style={styles.inputContainer}
            onChangeText={(e) => setItemData({ ...itemData, name: e })}
          />
          <TextInput
            placeholder="Price"
            value={itemData.price}
            style={styles.inputContainer}
            onChangeText={(e) => setItemData({ ...itemData, price: e })}
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
            disabled={isLoading}
            onPress={addItem}
            style={[
              {
                backgroundColor: "#006442",
                borderColor: "transparent",
                flex: 0.75,
              },
              styles.button,
            ]}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={[
              {
                backgroundColor: "white",
                borderColor: "crimson",
                flex: 0.25,
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
  },
});
