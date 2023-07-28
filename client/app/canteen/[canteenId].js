import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Navbar = () => {
  const { canteenId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>ID: {canteenId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
    color: "blue",
  },
});

export default Navbar;
