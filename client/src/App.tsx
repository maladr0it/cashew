import { useEffect, useState } from "react";
import { login, User } from "./services/auth";

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const payload = await login();
      if (payload instanceof Error) {
        console.log(payload);
      } else {
        setUser(payload);
      }
    })();
  }, []);

  return (
    <main>
      <h1>App</h1>
      {user ? user.username : "NO_USER"}
    </main>
  );
};
