import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserData from "../hooks/useUserData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const userData = useUserData();

  return (
    <View className={"flex-1"}>
      <Button
        title="Logout"
        onPress={() => {
          auth.signOut();
          AsyncStorage.removeItem("currentUser");
          navigation.replace("Login");
        }}
      />
    </View>
  );
};

export default HomeScreen;
