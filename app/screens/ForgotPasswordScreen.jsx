import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase";
import LoginImage from "../assets/LoginImage.png";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSendEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigation.replace("Login");
        }, 5000);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/missing-email") {
          Alert.alert("Please type out your email address.");
        } else if (errorCode === "auth/invalid-email") {
          Alert.alert("Please enter a valid email address");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("This user hasn't registered.");
        } else if (errorCode === "auth/too-many-requests") {
          Alert.alert("Too many requests, Please try again later.");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("This user hasn't registered.");
        }
      });
  };
  const handleRememberPassword = () => {
    navigation.replace("Login");
  };
  return (
    <View
      className={"bg-white flex flex-col items-center justify-center flex-1"}
    >
      <Image source={LoginImage} className={"h-[228px] w-[344px]"} />

      <View className={"mt-10"}>
        <TextInput
          placeholder="Email"
          value={String(email)}
          onChangeText={(text) => setEmail(text)}
          className={
            "bg-gray-50 px-4 py-2 border border-gray-200 rounded-md my-1 w-[270px]"
          }
          style={tw`shadow-sm`}
        />
        <TouchableOpacity
          onPress={handleSendEmail}
          className={` ${
            success ? "border-2 border-emerald-400" : "bg-[#FB8282]"
          } mt-5 p-2 rounded-md w-[270px]`}
        >
          <Text
            className={`${
              success ? "text-emerald-400" : "text-white"
            } text-lg mx-auto font-bold`}
          >
            {success ? "Email sent" : "Send Email"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRememberPassword}
          className={
            "bg-white mt-1 p-3 border border-[#FB8282] rounded-md w-[270px]"
          }
        >
          <Text className={"text-md mx-auto font-bold text-[#FB8282]"}>
            Remember your password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
