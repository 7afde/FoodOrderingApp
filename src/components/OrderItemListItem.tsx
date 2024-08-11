import { View, Text, StyleSheet, Image } from "react-native";
import { OrderItem } from "@/types";
import { defaultImage } from "./ProductListItem";

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View className="bg-white rounded-[10] p-3 flex-1 flex-row items-center">
      <Image
        source={{ uri: item.products.image || defaultImage }}
        className="w-20 aspect-square self-center mr-3"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className="font-psemibold text-lg mb-1">
          {item.products.name}
        </Text>
        <View className="flex-row gap-2">
          <Text className="font-pbold text-light-tint">
            ${item.products.price.toFixed(2)}
          </Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>
      <View className="flex-row gap-3 items-center my-3">
        <Text className="font-psemibold text-2xl pr-3">{item.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;
