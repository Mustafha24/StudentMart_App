import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import defaults from "../config/styles";

// Map of category id to image source
const categoryImages = {
  "664575a64e19ca2ff432ec5e": require("../assets/categories/brush.png"),
  "664575c44e19ca2ff432ec5f": require("../assets/categories/bookback.png"),
  "664576304e19ca2ff432ec60": require("../assets/categories/firecamp.png"),
  "664576404e19ca2ff432ec61": require("../assets/categories/apple.png"),
  "664576464e19ca2ff432ec62": require("../assets/categories/modernjoystick.png"),
  "664576534e19ca2ff432ec63": require("../assets/categories/bankcard.png"),
  "664576634e19ca2ff432ec64": require("../assets/categories/heartrate.png"),
  "664576784e19ca2ff432ec65": require("../assets/categories/toothcircle.png"),
  "6645767e4e19ca2ff432ec66": require("../assets/categories/filmrecord.png"),
  "664576994e19ca2ff432ec67": require("../assets/categories/forest.png"),
  "664576a04e19ca2ff432ec68": require("../assets/categories/dog.png"),
  "664576ad4e19ca2ff432ec69": require("../assets/categories/picture.png"),
  "664576b84e19ca2ff432ec6a": require("../assets/categories/basketball.png"),
  "664576c24e19ca2ff432ec6b": require("../assets/categories/oldpc.png"),
  "664576c84e19ca2ff432ec6c": require("../assets/categories/Plane2.png"),
};

const CategoryItem = ({ item, style, onPress = null }) => {
  const categorySource = categoryImages[item._id]; // Get the source of the category

  return (
    <TouchableOpacity onPress={onPress} style={[styles.categoryItem, style]}>
      <Image
        resizeMode="contain"
        source={categorySource} // Use the hardcoded source of the category
        style={styles.image}
      />
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    padding: 10,
    margin: 5,
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    ...defaults.shadow,
  },
  image: {
    width: "100%",
    height: 50,
    marginBottom: 5,
  },
});

export default CategoryItem;
