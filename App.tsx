import "react-native-url-polyfill/auto";

import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import Account from "./components/Account";
import Auth from "./components/Auth";
import { supabase } from "./lib/supabase";

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  );
};

export default App;
