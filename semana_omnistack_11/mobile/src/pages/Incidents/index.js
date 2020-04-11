import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import ListEmpty from '../ListEmpty';

export default function Incidents() {

  const [ incidents, setIncidents ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [ refresh, setRefreshing ] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true)

    const response = await api.get('incidents', { params: { page } });
    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  async function handleRefresh() {
    setRefreshing(true)
    const response = await api.get('incidents');
    if (response.data.length <= 0) {
      setIncidents([])
      setTotal(response.headers['x-total-count'])
      setRefreshing(false)
      return;
    }
    if (response.data === incidents) {
      console.log('e igual')
      return
    }
    setIncidents(response.data)
    setRefreshing(false)
  }

  useEffect(() => {
    loadIncidents();
  }, [])
  
  return (
    <View style={styles.container} >
        <View style={styles.header} >
          <Image source={logoImg} />
          <Text style={styles.headerText} >Total de <Text style={styles.headerTextBold} >{total} casos</Text></Text>
        </View>
        
        <Text style={styles.title} >Bem Vindo</Text>
        <Text style={styles.descrriprion} >Escolha um dos casos abaixo e salve o dia de alguem!</Text>        

        <FlatList 
          data={incidents}
          onRefresh={handleRefresh}
          refreshing={refresh}
          style={styles.incidentsList}
          keyExtractor={incident => String(incident.id)}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmpty}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({ item: incident }) => (
            <View style={styles.incidents} >
              <Text style={[styles.incidentProperty, { marginTop: 0 }]} >ONG:</Text>
              <Text style={styles.incidentValue} >{incident.name}</Text>

              <Text style={styles.incidentProperty} >CASO:</Text>
              <Text style={styles.incidentValue} >{incident.description}</Text>

              <Text style={styles.incidentProperty} >VALOR:</Text>
              <Text style={styles.incidentValue} >
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
              </Text>

              <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigateToDetail(incident)} 
              >
                <Text style={styles.detailsButtonText} >Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color='#e02041' />
              </TouchableOpacity>

            </View>
          )}
        />
    </View>
  );
}
