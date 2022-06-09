import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, Image, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import Constants from 'expo-constants';
import ArticleItem from '../components/ArticleItem';
import Preloader from '../assets/preloader.gif';

const GamesScreen = ({navigation}) => {
  const [gamesArticleList, setGamesArticleList] = useState([]);
  const [gamesArticlePage, setGamesArticlePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const gamesArticleDetail = (link) => {
    navigation.navigate("Article", {link: link});
  }

  const gamesArticleListRefresh = () => {
    setIsLoading(true);
    fetch("https://thelazymedia-api.herokuapp.com/getListArticleByCategory/games/" + gamesArticlePage)
      .then(response => response.json())
      .then(json => setGamesArticleList(gamesArticleList.concat(json.data)))
      .finally(() => setIsLoading(false));
  }

  const gamesArticleListNextPage = () => {
    setGamesArticlePage(gamesArticlePage + 1);
    gamesArticleListRefresh();
  }
  
  useEffect(() => {
    gamesArticleListRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.artIteListHeader}>
        <Text style={styles.artIteListHeaderText}>
          Game <Text style={{color: "#FFA200", fontSize: 45}}>.</Text>
        </Text>
      </View>
      <View style={styles.artIteList}>
        <FlatList
          style={gamesArticleList.length == 0 ? {display: 'none'} : {}}
          data={gamesArticleList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => gamesArticleDetail(item.link)}>
              <ArticleItem item={item}/>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={gamesArticleListNextPage}
          ListFooterComponent={() => (
            <View style={isLoading && gamesArticleList.length > 0 ? {alignItems: 'center'} : {display: 'none'}}>
              <Image style={{height: 30, width: 30}} source={Preloader} />
            </View>
          )}
        />
        <View style={isLoading && gamesArticleList.length == 0 ? {alignItems: 'center'} : {display: 'none'}}>
          <Image style={{height: 60, width: 60}} source={Preloader} />
        </View>
      </View>
    </View>
  )
}

export default GamesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  artIteList: {
    flex: 1,
    justifyContent: 'center',
  },
  artIteListHeader: {
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  artIteListHeaderText: {
    fontSize: 36,
    fontWeight: "bold",
  }
});
