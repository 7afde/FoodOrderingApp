import {
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { useProductList } from "@/api/products";
import { useState } from "react";

export default function MenuScreen() {
  const [refreching, setRefreching] = useState(false);
  const { data: products, error, isLoading, refetch } = useProductList();

  const onRefresh = async () => {
    setRefreching(true);
    await refetch();
    setRefreching(false);
  };

  if (isLoading) {
    return <ActivityIndicator color="#2f95dc" />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerClassName="p-2 gap-2"
      columnWrapperClassName="gap-2"
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
