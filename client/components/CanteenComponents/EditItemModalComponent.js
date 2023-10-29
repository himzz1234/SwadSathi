import React, { useContext, useState } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import axios from "../../axios";
import CustomModal from "../ModalComponent";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import useUpload from "../../hooks/useUpload";

export default function EditItemComponenent({ openModal, setOpenModal, item }) {
  const { auth: canteen } = useContext(AuthContext);

  const [itemData, setItemData] = useState({
    name: item.name,
    image: item.image,
    price: String(item.price),
  });

  const { uploadedImage, isLoading } = useUpload(itemData.image);

  const addItem = async () => {
    const res = await axios.post("/auth/admin/item", {
      ...itemData,
      image: uploadedImage,
      canteenId: canteen._id,
    });

    // setCanteenMenu((prev) => [...prev, res.data.newItem]);
    setItemData({
      name: "",
      image: "",
      price: "",
    });

    setOpenModal(false);
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
            disabled={isLoading}
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
