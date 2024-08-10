import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList } from "react-native";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <View className="p-2">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-2 gap-2"
      />
      <Text className="mt-4 pl-4 text-xl font-psemibold">
        Total: ${total.toFixed(2)}
      </Text>
      <Button text="Checkout" />

      <StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
