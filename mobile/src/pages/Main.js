import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
// por ser uma exportação padrão não irei colocar entre chaaves
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      //é se deu ou não permissaõ para usar a localização
      const { granted } = await requestPermissionsAsync(); // requestPermissionsAsync retorna um objeto com varias informações sobre a permissão do usuario

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);
  console.log(currentRegion);
  if (!currentRegion) {
    return null;
  }
  // a primeira chave {} é para declarar que é js e o segundo para objeto
  return (
    <>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -3.8230427, longitude: -38.4851971 }}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                "https://avatars0.githubusercontent.com/u/54129629?s=460&u=42ea00562ad912f2ab6a4f3c9f0fb42527319009&v=4"
            }}
          />

          <Callout
            onPress={() => {
              navigation.navigate("Profile", {
                gitHub_username: "lopessoftec"
              });
            }}
          >
            <View style={styles.callout}>
              <Text style={styles.devName}>Ytalo Lopes</Text>
              <Text style={styles.devBio}>
                CEO na Lopessoftec. Desenvolvedor web em PHP, Laravel, Symfony,
                Javascript, ReactJS, React Native, NodeJS, ... Sempre em busca
                de novos conhecimentos :D
              </Text>
              <Text style={styles.devTechs}>PHP, JS</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderColor: "#FFF"
  },

  callout: {
    width: 260
  },

  devName: {
    fontWeight: "bold",
    fontSize: 16
  },

  devBio: {
    color: "#666",
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  },

  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});

export default Main;
