import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import LoginImage from "../Images/LoginImage.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // store the argument user in AsyncStorage
        AsyncStorage.setItem("currentUser", JSON.stringify(user));
        navigation.replace("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          Alert.alert("That email is invalid.");
          setEmail("");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("That email is not registered.");
          setEmail("");
        } else if (errorCode === "auth/wrong-password") {
          Alert.alert("That password is incorrect.");
          setPassword("");
        } else if (errorCode === "auth/user-disabled") {
          Alert.alert("That user has been disabled.");
          setEmail("");
          setPassword("");
        } else if (errorCode === "auth/too-many-requests") {
          Alert.alert("Too many sign in requests. Try again later!");
          setEmail("");
          setPassword("");
        } else if (errorCode === "auth/internal-error") {
          Alert.alert("There was an internal error. Try again later!");
          setEmail("");
          setPassword("");
        }
      });
  };
  const handleRedirectToSignup = () => {
    navigation.navigate("Signup");
  };
  return (
    <View
      className={"bg-white flex flex-col items-center justify-center flex-1"}
    >
      <Image source={LoginImage} className={"h-[228px] w-[344px]"} />

      <KeyboardAvoidingView className={"mt-10"}>
        <TextInput
          value={String(email)}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          className={
            "bg-gray-50 px-4 py-2 border border-gray-200 rounded-md my-1 w-[270px]"
          }
          style={tw`shadow-sm`}
        />
        <TextInput
          value={String(password)}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Password"
          className={
            "bg-gray-50 px-4 py-2 border border-gray-200 rounded-md my-1 w-[270px]"
          }
          style={tw`shadow-sm`}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text className={"text-xs text-[#FB8282] font-bold underline"}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          className={"bg-[#FB8282] mt-5 p-2 rounded-md w-[270px]"}
        >
          <Text className={"text-lg mx-auto font-bold text-white"}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRedirectToSignup}
          className={
            "bg-white mt-1 p-2 border border-[#FB8282] rounded-md w-[270px]"
          }
        >
          <Text className={"text-lg mx-auto font-bold text-[#FB8282]"}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
