import React, { useContext, useState } from "react";
import {
  View,
  Text,
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

export default function AddItemComponenent({ setCanteenMenu }) {
  const { auth: canteen } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { dismissAll } = useBottomSheetModal();
  const [itemData, setItemData] = useState({
    name: "",
    image: "",
    price: "",
    isAvailable: true,
  });

  const { uploadedImage, isLoading } = useUpload(itemData.image);

  const addItem = async () => {
    if ((itemData.name, itemData.price)) {
      const res = await axios.post("/auth/canteen/item", {
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

      dismissAll();
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
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Item</Text>
      <View>
        <Text style={styles.label}>Image</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            {!uploadedImage ? (
              <MaterialCommunityIcon
                name="food-variant"
                size={40}
                color="gray"
              />
            ) : (
              <Image source={{ uri: uploadedImage }} style={styles.image} />
            )}
          </View>
          <View style={styles.uploadContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            <View style={styles.uploadInfo}>
              <Text style={styles.uploadInfoText}>
                At least 800x800 px recommended.
              </Text>
              <Text style={styles.uploadInfoText}>JPG or PNG is allowed</Text>
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
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <View style={[styles.formItem, { flex: 1 }]}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="Enter Item Price"
              value={itemData.price}
              style={styles.inputContainer}
              onChangeText={(e) => setItemData({ ...itemData, price: e })}
            />
          </View>

          <View style={[styles.switchContainer, { flex: 0.5 }]}>
            <Text style={{ fontWeight: "500" }}>Available</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#cfe1b9" }}
              thumbColor={isEnabled ? "#355e4c" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={["#2e7653", "#355e4c"]}
        disabled={isLoading}
        style={[styles.button, styles.saveButton]}
      >
        <TouchableOpacity onPress={addItem}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
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
    height: "100%",
    borderRadius: 999,
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
    gap: 2,
  },
  switch: {
    width: 35,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    borderWidth: 2,
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
