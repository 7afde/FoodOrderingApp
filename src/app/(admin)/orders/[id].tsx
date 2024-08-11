import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { OrderStatusList } from "@/types";
import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Pressable } from "react-native";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    <Text>Order not found</Text>;
  }

  return (
    <View className="flex-1 p-3 gap-5">
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerClassName="gap-3"
        ListHeaderComponent={order && <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text className="font-pmedium">Status</Text>
            <View className="flex-row gap-1">
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  className={`border border-blue-500 p-2 rounded-md my-2 ${
                    order?.status === status ? "bg-blue-500" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`font-pregular ${
                      order?.status === status ? "text-white" : "text-blue-500"
                    }`}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetailsScreen;
