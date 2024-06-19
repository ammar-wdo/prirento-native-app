

import { fetcher } from "@/lib/utils";
import { CHECK, REMOVE_PUSH_TOKEN } from "@/links";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router, usePathname } from "expo-router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export type User = {
  email: string;
  logo: string;
  name:string
  token: string;
  pushToken:string | ''
};

type AuthType = {
  user: User | null;
  signin: (user:User) => void;
  signout: () => void;
  loading:boolean;
  logUserOut: () => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  signin: () => {},
  signout: () => {},
  loading:true,
  logUserOut:()=>{}
});



export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!user) return router.push('/(modals)/signin')
  },[user])

  const queryClient = useQueryClient()

  const pathname = usePathname()

 

  useEffect(() => {
    // Load the user from AsyncStorage when the app starts
  
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
       
      }
      setLoading(false)
    };

    loadUser();
    
  }, []);


  const signin = async(newUser:User)=>{
    queryClient.clear()
    setUser(newUser)
    await AsyncStorage.setItem('user', JSON.stringify(newUser))
}

const signout =async ()=>{
  console.log("the user",JSON.stringify(user))
  try {
    const res = await fetcher<{success:boolean,error?:string}>(REMOVE_PUSH_TOKEN,user?.token)
    if(!res.success){
      console.log(res.error)
    }else if(res.success) {
      console.log('push notification token removed')
      setUser(null)
    await AsyncStorage.removeItem('user')
    }
  } catch (error) {
    console.warn(error)
    Alert.alert(JSON.stringify("Something wnet wron ,Try again later"))
  }


    
}

const logUserOut = async ()=>
 { setUser(null)
  await AsyncStorage.removeItem('user')}




return (
    <AuthContext.Provider value={{ user, signin, signout ,loading,logUserOut}}>
      {children}
    </AuthContext.Provider>
  );

};


export const useAuth = ()=>{
  

  
 return  useContext(AuthContext)

}
