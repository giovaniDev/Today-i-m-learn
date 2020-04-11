import React from 'react';
import { View, Text } from 'react-native';
import styles from '../ListEmpty/styles';

export default function ListEmpty() {
  return (
    <View style={styles.container} >
        <Text style={styles.textError} >Não há casos registrados no momento!</Text>
    </View>
  );
}
