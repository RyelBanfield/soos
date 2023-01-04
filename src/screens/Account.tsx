import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import Avatar from "../components/Avatar";
import { supabase } from "../lib/supabase";

const Account = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
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
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (session) getProfile();
  }, [session]);

  const updateProfile = async ({
    username,
    avatar_url,
  }: {
    username: string;
    avatar_url: string;
  }) => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="gap-3 p-9 pt-24">
      <View className="mb-6">
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url });
          }}
        />
      </View>

      <View>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>

      <View>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
          disabled={loading}
          loading={loading}
          radius="lg"
          raised
        />
      </View>

      <View>
        <Button
          title="Sign Out"
          onPress={() => supabase.auth.signOut()}
          radius="lg"
          raised
        />
      </View>
    </View>
  );
};

export default Account;
