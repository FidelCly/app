import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

const DATA = [
  {
    title: "Exemple 1",
    location: "10 rue Zinedine Zidane, Paris",
    coupon: "3 ",
    imageCard:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg",
    promotion: "-30%",
  },
  {
    title: "Exemple 2",
    location: "12 rue Emmanuel Petit, Paris",
    coupon: "5 ",
    imageCard:
      "https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg",
    promotion: "une boisson offerte",
  },
  {
    title: "Exemple 3",
    location: "13 rue Didier Deschamps, Ivry",
    coupon: "8 ",
    imageCard:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg",
    promotion: "-15%",
  },
  {
    title: "Exemple 4",
    location: "14 avenue Youri Djorkaeff, Paris",
    coupon: "9 ",
    imageCard:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg",
    promotion: "-30%",
  },
  {
    title: "Exemple 5",
    location: "15 rue Lilian Thuram, Vitry-Sur-Seine",
    coupon: "1 ",
    imageCard:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg",
    promotion: "-10€",
  },
  {
    title: "Exemple 6",
    location: "16 rue Fabien Barthez, Ivry",
    coupon: "3 ",
    imageCard:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg",
    promotion: "un cadeau",
  },
];

const OVERFLOW_HEIGHT = 90;
const VISIBLE_ITEMS = 3;

// HEADER - INFORMATION TEXTE

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.location}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const OverflowItems2 = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.coupon]}>
                {item.coupon}coupons avant la promotion :
              </Text>
              <Text style={[styles.promotion]} numberOfLines={1}>
                {item.promotion} !
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function CardScreen() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: 10,
              marginTop: 30,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -250 / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <Image
                    source={{ uri: item.imageCard }}
                    style={{
                      width: 250,
                      height: 350,
                      borderRadius: 14,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
          <OverflowItems2 data={data} scrollXAnimated={scrollXAnimated} />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  promotion: {
    fontSize: 22,
    letterSpacing: -1,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  location: {
    fontSize: 16,
  },
  coupon: {
    fontSize: 16,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: 20,
    backgroundColor: "#fff",
  },
  itemContainerRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});
