import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className={"flex flex-1 items-center justify-center"}>
      <Button
        onPress={() => {
          signOut(auth);
          navigation.replace("Login");
        }}
        title={"Log out"}
      />
    </View>
  );
};

export default HomeScreen;
