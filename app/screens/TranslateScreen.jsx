import React, {  useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import tw from "tailwind-react-native-classnames";
import options from "../JSON/languages";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import useUserData from "../hooks/useUserData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons/build/Icons";
import { Audio } from "expo-av";
import { Menu } from "react-native-paper";
import {
  GOOGLE_API_KEY
} from "@env";

const TranslateScreen = () => {
  const [originalText, setOriginalText] = useState("");
  const [translatedTexts, setTranslatedTexts] = useState(null);
  const userData = useUserData();
  const [selectedOption, setSelectedOption] = useState({
    name: "Hindi",
    code: "hi",
  });
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const recite = async (text, languageCode) => {
    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode },
            audioConfig: { audioEncoding: "MP3" },
          }),
        }
      );

      const { audioContent } = await response.json();
      const base64Audio = `data:audio/mpeg;base64,${audioContent}`;

        const soundObject = new Audio.Sound()

      const playSound = async () => {
        await Audio.Sound.createAsync(
          { uri: base64Audio },
          { shouldPlay: true }
        );
        await soundObject.playAsync();
      };
        playSound();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectOption = (option) => {
    Keyboard.dismiss();
    setSelectedOption(option);
    closeMenu();
  };

  const submit = async () => {
    Keyboard.dismiss();
    setDoc(doc(db, "translator", userData?.uid), {
      userId: userData?.uid,
      originalText,
      translatedTexts: {},
    })
      const docRef = doc(db, "translator", userData?.uid);
      onSnapshot(docRef, (doc) => {
        console.log('Document data:', doc.data());
        setTranslatedTexts(doc.data().translatedTexts);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} className="">
      <View className="flex-1">
        <View className={"flex-1 h-screen"}>
          <Header screenName="Translator" />
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View className="h-screen">
              <View className="flex-[0.5] bg-white border-red-400 ">
                <Text
                  style={tw`text-red-400 font-bold text-lg text-center border-2 bg-white border-red-400 flex flex-row items-center justify-between p-5`}
                >
                  ENGLISH
                </Text>

                <TextInput
                  maxLength={500}
                  placeholderTextColor={"#C9C9C9"}
                  className="p-5 flex-1"
                  textAlignVertical="top"
                  textAlign="left"
                  multiline
                  placeholder="Type something here..."
                  numberOfLines={4}
                  value={originalText}
                  onChangeText={(text) => setOriginalText(text)}
                />
                <Text
                  className={`${
                    originalText.length > 490
                      ? "text-red-500 font-semibold"
                      : "text-gray-400"
                  } mx-5 my-1  ml-auto`}
                >
                  {originalText.length}/500
                </Text>
                <TouchableOpacity
                  disabled={originalText.length === 0}
                  className={`${
                    originalText.length === 0 ? "bg-[#C9C9C9]" : "bg-red-400"
                  } rounded-lg  m-3 p-3`}
                  onPress={submit}
                >
                  <Text className="text-center text-white font-bold text-lg">
                    Translate
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-[0.5]  bg-white border-red-400 ">
                <View className="relative">
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    style={[
                      {
                        width: "96%",
                      },
                      tw`mt-20`,
                    ]}
                    anchor={
                      <TouchableOpacity
                        style={tw`border-2 bg-white border-red-400 flex flex-row items-center justify-between p-5`}
                        onPress={openMenu}
                      >
                        <View />
                        <Text className={"text-red-400 text-xl font-bold"}>
                          {selectedOption.name}
                        </Text>
                        <Text className={"text-red-400"}>
                          {visible ? "▲" : "▼"}
                        </Text>
                      </TouchableOpacity>
                    }
                  >
                    {options.map((option) => (
                      <Menu.Item
                        key={option.code}
                        onPress={() => handleSelectOption(option)}
                        title={option.name}
                        length={100}
                      />
                    ))}
                  </Menu>
                </View>
                <View className="flex flex-row items-start justify-between">
                  <Text
                    className={`p-5 flex-1  ${
                      !translatedTexts ? "text-[#C9C9C9]" : "text-black"
                    }`}
                  >
                    {!translatedTexts
                      ? "Translated text will appear here..."
                      : translatedTexts[selectedOption.code]}
                  </Text>
                  {selectedOption.code === "or" ||
                  selectedOption.code === "as" ||
                  selectedOption.code === "sd" ? (
                    <TouchableOpacity disabled={true} className="p-5 ml-auto">
                      <MaterialIcons name="volume-off" size={24} color="red" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={!translatedTexts}
                      onPress={() =>
                        recite(
                          translatedTexts[selectedOption.code],
                          `${selectedOption.code}-IN`
                        )
                      }
                      className="p-5 ml-auto"
                    >
                      <MaterialIcons
                        name="volume-up"
                        size={24}
                        color="rgba(0, 0, 0, 0.5)"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <Footer />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TranslateScreen;
