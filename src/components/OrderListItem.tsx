import { View, Text, StyleSheet, Pressable } from "react-native";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/database.types";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<"orders">;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable className="bg-white p-3 rounded-[10] flex-row justify-between items-center">
        <View>
          <Text className="font-psemibold my-1">Order #{order.id}</Text>
          <Text className="text-gray-500">
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <Text className="font-pregular">{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;
