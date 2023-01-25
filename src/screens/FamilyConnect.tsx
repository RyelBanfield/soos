import { Button, Icon } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import { supabase } from "../lib/supabase";

const logo = require("../../assets/icon.png");
const familyConnectImage = require("../../assets/family-connect.png");

const FamilyConnect = ({ session }: { session: Session }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        if (!session?.user) throw new Error("No user on the session!");

        let { data, error, status } = await supabase
          .from("users")
          .select(`*`)
          .eq("id", session?.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) console.log(data);
      } catch (error) {
        if (error instanceof Error) Alert.alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) getProfile();
  }, [session]);

  return (
    <ScrollView className="flex flex-grow gap-3 bg-white p-9">
      <View className="flex flex-row items-center justify-between">
        <View className="w-1/3">
          <Button type="clear">
            <Icon name="near-me" />
          </Button>
        </View>

        <View className="w-1/3">
          <Image source={logo} className="m-auto h-32 w-32" />
        </View>

        <View className="w-1/3" />
      </View>

      <View>
        <Image source={familyConnectImage} className="m-auto" />
      </View>

      <View>
        <Text className="text-center text-[#776E6E]">Status 0/11</Text>
      </View>

      <View>
        <Text className="text-center text-xl font-semibold">
          Family Connect
        </Text>
      </View>

      <View className="mb-6 px-12">
        <Text className="text-center text-[#776E6E]">
          Allow family members to connect, share your location and medical data
          in case of an emergency.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-center text-[#776E6E]">
          View settings for more info
        </Text>
      </View>

      <View className="flex flex-col items-center gap-3">
        <View className="mb-3 w-60">
          <Button
            title="Link Account"
            size="lg"
            radius="lg"
            raised
            color="#4D85FF"
          />
        </View>

        <View className="mb-3 w-60">
          <Button title="On" size="lg" radius="lg" raised color="#4D85FF" />
        </View>
      </View>
    </ScrollView>
  );
};

export default FamilyConnect;
