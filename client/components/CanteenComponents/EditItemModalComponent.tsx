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
import * as ImagePicker from "expo-image-picker";
import useUpload from "@/hooks/useCloudinaryUpload";
import { AuthContext } from "@/context/auth/AuthContext";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { getValueFor } from "@/utils/lib/secure-store";

export default function EditItemComponenent({ item, setCanteenMenu }) {
  const { auth: canteen } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { dismissAll } = useBottomSheetModal();
  const [itemData, setItemData] = useState({
    name: item.name,
    image: item.image,
    price: String(item.price),
    isAvailable: true,
  });

  const { uploadedImage, isLoading } = useUpload(itemData.image);

  const editItem = async () => {
    if ((itemData.name, itemData.price)) {
      const res = await axios.put(`/auth/canteen/item/${item._id}`, {
        ...itemData,
        image: uploadedImage,
        canteenId: canteen._id,
        price: Number(itemData.price),
      });

      setCanteenMenu((prev) => {
        const index = prev.findIndex((prevItem) => prevItem._id == item._id);
        const updatedOrders = [...prev];

        updatedOrders[index] = res.data.updatedItem;
        return updatedOrders;
      });

      setItemData({
        name: "",
        image: "",
        price: "",
        isAvailable: true,
      });
    }

    dismissAll();
  };

  const deleteItem = async () => {
    const obj = await getValueFor("auth");
    const { token } = JSON.parse(obj);

    try {
      await axios.delete(`/auth/canteen/item/${item._id}`, {
        headers: { token },
      });
    } catch (error) {}

    setCanteenMenu((prev) =>
      prev.filter((prevItem) => prevItem._id != item._id)
    );

    dismissAll();
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
    <View style={styles.container}>
      <Text style={styles.headerText}>Edit Item</Text>
      <View>
        <Text style={styles.label}>Image</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            {!uploadedImage && !item.image ? (
              <MaterialCommunityIcon
                name="food-variant"
                size={40}
                color="gray"
              />
            ) : (
              <Image
                source={{ uri: uploadedImage ? uploadedImage : item.image }}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.uploadContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload new Image</Text>
            </TouchableOpacity>
            <View style={styles.uploadInfo}>
              <Text style={styles.uploadInfoText}>
                At least 800x800 px recommended.
              </Text>
              <Text style={styles.uploadInfoText}>
                JPG or PNG and GIF is allowed
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter Item Name"
            value={itemData.name}
            style={styles.inputContainer}
            onChangeText={(e) => setItemData({ ...itemData, name: e })}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder="Enter Item Price"
            value={itemData.price}
            style={styles.inputContainer}
            onChangeText={(e) => setItemData({ ...itemData, price: e })}
          />
        </View>

        {/* <View style={styles.switchContainer}>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#ff9e8c" }}
            thumbColor={isEnabled ? "#FF6347" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{ fontWeight: "500" }}>In stock</Text>
        </View> */}
      </View>

      <LinearGradient
        colors={["#2e7653", "#355e4c"]}
        disabled={isLoading}
        style={[styles.button, styles.saveButton]}
      >
        <TouchableOpacity onPress={editItem}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </LinearGradient>
      {/* <TouchableOpacity
        onPress={deleteItem}
        style={{
          paddingVertical: 15,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "red",
        }}
      >
        <Text style={{ textAlign: "center" }}>Delete Item</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    display: "flex",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 7.5,
  },
  label: {
    fontWeight: "600",
    fontSize: 14.5,
  },
  imageRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    flex: 1,
  },
  uploadContainer: {
    gap: 10,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 5,
    width: 140,
    borderRadius: 5,
  },
  uploadButtonText: {
    textAlign: "center",
    fontWeight: "500",
  },
  uploadInfo: {
    gap: 5,
  },
  uploadInfoText: {
    fontSize: 12,
  },
  formContainer: {
    width: "100%",
    flex: 1,
    gap: 15,
  },
  formItem: {
    gap: 10,
  },
  switchContainer: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    width: 40,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
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
