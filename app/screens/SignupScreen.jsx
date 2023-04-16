import { useNavigation } from "@react-navigation/native";
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
import LoginImage from "../assets/LoginImage.png";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleBackToLogin = () => {
    navigation.replace("Login");
  };
  const handleSignup = () => {
    setLoading(true);
    if (name.length !== 0) {
      if (
        password === confirmPassword &&
        password.length !== 0 &&
        confirmPassword.length !== 0
      ) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((authUser) => {
            // update the user's profile during createUserWithEmailAndPassword
            updateProfile(authUser.user, {
              displayName: name,
            }).then(() => {
              setDoc(doc(db, "users", authUser.user.uid), {
                name: name,
                email: email,
                uid: authUser.user.uid,
              });
              AsyncStorage.setItem(
                "currentUser",
                JSON.stringify(authUser.user)
              );
              setLoading(false);

              navigation.replace("Home");
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
              Alert.alert("The given email is already in use.");
            } else if (errorCode === "auth/invalid-email") {
              Alert.alert("THis email is invalid.");
            } else if (errorCode === "auth/missing-email") {
              Alert.alert("Please give a valid email.");
            } else if (errorCode === "auth/weak-password") {
              Alert.alert("Password is too weak.");
              setConfirmPassword("");
              setPassword("");
            } else if (errorCode === "auth/internal-error") {
              Alert.alert("There was an internal error. Try again later!");
            }
            setLoading(false);
          });
      } else {
        Alert.alert("The given passwords do not match.");
        setConfirmPassword("");
      }
    } else {
      Alert.alert("Please give yourself a name!");
    }
  };

  return (
    <View
      className={"bg-white flex flex-col items-center justify-center flex-1"}
    >
      <Spinner
        visible={loading}
        textContent={"Signing up..."}
        textStyle={{ color: "white" }}
        overlayColor={"rgba(0,0,0,0.5)"}
      />
      <Image source={LoginImage} className={"h-[228px] w-[344px]"} />

      <View className={"mt-10"}>
        <TextInput
          placeholder="Name"
          autoCapitalize="words"
          autoCorrect={false}
          value={String(name)}
          onChangeText={(text) => {
            setName(text);
          }}
          className={
            "bg-gray-50 px-4 py-2 border border-gray-200 rounded-md my-1 w-[270px]"
          }
          style={tw`shadow-sm`}
        />
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          value={String(email)}
          onChangeText={(text) => {
            setEmail(text);
          }}
          className={
            "bg-gray-50  mr-1 px-4 py-2 border border-gray-200 rounded-md my-1 "
          }
          style={tw`shadow-sm`}
        />
        <TextInput
          placeholder="Password"
          value={String(password)}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
          className={
            "bg-gray-50 px-4 py-2 border border-gray-200 rounded-md my-1 w-[270px]"
          }
          style={tw`shadow-sm`}
        />
        <TextInput
          placeholder="Confirm Password"
          value={String(confirmPassword)}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry={true}
          className={
            "bg-gray-50 px-4 py-2 border border-gray-200 rounded-md my-1 w-[270px]"
          }
          style={tw`shadow-sm`}
        />
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text className={"text-xs text-[#FB8282] font-bold underline"}>
            Back to Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          className={`bg-[#FB8282] mt-5 p-2 rounded-md w-[270px] `}
        >
          <Text className={`text-white text-lg mx-auto font-bold`}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
