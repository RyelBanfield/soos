import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, Image, View } from "react-native";

import { supabase } from "../lib/supabase";

const logo = require("../../assets/icon.png");

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View className="p-9 gap-3">
      <View className="w-full">
        <Image source={logo} className="m-auto w-32 h-32" />
      </View>

      <View>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />
      </View>

      <View>
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>

      <View>
        <Button
          title="Sign in"
          onPress={() => signInWithEmail()}
          disabled={loading}
          loading={loading}
          radius="lg"
          raised
        />
      </View>

      <View>
        <Button
          title="Sign up"
          onPress={() => signUpWithEmail()}
          disabled={loading}
          loading={loading}
          radius="lg"
          raised
        />
      </View>
    </View>
  );
};

export default Auth;
