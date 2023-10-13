import { Pressable, StyleSheet, View, FlatList } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../../../components/CanteenComponents/MenuItemComponent";

export default function Menu() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <MenuItem />
      </View>
      {/* <FlatList /> */}
      <Pressable
        style={{
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FF6347",
          borderRadius: 999,
          elevation: 3,
          position: "absolute",
          bottom: 30,
          right: 30,
        }}
      >
        <MaterialIcon name="add" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    paddingHorizontal: 20,
  },
});
