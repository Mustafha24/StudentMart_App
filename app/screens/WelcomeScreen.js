import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";
import routes from "../navigation/routes";

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: screen with the same name nested inside one another']);

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      blurRadius={5}
      source={require("../assets/background.png")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/icon.png")} />
        <AppText style={styles.welcomeText}>
          Student Mart
        </AppText>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        ></AppButton>
        <AppButton
          title="Register"
          color="warning"
          onPress={() => navigation.navigate(routes.REGISTER)}
        ></AppButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "100%",
    padding: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    color: "cyan",
    fontWeight: "bold",
    fontSize:40,
    marginTop:35,
    textAlign: "center",
  },
});
export default WelcomeScreen;
