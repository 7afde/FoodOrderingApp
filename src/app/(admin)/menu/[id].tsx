import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from "@/api/products";
import { defaultImage } from "@/components/ProductListItem";
import RemoteImage from "@/components/RemoteImage";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();

  const id = idString as string;

  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator color="#2f95dc" />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
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

      <Stack.Screen options={{ title: product?.name }} />

      <RemoteImage
        path={product.image}
        fallback={defaultImage}
        className="w-full aspect-square"
        resizeMode="contain"
      />

      <Text className="font-pbold text-2xl mt-4">{product?.name}</Text>
      <Text className="font-pbold text-lg ">${product?.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
