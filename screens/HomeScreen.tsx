import React, { useContext, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, TextInput } from "../components/Themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedContext } from "../contexts/ThemedContext";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface IMarker {
  coordinate: object;
  title: string;
  description: string;
  image: string;
}

const MARKERS = [
  {
    coordinate: {
      latitude: -7.249167,
      longitude: 112.750833,
    },
    title: "Fast Food Restaurant",
    description: "Jalan Surabaya Indonesia",
    image: require("../assets/images/marker_food.png"),
  },
  {
    coordinate: {
      latitude: -7.241554,
      longitude: 112.7460695,
    },
    title: "ITC Mall Surabaya",
    description: "Surabaya streen No.123 85 A1",
    image: require("../assets/images/marker_shop.png"),
  },
  {
    coordinate: {
      latitude: -7.2518442,
      longitude: 112.7562868,
    },
    title: "Stadion Gelora 10 November",
    description: "Jalan Soerkarno hatta No.89 30A menteng, Indonesia",
    image: require("../assets/images/marker_football.png"),
  },
];

export default function HomeScreen() {
  const { theme, setTheme } = useContext(ThemedContext);

  const getInitialState = () => {
    return {
      region: {
        latitude: -7.249167,
        longitude: 112.750833,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  };

  const [initialRegion, setInitialRegion] = useState(getInitialState());
  const [selectedMarker, setSelectedMarker] = useState<IMarker>();
  const [searchQuery, setSearchQuery] = useState<String>("");
  const colorScheme = theme;

  const onMarkerPressed = (marker) => {
    setSelectedMarker(marker);
  };

  const onSearchItemPressed = (title) => {
    alert(title);
  };

  const onToggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const Item = ({ title, description }) => (
    <TouchableOpacity
      onPress={() => {
        onSearchItemPressed(title);
      }}
      style={[styles.item, { backgroundColor: Colors[colorScheme].background }]}
    >
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDesc}>{description}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onToggleDarkMode}
        style={{
          backgroundColor: Colors[colorScheme].background,
          borderRadius: 100,
          padding: 10,
          position: "absolute",
          zIndex: 2,
          top: height / 6,
          right: 16,
        }}
      >
        <MaterialCommunityIcons
          size={28}
          style={{}}
          name="theme-light-dark"
          color={Colors[colorScheme].text}
        />
      </TouchableOpacity>
      <>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
          value={searchQuery}
        />
        {searchQuery !== "" && (
          <View style={styles.searchResults}>
            <FlatList
              style={styles.searchResultList}
              data={MARKERS}
              renderItem={renderItem}
              keyExtractor={(item) => item.coordinate.latitude}
            />
          </View>
        )}
      </>
      <MapView
        userInterfaceStyle={colorScheme}
        region={initialRegion.region}
        style={styles.map}
      >
        {MARKERS.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            image={marker.image}
            style={[
              styles.marker,
              { backgroundColor: Colors[colorScheme].background },
            ]}
            onPress={() => {
              onMarkerPressed(marker);
            }}
          />
        ))}
      </MapView>
      {selectedMarker && (
        <View
          style={[
            styles.cardCallout,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Image source={selectedMarker.image} style={styles.cardImage} />
          <View>
            <Text style={styles.cardTitle} showOpposite={false}>
              {selectedMarker?.title}
            </Text>
            <Text style={styles.cardDesc} showOpposite>
              {selectedMarker?.description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  marker: {
    borderRadius: 10,
    padding: 160,
  },
  cardCallout: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDesc: {
    fontStyle: "italic",
    paddingRight: 100,
  },
  cardImage: {
    width: 70,
    height: 70,
  },
  textInput: {
    position: "absolute",
    zIndex: 1,
    top: 48,
    left: 0,
    right: 0,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    margin: 16,
  },
  searchResults: {
    position: "absolute",
    width: "90%",
    zIndex: 3,
    top: 110,
  },
  searchResultList: {},
  item: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.4,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemDesc: {
    fontSize: 12,
  },
});
