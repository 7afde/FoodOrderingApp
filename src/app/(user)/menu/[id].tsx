import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { useProduct } from "@/api/products";
import { defaultImage } from "@/components/ProductListItem";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString as string;

  const { data: product, error, isLoading, refetch } = useProduct(id);

  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator color="#2f95dc" />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <View className="bg-white flex-1 p-[10]">
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image || defaultImage }}
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
