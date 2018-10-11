import { StyleSheet } from "react-native";
import Color from "./../../styles/theme//color";

export default StyleSheet.create({
  containerStyle: {
    margin: 0,
    padding: 0
  },
  wrapperStyle: {
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  leftContainer: {
    flex: 3
  },
  titleContainer: {
    paddingBottom: 10,
    // backgroundColor: 'green',
    minHeight: 80
  },
  title: {
    fontSize: 18,
    color: "grey"
  },
  meta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  alias: {
    fontWeight: "bold",
    color: Color.darkBlue
  },
  voteContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5
  },
  voteCount: {
    color: Color.darkBlue,
    fontSize: 18,
    fontWeight: "bold"
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0,
    margin: 0
  },
  icon: {
    height: "auto",
    color: Color.gold,
    paddingBottom: 0
  },
  iconSelected: {
    color: Color.darkBlue
  }
});
