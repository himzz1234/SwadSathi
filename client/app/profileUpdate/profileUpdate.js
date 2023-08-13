import { useContext, useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthContext";



export default function UpdateProfile(){
    const {user} = useContext(AuthContext)
    const [newName, setNewName] = useState("")
    return(
        <View>
            <Text style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',margin: '20px',fontSize:30}}>Edit your profile</Text>
            <View>
                <Text style={{marginLeft: '10px', fontSize: 20}}>Name:</Text>
                <TextInput
                value={newName}
                placeholder={user.name}
                onChangeText={(text)=>setNewName(text)}
                style={{
                    backgroundColor: "#f6f6f6",
                    margin: '7px',
                    borderRadius: 5,
                    height: 50,
                    paddingHorizontal: 10,
                    fontSize: 16,
                  }}/>
                <Text>Profile Image</Text>
            </View>
        </View>
        

    )
}

