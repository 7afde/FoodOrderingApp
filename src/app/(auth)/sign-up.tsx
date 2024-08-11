import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { Link, router, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    else
      Alert.alert(
        "Account created successfully",
        "Go to the sign in page to log in",
        [
          {
            text: "Ok",
            onPress: () => {
              router.push("/sign-in");
            },
          },
        ]
      );
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text className="text-gray-500 font-pregular">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        className="bg-white p-4 rounded-md mt-2 mb-4"
      />

      <Text className="text-gray-500 font-pregular">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        className="bg-white p-4 rounded-md mt-2 mb-4"
        secureTextEntry
      />

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Creating account..." : "Create account"}
      />
      <Link
        href="/sign-in"
        className="text-light-tint mt-2 text-center underline underline-thickness:1 underline-offset:2 font-psemibold"
      >
        Sign in
      </Link>
    </View>
  );
};

export default SignUpScreen;
