import { Platform } from "react-native";

import colors from "./colors.json";

export default {
  colors,
  text: {
    color: colors.darkgray,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  headerIconSize: 48,
  padding: 10,
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  noProfilePhotoUrl:
    "https://firebasestorage.googleapis.com/v0/b/marketplace-c9f19.appspot.com/o/pics%2Fimages.jpeg?alt=media&token=0ed4aa18-d1de-403a-bf27-80493da871f5",
};
