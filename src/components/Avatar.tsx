import { Avatar, Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";

import { supabase } from "../lib/supabase";

const avatarPlaceholder = require("../../assets/avatar.png");

type Props = {
  url: string | null;
  onUpload: (filePath: string) => void;
  showUploadButton: boolean;
};

const AvatarComponent = ({ url, onUpload, showUploadButton }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      const downloadImage = async (path: string) => {
        try {
          const { data, error } = await supabase.storage
            .from("avatars")
            .download(path);

          if (error) throw error;

          const fr = new FileReader();

          fr.readAsDataURL(data);
          fr.onload = () => setAvatarUrl(fr.result as string);
        } catch (error) {
          if (error instanceof Error) {
            console.log("Error downloading image: ", error.message);
          }
        }
      };

      downloadImage(url);
    }
  }, [url]);

  const uploadAvatar = async () => {
    try {
      setUploading(true);

      const file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (file.canceled) return;

      const photo = {
        uri: file.assets[0].uri,
        type: "image/jpeg",
        name: "avatar.jpg",
      };

      const formData = new FormData();
      formData.append("file", photo as any);

      const fileExt = file.assets[0].uri.split(".").pop();
      const filePath = `avatar-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, formData);

      if (error) throw error;

      onUpload(filePath);
    } catch (error: any) {
      console.log("Error uploading avatar: ", error.message);
      Alert.alert("Error", "There was an error uploading your avatar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {avatarUrl ? (
        <View className="mx-auto mb-9">
          <Avatar source={{ uri: avatarUrl }} size={200} rounded />
        </View>
      ) : (
        <View className="mx-auto mb-9">
          <Image source={avatarPlaceholder} className="m-auto h-40 w-40" />
        </View>
      )}

      {showUploadButton && (
        <View>
          <Button
            title={"Upload Avatar"}
            onPress={uploadAvatar}
            disabled={uploading}
            loading={uploading}
            radius="lg"
            raised
          />
        </View>
      )}
    </>
  );
};

export default AvatarComponent;
