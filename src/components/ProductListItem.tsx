import { View, Image, Text } from "react-native";
import { Product } from "@/types";

type Props = {
  product: Product;
};

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: Props) => {
  return (
    <View className="bg-white p-3 rounded-[20]">
      <Image
        source={{ uri: product.image || defaultImage }}
        className="w-full aspect-square"
        resizeMode="contain"
      />

      <Text className="my-2 font-psemibold">{product.name}</Text>
      <Text className="text-light-tint font-pbold">${product.price}</Text>
    </View>
  );
};

export default ProductListItem;
