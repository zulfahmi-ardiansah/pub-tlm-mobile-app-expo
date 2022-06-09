import React, {useEffect, useState} from 'react';
import {Image, Text, ScrollView, View, Dimensions, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Preloader from '../assets/preloader.gif';
import ArticleImage from '../components/ArticleImage';
import ArticleDetail from '../components/ArticleDetail';

const ArticleScreen = ({route, navigation}) => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {link} = route.params;

  useEffect(() => {
    fetch("https://thelazymedia-api.herokuapp.com/getArticle", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({link: link})
      })
      .then(response => response.json())
      .then(json => setArticle(json))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <View style={styles.container}>
      <View style={isLoading ? {alignItems: 'center'} : {display: 'none'}}>
        <Image style={{height: 60, width: 60}} source={Preloader} />
      </View>
      {article ? <ArticleDetail data={article}/> : <View></View>}
    </View>
  )
}

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
