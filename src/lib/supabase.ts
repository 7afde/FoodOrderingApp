import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";

function removeUserMetaData(itemValue: string) {
  let parsedItemValue = JSON.parse(itemValue);

  // Remove properties from the object
  if (parsedItemValue) {
    delete parsedItemValue.user?.identities;
    delete parsedItemValue.user?.user_metadata;
  }
  // Convert the modified object back to a JSON string
  return JSON.stringify(parsedItemValue);
}

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, removeUserMetaData(value));
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://bmsafseoxygjvfvzgvrr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtc2Fmc2VveHlnanZmdnpndnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTQ1NjgsImV4cCI6MjAzODk3MDU2OH0.q63n336HjykqwOTnofqwhcNkD2jdKSbvOQnNbpASEPQ";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
