import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import GetStartedScreen from "./screens/GetStartedScreen";
import ParkingHeatmap from "./screens/ParkingHeatmap";
import PredictionChat from "./screens/PredictionChat.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ParkingHeatmap"
          component={ParkingHeatmap}
          options={{ headerShown: true, title: "Parking Heatmap" }}
        />
        <Stack.Screen
          name="PredictionChat"
          component={PredictionChat}
          options={{ headerShown: true, title: "Prediction Chat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
