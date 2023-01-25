import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";

import { supabase } from "../lib/supabase";

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
      <Text>Family Connect</Text>
    </ScrollView>
  );
};

export default FamilyConnect;
