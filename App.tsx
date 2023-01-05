import "react-native-url-polyfill/auto";

import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

import { supabase } from "./src/lib/supabase";
import AuthStack from "./src/navigation/AuthStack";
import UserStack from "./src/navigation/UserStack";

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session && session.user ? (
        <UserStack session={session} />
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default App;
