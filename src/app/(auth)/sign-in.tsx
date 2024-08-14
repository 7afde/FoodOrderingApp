import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Stack.Screen options={{ title: "Sign in" }} />

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
        onPress={signInWithEmail}
        disabled={loading}
        style={{
          opacity: loading ? 0.5 : 1,
        }}
        text={loading ? "Signing in..." : "Sign in"}
      />
      <Link
        href="/sign-up"
        className="text-light-tint mt-2 text-center underline underline-thickness:1 underline-offset:2 font-psemibold"
      >
        Create an account
      </Link>
    </View>
  );
};

export default SignInScreen;
