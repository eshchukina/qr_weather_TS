import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../HomeScreen";
import WeatherScreen from "../WeatherScreen";

import styles from "./styles";

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTintColor: "#bb7b85",
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Page" }}
        />
        <Stack.Screen
          name="WeatherScreen"
          component={WeatherScreen}
          options={{ title: "Weather" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
