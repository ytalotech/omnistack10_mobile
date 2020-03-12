import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
// por ser uma exportação padrão não irei colocar entre chaaves
import MapView, { Marker } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

function Main() {
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
  return <MapView initialRegion={currentRegion} style={styles.map} />;
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default Main;
