import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { greaterOrEq } from "react-native-reanimated";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PointDetails from "../components/PointDetails/PointDetails";
import Achievement from "../components/achievement/Achievement";
import QuestComponent from "../components/questCard/questComponent";
import { selectquests } from "../store/slices/questSlice";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const achievements = [
  {
    id: 1,
    title: "Krakowski rynek",
    image: require("../../assets/rynek.jpg"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Zamek na Wawelu",
    image: require("../../assets/wawel.jpg"),
    description:
      "Wawel castle is the most important monument in Krakow. It is a symbol of the city and the country.",
  },
  {
    id: 3,
    title: "Kazimierz",
    image: require("../../assets/kazimierz.jpg"),
    description:
      "Kazimierz is a district of Krakow, Poland, located on the right bank of the Vistula River.",
  },
  {
    id: 4,
    title: "Barbakan",
    image: require("../../assets/barbakan.jpg"),
    description:
      "Barbakan is a medieval fortification in Krakow, Poland. It is located on the south side of the Old Town, on the Vistula River.",
  },
];

const Achievements = (props) => {
  const { quests, loading, error } = useSelector(selectquests);
  const [curAchievement, setCurAchievement] = useState(achievements[0]);

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["30%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        marginTop: 20,
        position: "relative",
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.btnn}
          >
            <Text style={styles.bttnText}>➜</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Odznaki i osiągnięcia</Text>
        </View>

        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>Kraków</Text>
          <Text>4/15</Text>
        </View>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <Achievement
              key={achievement.id}
              imageSource={achievement.image}
              achievementTitle={achievement.title}
              onPress={() => {
                setCurAchievement(achievement);
                bottomSheetRef.current.expand();
              }}
            />
          ))}
        </View>
        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>Zadania</Text>
        </View>

        {quests.map((quest) => (
          <QuestComponent
            key={quest.id}
            imageSource={quest.attributes.Image.data.attributes.url}
            title={quest.attributes.Name}
            description="Complete all the challenges to earn the ultimate reward!"
            points={quest.attributes.Award}
          />
        ))}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={1}
            enableTouchThrough
            pressBehavior={"collapse"}
          />
        )}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHeader}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="repeat"
                source={curAchievement.image}
                style={styles.image}
              />
            </View>
            <Text style={styles.categoryName}>{curAchievement.title}</Text>
          </View>

          <View style={styles.sheetContent}>
            <Text style={styles.description}>{curAchievement.description}</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 50,
    gap: 10,
    maxWidth: "90%",
    margin: "auto",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  headerText: {
    fontSize: 30,
  },
  achievementsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  btnn: {
    width: 50,
    transform: [{ rotate: "180deg" }, { translateY: -5 }],
    zIndex: 420,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  bttnText: {
    fontSize: 40,
    zIndex: 430,
  },

  icon: {
    height: 90,
    width: 90,
    margin: 5,
  },
  categoryName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  categoryNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginTop: 15,
    alignSelf: "center",
  },

  sheetContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  sheetHeader: {
    flexDirection: "row",
    gap: 20,
    maxWidth: "90%",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  description: {
    color: "darkgray",
    maxWidth: "80%",
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});

export default Achievements;
