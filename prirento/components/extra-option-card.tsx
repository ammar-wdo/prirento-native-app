import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ExtraOption } from '@/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { remover } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/auth.hook'
import { DELETE_CAR_EXTRA_OPTION } from '@/links'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

type Props = {
    el:ExtraOption,
    carId:string,
    setOpen:()=>void
    setExtraOptionModal:(el:ExtraOption)=>void
}
const ExtraOptionCard = ({el,carId,setExtraOptionModal,setOpen}:Props) => {
    const router = useRouter()

    const [isLoadingDelete, setIsLoadingDelete] = useState("");

    const queryClient = useQueryClient();

    const {user,logUserOut} = useAuth()

  const handleDelete = async (extraOptionId: string, carId: string) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setIsLoadingDelete(extraOptionId);
              const res = await remover<{
                success: boolean;
                error?: string;
                message?: string;
                logout?:boolean
              }>(DELETE_CAR_EXTRA_OPTION(carId, extraOptionId), user?.token);
              if (res.success) {
                queryClient.refetchQueries({
                  queryKey: ["extraOptions", carId],
                });
            
                Alert.alert("Successfully Deleted");
              }
              
              else if (!res.success && res.logout) return logUserOut()
              
              else if (!res.success) {
                Alert.alert(res.error!);
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Something went wrong");
            } finally {
              setIsLoadingDelete("");
            }
          },
        },
      ],
      { cancelable: false } // This ensures the alert is not dismissable by tapping outside of it
    );
  };
  return (
    <View

    style={{
      borderWidth: 0.7,
      borderColor: Colors.border2,
      borderRadius: 5,
      padding: 8,
      marginBottom: 12,

    }}
  >
    <Image
      source={{ uri: el.logo }}
      style={{ width: "100%", aspectRatio: 2 / 1, borderRadius: 5 }}
      resizeMode="cover"
    />
    <View style={{flexDirection:'row',flex:1,marginTop:12,gap:12,alignItems:'flex-end'}}>
        <View>
        <Text style={{ textTransform: "capitalize", fontWeight: "700" ,fontSize:15}}>
        {el.label}
      </Text>
     
      <Text style={{ color: "gray", textTransform: "capitalize" }}>
        <Text style={{ textTransform: "uppercase" }}>AED</Text>{" "}
        {el.price.toFixed(2)}
      </Text>
        </View>
     <View style={el.status==='active' ? styles.active : styles.pending}>
     <Text style={{textTransform: "capitalize" ,color:'white',fontSize:10}}>
        {el.status}
      </Text>
     </View>
    <View style={{gap:3,flex:1}}>
    <TouchableOpacity
        style={{
         width:'100%',
          backgroundColor: Colors.secondaryGreen,
          borderRadius: 5,
          padding: 6,
          flex:1,
          gap: 12,
          flexDirection:'row',
          justifyContent:'center'
        }}
        onPress={() => {
setExtraOptionModal(el)
setOpen()

        }}
      >
         <FontAwesome name='edit' color={'white'}  size={16} />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
           Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
              disabled={isLoadingDelete === el.id}
                onPress={() => handleDelete(el.id, carId)}
                style={{
                  backgroundColor: "red",
                  marginTop: 4,
                  opacity:isLoadingDelete === el.id ? 0.5 : 1,

                  padding: 6,
                  borderRadius: 5,
                
                  gap: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isLoadingDelete === el.id ? (
                  <ActivityIndicator color={"white"} size={"small"} />
                ) : (
                  <View style={{  flexDirection: "row",   justifyContent: "center",
                  alignItems: "center",gap: 12,}}>
                    <Ionicons name="trash" size={16} color={"white"} />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
    </View>
      
    </View>
  </View>
  )
}

export default ExtraOptionCard

const styles = StyleSheet.create({
    active:{
      backgroundColor:Colors.secondaryGreen,
      color:'white',
      paddingVertical:3,
      paddingHorizontal:12,
      borderRadius:100,
      
    },
    pending:{
      backgroundColor:'orange',
      color:'white',
      paddingVertical:3,
      paddingHorizontal:12,
      borderRadius:100,
 
    }
  });