import { View, Text } from "react-native";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useUserData from "../hooks/useUserData";
import { Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const signOut = () => {
    navigation.replace("Login");
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        console.log(e);
      }
    };

    clearAsyncStorage();
  };

  const currentUser = useUserData();
  return (
    <View className={"flex-1 bg-gray-100"}>
      <Header screenName={"Your Profile"} />
      <View className="flex-1 flex flex-col items-center justify-center">
        <View
          className={
            "bg-gray-50 flex flex-col justify-between shadow-lg rounded-lg border-gray-300 border h-[70vh] w-[50vh] p-10 "
          }
        >
          <View>
            <Image
              className="w-60 h-60 mt-5 rounded-full mx-auto border"
              source={{
                uri: "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
              }}
            />
            <View className={"p-5"}>
              <View className={"flex flex-row items-center space-x-2 "}>
                <Text className={"font-bold text-lg underline"}>Name:</Text>
                <Text className="text-red-500 text-lg font-bold">
                  {currentUser?.displayName}
                </Text>
              </View>
              <View className={"flex flex-row items-center space-x-2"}>
                <Text className={"font-bold text-lg underline"}>Email:</Text>
                <Text className="text-red-500 text-lg font-bold">
                  {currentUser?.email}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={tw`shadow-md`}
            className={"bg-[#ff5555] p-3 rounded-lg "}
          >
            <Text className={"text-white font-bold mx-auto text-lg"}>
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default ProfileScreen;
