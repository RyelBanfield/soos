import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import { supabase } from "../lib/supabase";

const PlaceholderImage = require("../../assets/icon.png");

const EditProfile = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(true);

  const [ageField, setAgeField] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [countryField, setCountryField] = useState<string | null>(null);
  const [dateField, setDateField] = useState<string | null>(null);
  const [idDpField, setIdDpField] = useState<string | null>(null);
  const [nameField, setNameField] = useState<string | null>(null);
  const [vaccineTypeField, setVaccineTypeField] = useState<string | null>(null);

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

        if (data) {
          setAgeField(data.age);
          setAvatarUrl(data.avatar_url);
          setCountryField(data.country);
          setDateField(data.date);
          setIdDpField(data.id_dp_number);
          setNameField(data.name);
          setVaccineTypeField(data.vaccine_type);
        }
      } catch (error) {
        if (error instanceof Error) Alert.alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) getProfile();
  }, [session]);

  const updateProfile = async ({
    age,
    avatar_url,
    country,
    date,
    id_dp_number,
    name,
    vaccine_type,
  }: {
    age: string;
    avatar_url: string;
    country: string;
    date: string;
    id_dp_number: string;
    name: string;
    vaccine_type: string;
  }) => {
    try {
      setLoading(true);

      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        age,
        avatar_url,
        country,
        date,
        id_dp_number,
        name,
        vaccine_type,
        updated_at: new Date() as unknown as string,
      };

      let { error } = await supabase.from("users").upsert(updates);

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async ({ avatar_url }: { avatar_url: string }) => {
    try {
      setLoading(true);

      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        avatar_url,
        updated_at: new Date() as unknown as string,
      };

      let { error } = await supabase.from("users").upsert(updates);

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex flex-grow gap-3 bg-white p-9">
      <View className="mb-3">
        <Avatar
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateAvatar({ avatar_url: avatarUrl as string });
          }}
          showUploadButton={true}
        />
      </View>

      <View>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>

      <View>
        <Input
          label="Name"
          value={nameField as string}
          onChangeText={(text: string) => setNameField(text)}
        />
      </View>

      <View>
        <Input
          label="Age"
          value={ageField as string}
          onChangeText={(text: string) => setAgeField(text)}
        />
      </View>

      <View>
        <Input
          label="ID/DP Number"
          value={idDpField as string}
          onChangeText={(text: string) => setIdDpField(text)}
        />
      </View>

      <View>
        <Input
          label="Country"
          value={countryField as string}
          onChangeText={(text: string) => setCountryField(text)}
        />
      </View>

      <View>
        <Input
          label="Vaccine Type"
          value={vaccineTypeField as string}
          onChangeText={(text: string) => setVaccineTypeField(text)}
        />
      </View>

      <View>
        <Input
          label="Date"
          value={dateField as string}
          onChangeText={(text: string) => setDateField(text)}
        />
      </View>

      {/* Vaccination Card */}
      <View className="mb-3">
        <Text className="text-center text-3xl font-semibold">
          Vaccination Card
        </Text>
        <Text className="text-center">
          Upload a picture of your vaccination card
        </Text>
      </View>

      <View className="h-32 ">
        <Image source={PlaceholderImage} className="m-auto h-40 w-40" />
      </View>

      <View className="pb-36">
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({
              age: ageField as string,
              avatar_url: avatarUrl as string,
              country: countryField as string,
              date: dateField as string,
              id_dp_number: idDpField as string,
              name: nameField as string,
              vaccine_type: vaccineTypeField as string,
            })
          }
          disabled={loading}
          loading={loading}
          radius="lg"
          raised
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;
