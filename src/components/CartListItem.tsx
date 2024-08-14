import { View, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";
import { defaultImage } from "./ProductListItem";
import { CartItem } from "@/types";
import RemoteImage from "./RemoteImage";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();

  return (
    <View className="bg-white rounded-lg p-2 flex-row items-center">
      <RemoteImage
        path={cartItem.product.image}
        fallback={defaultImage}
        className="w-20 aspect-square self-center mr-2"
        resizeMode="contain"
      />

      <View className="flex-1">
        <Text className="font-medium text-lg mb-1">
          {cartItem.product.name}
        </Text>
        <View className="flex-row gap-1">
          <Text className="text-blue-500 font-bold">
            ${cartItem.product.price.toFixed(2)}
          </Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>

      <View className="flex-row gap-2 items-center my-2">
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          className="p-1"
        />
        <Text className="font-medium text-xl">{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          className="p-1"
        />
      </View>
    </View>
  );
};

export default CartListItem;
