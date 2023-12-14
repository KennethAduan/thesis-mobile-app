import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup/index";
import Patient from "./screens/Patient Screen/index";
import Dentist from "./screens/Dentist Screen/index";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Sample from "./screens/Sample";

import "react-native-gesture-handler";
import { StatusBar } from "react-native"; // Add this line to import StatusBar
import ForgotPassword from "./screens/Forgot Password/index";

import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
function App() {
  const Stack = createNativeStackNavigator();
  StatusBar.setBackgroundColor("#CCCC"); // Replace '#fff' with your desired color
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Patient"
              component={Patient}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dentist"
              component={Dentist}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sample"
              component={Sample}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}
export default App;
