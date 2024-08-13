import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { OrderStatusList } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString as string;

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: UpdateOrder } = useUpdateOrder();

  const updateStatus = (status: string) => {
    UpdateOrder({ id, updatedFields: { status } });
  };

  if (isLoading) {
    return <ActivityIndicator color="#2f95dc" />;
  }

  if (error || !order) {
    return <Text>Failed to fetch products</Text>;
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
                  onPress={() => updateStatus(status)}
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
