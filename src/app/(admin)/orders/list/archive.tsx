import { FlatList } from "react-native";
import orders from "@assets/data/orders";
import { Stack } from "expo-router";
import OrderListItem from "@/components/OrderListItem";

export default function OrdersScreen() {
  return (
    <>
      <FlatList
        data={orders}
        contentContainerClassName="gap-3 p-3"
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
