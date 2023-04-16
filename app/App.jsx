import React from "react";
import {
  StatusBar as AndroidStatusBarHeight,
  Platform,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import TextGuideScreen from "./screens/TextGuideScreen";
import TranslateScreen from "./screens/TranslateScreen";
import RestaurantAroundMeScreen from "./screens/RestaurantAroundMeScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <View
        style={{
          marginTop:
            Platform.OS === "android"
              ? AndroidStatusBarHeight.currentHeight
              : 0,
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"Loading"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="TextGuide" component={TextGuideScreen} />
            <Stack.Screen name="Translate" component={TranslateScreen} />
            <Stack.Screen
              name="RestaurantAroundMe"
              component={RestaurantAroundMeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
};

export default App;
