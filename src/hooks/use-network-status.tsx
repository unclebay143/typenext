import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setOnline(navigator.onLine);
    };

    updateNetworkStatus(); // Manually call on mount
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return { isOnline };
};
