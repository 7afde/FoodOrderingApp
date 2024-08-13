import { InsertTables } from "./../../types";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { data: newOrderItem, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrderItem;
    },
  });
};
