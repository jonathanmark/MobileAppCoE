import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import CandidatesOfIndividualPositions from '../components/CandidatesOfIndividualPositions';
import PositionsToVoteToPanel from '../components/PositionsToVoteToPanel';


const VotingScreen = ({navigation}) => {
    
    const [positions, setPositions] = useState();
    const membersArray = navigation.getParam('membersArray');

    useEffect(() => {
      getPositionsFromApi();
    }, []);

    const getPositionsFromApi = () => {
        return fetch('https://jpcs.herokuapp.com/api/positions/')
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setPositions(json);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      return(
          <View style={styles.containerMargin}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Ballot
              </Text>
            </View>
            <View style={{flex:1}}>
              <FlatList
                  data={positions}
                  keyExtractor={( item ) => item.id}
                  renderItem={({ item }) => (
                    <View>
                      <CandidatesOfIndividualPositions position={item.position} membersList={membersArray}/>
                    </View>)}
                    />
            </View>
            
          </View>
            )}

const styles = StyleSheet.create({
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