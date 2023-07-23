import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Navbar = () => {
  const { canteenId } = useLocalSearchParams();

  return (
    <View style={styles.navbar}>
      <Text style={{ color: "black" }}>ID: {canteenId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
  },
});

export default Navbar;
