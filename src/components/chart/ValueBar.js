import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ValueBar = ({layout}) => {

  return (
    <View style={styles.container}>

      <View style={styles.labelContainer}>

      {

        [...Array(5)].map((_, i) => {
         return <Text key={i} style={[{width:(layout.width-100)/5, left: i * (layout.width-30)/5  },styles.label]}>
                    {i * 25} %
          </Text>
        })
  }

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 20,
        // height: "10%",
        backgroundColor: "#f3f3f3",
        // opacity: 0.75,
        elevation: 10,
        borderBottomEndRadius: 10,
        overflow: "hidden",
        paddingLeft: 50,
    },
    labelContainer: {
      flex: 1,
      // position: "absolute",
      top: 0,
      // left: 50,
      // width: "100%",
      height: "100%",
      flexDirection: "row",
      // justifyContent: "space-between",
      alignItems: "center",
    },

    label: {
      position: "absolute",

    }
})
export default ValueBar
