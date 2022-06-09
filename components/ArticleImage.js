import React, {useEffect, useState} from 'react';
import {Image, Text, ScrollView, View, Dimensions, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Preloader from '../assets/preloader.gif';

const ArticleImage = (props: {source: string, id: string}) => {
  const [imageHeight, setImageHeight] = useState(1);
  const [imageWidth, setImageWidth] = useState(1);
  Image.prefetch(props.source).then(() => {
    Image.getSize(props.source, (width, height) => {
      setImageHeight(height);
      setImageWidth(width);
    });
  })
  if (!(imageHeight <=1 || imageWidth <= 1)) {
    return (
      <View style={{marginVertical: 8}}>
        <Image key={props.id} style={{aspectRatio: imageWidth / imageHeight, borderRadius: 4}} source={{uri: props.source}}/>
      </View>
    );
  }
  return (
    <View></View>
  )
}

export default ArticleImage;