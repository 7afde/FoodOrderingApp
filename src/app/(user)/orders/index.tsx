import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useState } from "react";
import { useMyOrdersList } from "@/api/orders";
import { useUpdateAllOrdersSubscription } from "@/api/orders/subscription";

export default function OrdersScreen() {
  const [refreching, setRefreching] = useState(false);
  const { data: orders, isLoading, error, refetch } = useMyOrdersList();
  useUpdateAllOrdersSubscription();

  const onRefresh = async () => {
    setRefreching(true);
    await refetch();
    setRefreching(false);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={orders}
      contentContainerClassName="gap-3 p-3"
      renderItem={({ item }) => <OrderListItem order={item} />}
      refreshControl={
        <RefreshControl
          refreshing={refreching}
          onRefresh={onRefresh}
          tintColor="#2f95dc"
        />
      }
    />
  );
}
