import { View, Text, Image, Pressable } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((product) => product.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
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
