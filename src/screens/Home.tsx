import { Button, Icon } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";

import Avatar from "../components/Avatar";
import { supabase } from "../lib/supabase";

const logo = require("../../assets/icon.png");

type Props = {
  navigation: any;
  session: Session;
};

const Home = ({ navigation, session }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!session?.user) throw new Error("No user on the session!");

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, avatar_url`)
          .eq("id", session?.user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    };

    if (session) getProfile();
  }, [session]);

  return (
    <View className="flex flex-grow gap-3 bg-white p-9">
      {/* Top row with logo */}
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

      {/* Avatar */}
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
          }}
          showUploadButton={false}
        />
      </View>

      {/* Row of buttons */}
      <View className="mb-3 flex flex-row justify-center">
        <View className="mr-3">
          <Button radius="lg" raised>
            <Icon name="pin-drop" />
          </Button>
        </View>
        <View className="ml-3">
          <Button radius="lg" raised>
            <Icon name="photo-camera" />
          </Button>
        </View>
      </View>

      {/* Col of buttons */}
      <View className="mb-3">
        <Button
          title="Edit Profile"
          size="lg"
          radius="lg"
          raised
          onPress={() => navigation.navigate("Account")}
        />
      </View>

      <View className="mb-3">
        <Button title="Edit" size="lg" radius="lg" raised />
      </View>

      <View className="mb-3">
        <Button title="SOOS" size="lg" radius="lg" raised />
      </View>
    </View>
  );
};

export default Home;
