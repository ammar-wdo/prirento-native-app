import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { useQueryClient } from "@tanstack/react-query";
import { poster } from "@/lib/utils";
import { ADD_PUSH_TOKEN } from "@/links";
import { useAuth } from "./auth.hook";

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>(
    undefined
  );

  const { user } = useAuth();


  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const [mount, setMount] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
console.log('user',JSON.stringify(user))
    if(!!user?.pushToken) {
      setExpoPushToken(user.pushToken)
    }
    else

  {  registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log("Token: ", token);
    });}

   




    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        queryClient.refetchQueries({ queryKey: ["notificationsCount"] });
        queryClient.refetchQueries({ queryKey: ["recentCars"] });
        queryClient.refetchQueries({ queryKey: ["recentBookings"] });
        queryClient.refetchQueries({ queryKey: ["bookingsInfo"] });
        queryClient.refetchQueries({ queryKey: ["cars"] });
        queryClient.refetchQueries({ queryKey: ["bookings"] });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

 

    //add push token after we recieve it
    useEffect(() => {
        const addPushToken = async () => {
          try {
            const res = await poster<{ success: boolean; error?: string }>(
              ADD_PUSH_TOKEN,
              { pushToken: expoPushToken },
              user?.token
            );
  
            if (!res.success) {
              console.log(res.error);
            } else {
                console.log('token added')
            }
          } catch (error) {
            console.log(error);
          }
        };
  
        if (!!expoPushToken || !user?.pushToken) {
          addPushToken();
        }
      }, [expoPushToken]);

  return <>{children}</>;
};
