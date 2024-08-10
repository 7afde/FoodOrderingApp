import { Image, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Product } from "@/types";

type Props = {
  product: Product;
};

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: Props) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable className="bg-white p-3 rounded-[20] flex-1 max-w-[50%]">
        <Image
          source={{ uri: product.image || defaultImage }}
          className="w-full aspect-square"
          resizeMode="contain"
        />

        <Text className="my-2 font-psemibold">{product.name}</Text>
        <Text className="text-light-tint font-pbold">${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;
