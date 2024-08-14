import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { View, Text } from "react-native";

const profile = () => {
  return (
    <View className="p-4">
      <Button
        text="Sign Out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default profile;
