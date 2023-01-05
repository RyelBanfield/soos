import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import React from "react";

import Account from "../screens/Account";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({ session }: { session: Session }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} key={session.user.id} session={session} />}
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
        <Stack.Screen name="Account">
          {(props) => (
            <Account {...props} key={session.user.id} session={session} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
