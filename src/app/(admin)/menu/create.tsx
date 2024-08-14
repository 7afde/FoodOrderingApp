import { View, Text, TextInput, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { defaultImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
import {
  useCreateProduct,
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const { id: idString } = useLocalSearchParams();
  const id = idString as string;
  const isUpdating = !!idString;

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      // console.log("Fetched product:", updatingProduct);
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    setLoading(true);
    if (!validateInputs()) return;

    const imagePath = await uploadImage();

    createProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          setLoading(false);
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = () => {
    setLoading(true);
    if (!validateInputs()) return;

    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          setLoading(false);
          resetFields();
          router.back();
        },
      }
    );
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

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        router.navigate("/(admin)/menu");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

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
      <Button
        onPress={onSubmit}
        disabled={loading}
        style={{
          opacity: loading ? 0.5 : 1,
        }}
        text={
          loading
            ? isUpdating
              ? "Updating..."
              : "Creating..."
            : isUpdating
            ? "Update"
            : "Create"
        }
      />
      {isUpdating && (
        <Text
          onPress={confirmDelete}
          className="text-red-500 mt-2 text-center underline underline-thickness:1 underline-offset:2 font-psemibold"
        >
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;
