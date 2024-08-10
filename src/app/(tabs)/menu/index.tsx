import { Text, View, FlatList } from "react-native";
import ProductListItem from "@components/ProductListItem";

import products from "@assets/data/products";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerClassName="p-2 gap-2"
      columnWrapperClassName="gap-2"
    />
  );
}
