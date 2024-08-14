import { Image, Text, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

type Props = {
  product: Tables<"products">;
};

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: Props) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable className="bg-white p-3 rounded-[20] flex-1 max-w-[50%]">
        <RemoteImage
          path={product.image}
          fallback={defaultImage}
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
