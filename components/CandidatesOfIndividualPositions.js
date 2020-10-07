import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const CandidatesOfIndividualPositions = ({ position, membersList, getVote }) => {

    const scalper = (pos123, position1) => {
        const candidates = [];

        for (i = 0; i < pos123.length; i++) {
            if (pos123[i].asipiring_position === position1) {
                candidates.push(pos123[i]);
            }
        }
        return candidates;
    }

    const data = scalper(membersList, position);

    const voteToReturn = (position, idNumber) => {

        var voteToRet = {
            'position': position,
            'id_number': idNumber
        }

        return voteToRet;

    }

    return (
        <View style={styles.containerDesign}>
            <Text style={styles.titleText}>{position}</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => getVote(voteToReturn(item.asipiring_position, item.id))}>
                        <View style={styles.candidateBox}>
                            <Text style={styles.candidateText}>{item.last_name}, {item.first_name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

    )
};

const styles = StyleSheet.create({
    containerDesign: {
        flex: 1,
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10

    },
    titleText: {
        marginHorizontal: 5,
        marginBottom: 10,
        fontSize: 30
    },
    candidateText: {
        fontSize: 20
    },

    candidateBox: {
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5
    }
});

export default CandidatesOfIndividualPositions;