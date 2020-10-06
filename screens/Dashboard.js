import React, {useState, useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';

const Dashboard = ({navigation}) => {

    const member = navigation.getParam('memberDetails');
    const membersArray = navigation.getParam('members');

    console.log(member.has_voted);
    return(
        <View>
            <View style={styles.titleContainer}>
                <View style={styles.titleHeader}>
                    <Text style={styles.nameText}>{member.first_name} {member.middle_initial} {member.last_name}</Text>
                    <Text style={styles.whiteText}>{member.email}</Text>
                    <Text style={styles.whiteText}>{member.student_number}</Text>
                </View>
            </View>
            {member.has_voted ? 
                <View style={styles.messageHolder}>
                    <Text style={styles.message} >You have already voted. View your votes? Click on the icon below</Text>
                </View> :
                <View>
                    <View style={styles.messageHolder}>
                        <Text style={styles.message}>You haven't voted yet. Click the Vote Button to vote now!</Text>
                        <Text style={styles.message}>There are already 69 JPCS members who voted already!</Text>
                    </View>
                    <View style={styles.centerAlign}>
                        <Text style={styles.buttonLabel}>Vote Now!</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=> navigation.navigate('Vote', {id: member.id, membersArray: membersArray})}>
                        <View style={styles.voteButton}>
                            <MaterialCommunityIcons name="vote-outline" size={24} color="white"/>    
                        </View>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        backgroundColor:'blue',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    titleHeader:{
        marginHorizontal:30,
        marginTop:100,
        marginBottom:70,
        fontWeight: 'bold',
    },
    messageHolder:{
        marginVertical:50
    },
    nameText:{
        fontSize:25,
        color:'white',
        marginBottom: 5
    },
    whiteText:{
        color:'white',
        textDecorationLine: 'underline'
    },
    message:{
        marginHorizontal:30,
        textDecorationLine: 'underline'
    },
    voteButton:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        borderRadius:40,
        marginHorizontal:25,
        backgroundColor:'blue',
        marginBottom:10
    },
    buttonLabel:{
        
        fontWeight:'bold',
        color:'blue',
        textDecorationLine:'underline'
    },
    centerAlign:{
        alignItems:'center'
    }
});

export default Dashboard;