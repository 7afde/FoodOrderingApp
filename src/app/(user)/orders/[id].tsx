import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    <Text>Order not found</Text>;
  }

  return (
    <View className="flex-1 p-3 gap-5">
      <Stack.Screen options={{ title: `Order #${id}` }} />

      {order && <OrderListItem order={order} />}

      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerClassName="gap-3"
      />
    </View>
  );
};

export default OrderDetailsScreen;
