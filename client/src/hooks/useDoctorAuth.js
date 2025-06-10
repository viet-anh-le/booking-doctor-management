import { useEffect, useState } from "react";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${serverURL}/api/doctor/auth/me`, {
      credentials: "include", // gửi cookie lên server
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUser(data.user); // hoặc data nếu không gói trong `user`
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
