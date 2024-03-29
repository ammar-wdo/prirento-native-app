

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type User = {
  email: string;
  logo: string;
  name:string
  token: string;
};

type AuthType = {
  user: User | null;
  signin: (user:User) => void;
  signout: () => void;
  loading:boolean
};

const AuthContext = createContext<AuthType>({
  user: null,
  signin: () => {},
  signout: () => {},
  loading:true
});



export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!user) return router.push('/(modals)/signin')
  },[user])

  const queryClient = useQueryClient()

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
 
    setUser(null)
    await AsyncStorage.removeItem('user')
}



return (
    <AuthContext.Provider value={{ user, signin, signout ,loading}}>
      {children}
    </AuthContext.Provider>
  );

};


export const useAuth = ()=>{
  

  
 return  useContext(AuthContext)

}
