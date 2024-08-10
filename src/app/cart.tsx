import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList } from "react-native";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-2 gap-2"
      />

      <StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
