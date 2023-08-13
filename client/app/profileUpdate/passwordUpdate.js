import { useContext, useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function UpdatePassword(){
    const [current, setCurrent] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [correct, setCorrect] = useState("")
    

    return(
        <View>
            <Text style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',margin: '20px',fontSize:30}}>Change password</Text>
            <View>
                <TextInput
                value={current}
                onChangeText={(text)=>setCurrent(text)}
                placeholder="Current Password"
                style={{
                    backgroundColor: "#f6f6f6",
                    margin: '10px',
                    borderRadius: 5,
                    height: 50,
                    paddingHorizontal: 10,
                    fontSize: 16,
                  }}/>
                <TextInput
                value={newPassword}
                onChangeText={(text)=>setNewPassword(text)}
                placeholder="New Password"
                style={{
                    backgroundColor: "#f6f6f6",
                    margin: '10px',
                    borderRadius: 5,
                    height: 50,
                    paddingHorizontal: 10,
                    fontSize: 16,
                  }}/>
                <TextInput
                value={correct}
                onChangeText={(text)=>setCorrect(text)}
                placeholder="Re-enter password"
                style={{
                    backgroundColor: "#f6f6f6",
                    margin: '10px',
                    borderRadius: 5,
                    height: 50,
                    paddingHorizontal: 10,
                    fontSize: 16,
                  }}/>
            </View>
            <TouchableOpacity disabled={!newPassword && !correct && !current}>
                <Text style={{backgroundColor: "#408cc9",
             borderRadius: 5,
             padding: '12px',
             height: 50,
             fontSize: 16,
             display: 'flex',
             flexDirection: 'row',
             justifyContent: 'center',
             marginLeft: '50px',
             marginTop: '50px',
             marginRight: '50px',
             color: '#ffffff'
             }}>Submit</Text>
             </TouchableOpacity>
        </View>
        
        
    )
}