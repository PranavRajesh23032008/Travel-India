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
import LoginImage from "../Images/LoginImage.png";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleBackToLogin = () => {
    navigation.replace("Login");
  };
  const handleSignup = () => {
    if (name.length !== 0) {
      if (
        password === confirmPassword &&
        password.length !== 0 &&
        confirmPassword.length !== 0
      ) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((authUser) => {
            setDoc(doc(db, "users", authUser.user.uid), {
              name: name,
              email: email,
              password: password,
              uid: authUser.user.uid,
            });
            updateProfile(authUser.user, {
              displayName: name,
            });
            navigation.replace("Home");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/email-already-in-use") {
              Alert.alert("The given email is already in use.");
              setEmail("");
            } else if (errorCode === "auth/invalid-email") {
              Alert.alert("THis email is invalid.");
              setEmail("");
            } else if (errorCode === "auth/missing-email") {
              Alert.alert("Please give a valid email.");
              setEmail("");
            } else if (errorCode === "auth/weak-password") {
              Alert.alert("Password is too weak.");
              setConfirmPassword("");
              setPassword("");
            } else {
              Alert.alert(errorMessage);
              setEmail("");
              setTag("");
              setConfirmPassword("");
              setPassword("");
            }
            console.log(errorCode);
          });
      } else {
        Alert.alert("The given passwords do not match.");
        setConfirmPassword("");
        setPassword("");
      }
    } else {
      Alert.alert("Please give yourself a name!");
    }
  };

  return (
    <View
      className={"bg-white flex flex-col items-center justify-center flex-1"}
    >
      <Image source={LoginImage} className={"h-[228px] w-[344px]"} />

      <View className={"mt-10"}>
        <TextInput
          placeholder="Name"
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
          placeholder="Email"
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
