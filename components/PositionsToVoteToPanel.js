import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import CandidatesOfIndividualpositions from './CandidatesOfIndividualPositions';


const PositionsToVoteToPanel = () => {
    return (
        <TouchableOpacity>
            <View>
                <Text>
                    Abstain Vote
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({});

export default PositionsToVoteToPanel;