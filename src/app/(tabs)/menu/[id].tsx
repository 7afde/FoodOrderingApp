import { View, Text, Image, Pressable } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import products from "@assets/data/products";
import Button from "@/components/Button";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((product) => product.id.toString() === id);

  const addToCart = () => {
    console.warn(`Added ${selectedSize} ${product?.name} to cart`);
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View className="bg-white flex-1 p-[10]">
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image }}
        className="w-full aspect-square"
        resizeMode="contain"
      />

      <Text>Select size</Text>
      <View className="flex-row justify-around my-3">
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            className={`${
              selectedSize === size ? "bg-gray-200" : ""
            } w-[50] aspect-square rounded-full items-center justify-center`}
            key={size}
          >
            <Text
              className={`${
                selectedSize === size ? "text-black" : "text-gray-400"
              } text-lg font-psemibold`}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="font-pbold text-lg mt-auto">${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

export default ProductDetailsScreen;
