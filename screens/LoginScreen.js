import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const LoginScreen = ({navigation}) => {

    const [members,setMembers] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

    const checkCredentials = () =>{

        const noUsernameMatch = true;
        console.log('1');
        for(i=0;i < members.length; i++){

            if(members[i].email === username){
                const memberNumber = i;
                console.log('2');
                if(members[memberNumber].password === password){
                    console.log('3');
                    usernameMatch = false;
                    navigation.navigate("MemberDashboard", {memberDetails: members[memberNumber], members: members});
                    break;
                }else{
                    console.log('4');
                    usernameMatch = true;
                    wrongPasswordAlert();
                    break;
                }

            }

            if(members.length - 1 === i && noUsernameMatch){
                console.log('5');
                noSuchAccount();
                break;
            }

        }
    }

    const wrongPasswordAlert = () =>
    Alert.alert(
      "Incorrect password",
      "Please input password again",
      [
        { text: "Close", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    const noSuchAccount = () =>
    Alert.alert(
      "No account associated with e-mail",
      "Please check e-mail spelling. If you have no account yet, contact JPCS secretary",
      [
        { text: "Close", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    const getMembersFromApi = () => {
        return fetch('https://jpcs.herokuapp.com/api/members/')
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setMembers(json);
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      };


    useEffect(() => {
         setMembers(getMembersFromApi());
    }, []);  


    return(
        <View >
            <Text style={styles.textTitle}>Welcome to the JPCS Voting Application</Text>
            <View style={styles.backgroundStyle}>
                <AntDesign  style={styles.iconStyle} name="user" size={24} color="black" />
                <TextInput
                    placeholder="e-mail"
                    autoCapitalize='none'
                    onChangeText={(newValue) => {setUsername(newValue)}}
                />
            </View>
            <View style={styles.backgroundStyle}>
                <AntDesign style={styles.iconStyle} name="key" size={24} color="black" />
                <TextInput
                    placeholder="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(newValue) => {setPassword(newValue)}}
                />
            </View>
            <TouchableOpacity onPress={()=>{checkCredentials()}} >
                <View style={styles.loginButton}>
                    <Text style={styles.textLogin}>Login</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.noAccountNotif}>No account yet? Contact JPCS Mapua Secretary.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle:{
        marginTop:10,
        flexDirection:'row',
        height: 50,
        borderRadius:5,
        marginHorizontal:25,
        backgroundColor:'#CFCFCF',
        marginBottom:10
    },
    loginButton:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        borderRadius:40,
        marginHorizontal:25,
        backgroundColor:'#CFCFCF',
        marginBottom:10
    },
    textLogin:{
        textAlign:'center'
    },

    iconStyle:{
        fontSize:30,
        alignSelf:'center',
        marginHorizontal:10
    },
    wrapper:{
        marginHorizontal: 10
    },
    textTitle:{
        fontWeight:'bold',
        fontSize: 30,
        marginHorizontal:25,
        marginTop:100,
        marginBottom:25
    },
    noAccountNotif:{
        marginTop:10,
        marginHorizontal: 25,
        textDecorationLine: 'underline',
    }
});

export default LoginScreen;