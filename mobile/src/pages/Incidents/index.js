import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";

import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent
} from "react-native";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }
  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get("incidents", { params: { page } });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);

    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total}</Text> casos.
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentsList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text syle={styles.incidentProperty}>ONG:</Text>
            <Text syle={styles.incidentValue}>{incident.name}</Text>
            <Text syle={styles.incidentProperty}>CASO:</Text>
            <Text syle={styles.incidentValue}>{incident.title}</Text>
            <Text syle={styles.incidentProperty}>VALOR:</Text>
            <Text syle={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
              <Feather name="arrow-right" size={16} color="#ea2041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
