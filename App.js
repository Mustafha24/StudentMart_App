import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen  from "expo-splash-screen"; // Import SplashScreen
import Banner from "./app/components/Banner";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import useConnected from "./app/hooks/useConnected";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);


export default function App() {
  const connected = useConnected();
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  // const restoreUser = async () => {
  //   const user = await authStorage.getUser();
  //   if (!user) return;
  //   setUser(user);
  // };

  // useEffect(() => {
  //   restoreUser();
  // }, []);

  // useEffect(() => {
  //   SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding
  //   if (isReady) {
  //     SplashScreen.hideAsync(); // Hide the splash screen once the app is ready
  //   }
  // }, [isReady]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Banner visible={!connected} message="No Internet Connection" />
      <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
