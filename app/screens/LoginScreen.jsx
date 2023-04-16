import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import LoginImage from "../assets/LoginImage.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay/lib";

const LoginScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForgotPassword = () => {
    navigation.replace("ForgotPassword");
  };
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        AsyncStorage.setItem("currentUser", JSON.stringify(user.user));
        setLoading(false);
        navigation.replace("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          Alert.alert("That email is invalid.");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("That email is not registered.");
        } else if (errorCode === "auth/wrong-password") {
          Alert.alert("That password is incorrect.");
          setPassword("");
        } else if (errorCode === "auth/user-disabled") {
          Alert.alert("That user has been disabled.");
        } else if (errorCode === "auth/too-many-requests") {
          Alert.alert("Too many sign in requests. Try again later!");
        } else if (errorCode === "auth/internal-error") {
          Alert.alert("There was an internal error. Try again later!");
        }
        setLoading(false);
      });
  };
  const handleRedirectToSignup = () => {
    navigation.replace("Signup");
  };
  return (
    <View
      className={"bg-white flex flex-col items-center justify-center flex-1"}
    >
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
      />
      <Image source={LoginImage} className={"h-[228px] w-[344px]"} />

      <View className={"mt-10"}>
        <TextInput
          value={String(email)}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
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
          autoCapitalize="none"
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
      </View>
    </View>
  );
};

export default LoginScreen;
