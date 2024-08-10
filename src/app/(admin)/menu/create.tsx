import { View, Text, TextInput, Image } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { defaultImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [errors, setErrors] = useState("");

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInputs = () => {
    setErrors("");
    if (!name && !price) {
      setErrors("Name and Price are required");
      return false;
    }
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInputs()) return;

    console.warn("Create product", name, price);

    resetFields();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Stack.Screen options={{ title: "Create Product" }} />

      <Image
        source={{ uri: image || defaultImage }}
        className="w-[60%] aspect-square self-center"
      />
      <Text
        onPress={pickImage}
        className="font-pbold text-light-tint text-center my-2"
      >
        Select image
      </Text>

      <Text className="text-gray-500 font-pregular">Name</Text>
      <TextInput
        placeholder="Name"
        className="bg-white p-4 rounded-md mt-2 mb-4"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-gray-500 font-pregular">Price ($)</Text>
      <TextInput
        placeholder="9.99"
        className="bg-white p-4 rounded-md mt-2 mb-4"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text className="text-red-500 font-pregular">{errors}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

export default CreateProductScreen;
