import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import CandidatesOfIndividualPositions from '../components/CandidatesOfIndividualPositions';

const VotingScreen = ({navigation}) => {
    
    const [positions, setPositions] = useState();
    const [header, setHeader] = useState('Ballot Penoy');
    const [votes, setVotes] = useState([]);
    const membersArray = navigation.getParam('membersArray');
    const memberID = navigation.getParam('id');
    const memberObject = navigation.getParam('memberDetails');

    useEffect(() => {
        getPositionsFromApi();
    }, []);

    const consoleLogVotes = () => {
      console.log("New Call:")
      console.log(votes);
    }

    const sendData = () => {
      fetch(`https://jpcs.herokuapp.com/api/members/${memberID}/`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ id: memberObject.id,
                            email: memberObject.email,
                         username: memberObject.username,
                         password: memberObject.password,
                     is_candidate: memberObject.is_candidate,
               asipiring_position: memberObject.asipiring_position,
                       first_name: memberObject.first_name,
                        last_name: memberObject.last_name,
                   middle_initial: memberObject.middle_initial,
                   student_number: memberObject.student_number,
                       is_Officer: memberObject.is_Officer,
                    ballot_number: memberObject.ballot_number,
                        has_voted: true
                      })
        }).catch( error => console.log(error));
    }

    const getPositionsFromApi = () => {
        return fetch('https://jpcs.herokuapp.com/api/positions/')
          .then((response) => response.json())
          .then((json) => {
            setPositions(json);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const handleName = theName => {

      if(votes.length === 0){        
        setVotes([...votes, {
          id:votes.length,
          position:theName.position,
          id_number:theName.id_number
          }]); 
      }else{
        for(i=0; i < votes.length; i++){
          if(votes[i].position === theName.position){
            const newVoteArray = [...votes]
            newVoteArray[i] = {
              id:votes.length,
              position:theName.position,
              id_number:theName.id_number
            }
            setVotes(newVoteArray);
          }
        }
      }

      console.log(votes);
      
    }

      return(
          <View style={styles.containerMargin}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {header}
              </Text>
            </View>
            <View style={{flex:1}}>
              <FlatList
                  data={positions}
                  keyExtractor={( item ) => item.position}
                  renderItem={({ item }) => (
                    <View>
                      <CandidatesOfIndividualPositions 
                        position={item.position} 
                        membersList={membersArray}
                        getVote={handleName}
                        />
                    </View>)}
                    />
            </View>
            <TouchableOpacity onPress={() => consoleLogVotes()}>
              <View style={styles.submitVotes}>
                <Text style={styles.submitVotesText}>Finalize Votes</Text>
              </View>
            </TouchableOpacity>
          </View>
            )}

const styles = StyleSheet.create({
  submitVotesText:{
    fontSize:20
  },
  submitVotes:{
    alignItems:'center',
    paddingVertical:20,
    borderWidth:1,
    borderRadius:20,
    marginVertical:10
    
  },
  containerMargin:{
    flex:1,
    marginTop:50,
    marginLeft:10,
    marginRight:5
  },
  header:{
    alignItems:'center',
    marginBottom:15
  },
  headerText:{
    fontSize:30
  }
});

export default VotingScreen;