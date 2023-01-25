import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import React from "react";

import EditProfile from "../screens/EditProfile";
import FamilyConnect from "../screens/FamilyConnect";
import Home from "../screens/Home";
import ScanScreen from "../screens/Scan";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeScreen = ({ session }: { session: Session }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} key={session.user.id} session={session} />}
      </Tab.Screen>
      <Tab.Screen name="Scan" options={{ headerShown: true }}>
        {(props) => (
          <ScanScreen {...props} key={session.user.id} session={session} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Family Connect" options={{ headerShown: true }}>
        {(props) => (
          <FamilyConnect {...props} key={session.user.id} session={session} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Settings" options={{ headerShown: true }}>
        {(props) => (
          <Settings {...props} key={session.user.id} session={session} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const UserStack = ({ session }: { session: Session }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen {...props} key={session.user.id} session={session} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Edit Profile">
          {(props) => (
            <EditProfile {...props} key={session.user.id} session={session} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
