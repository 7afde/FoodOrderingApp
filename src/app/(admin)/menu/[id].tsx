import { View, Text, Image, Pressable } from "react-native";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";

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
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color="#2f95dc"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image }}
        className="w-full aspect-square"
        resizeMode="contain"
      />

      <Text className="font-pbold text-2xl mt-4">{product.name}</Text>
      <Text className="font-pbold text-lg ">${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
