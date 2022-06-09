import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const ArticleItem = (props) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let date = new Date(props.item.date);
  return (
    <View style={styles.artIteContainer}>
      <View style={styles.artIteThumbnail}>
        <Image style={styles.artIteThumbnailImage} source={{uri: (props.item.thumbnail)}} />
        <View style={[styles.artIteThumbnailAccent, styles.artIteThumbnailAccentL]}></View>
        <View style={[styles.artIteThumbnailAccent, styles.artIteThumbnailAccentR]}></View>
      </View>
      <View style={styles.artIteContent}>
        <Text style={styles.artIteTitle}>
          {props.item.title}
        </Text>
        <View style={styles.artIteMeta}>  
          <Text style={styles.artIteMetaText}>
            {props.item.author}
          </Text>
          <Text style={styles.artIteMetaSeparator}>
          -
          </Text>
          <Text style={styles.artIteMetaText}>
            {(date.getDate() + " " + (monthNames[date.getMonth()]) + " " + date.getFullYear())}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ArticleItem;

const styles = StyleSheet.create({
  artIteContainer: {
    flexDirection: "row",
    marginVertical: 8,
    paddingRight: 16,
    paddingLeft: 18
  },
  artIteThumbnail: {
    height: 60,
    marginTop: 4
  },
  artIteThumbnailAccent: {
    position: "absolute",
    backgroundColor: "#FFA200",
    width: 14,
    height: 14,
    zIndex: -1
  },
  artIteThumbnailAccentL: {
    bottom: -2,
    left: -2
  },
  artIteThumbnailAccentR: {
    top: -2,
    right: -2
  },
  artIteThumbnailImage: {
    width: 100,
    height: 60,
    borderRadius: 2
  },
  artIteTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 20,
    color: "#282828"
  },
  artIteContent: {
    paddingLeft: 16,
    flex: 1
  },
  artIteMeta: {
    flexDirection: "row",
  },
  artIteMetaText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "semibold",
    color: "#7C7C7C"
  },
  artIteMetaSeparator: {
    marginLeft: 6,
    marginRight: 6,
    color: "#7C7C7C"
  }
});