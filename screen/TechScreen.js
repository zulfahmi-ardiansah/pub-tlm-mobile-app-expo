import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, ScrollView, View, StyleSheet, FlatList} from 'react-native';
import Constants from 'expo-constants';
import ArticleItem from '../components/ArticleItem';
import Preloader from '../assets/preloader.gif';

const TechScreen = ({navigation}) => {
  const [techArticleList, setTechArticleList] = useState([]);
  const [techArticlePage, setTechArticlePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const techArticleDetail = (link) => {
    navigation.navigate("Article", {link: link});
  }

  const techArticleListRefresh = () => {
    setIsLoading(true);
    fetch("https://thelazymedia-api.herokuapp.com/getListArticleByCategory/tech/" + techArticlePage)
      .then(response => response.json())
      .then(json => setTechArticleList(techArticleList.concat(json.data)))
      .finally(() => setIsLoading(false));
  }

  const techArticleListNextPage = () => {
    setTechArticlePage(techArticlePage + 1);
    techArticleListRefresh();
  }

  useEffect(() => {
    techArticleListRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.artIteListHeader}>
        <Text style={styles.artIteListHeaderText}>
          Tech <Text style={{color: "#FFA200", fontSize: 45}}>.</Text>
        </Text>
      </View>
      <View style={styles.artIteList}>
        <FlatList
          style={techArticleList.length == 0 ? {display: 'none'} : {}}
          data={techArticleList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => techArticleDetail(item.link)}>
              <ArticleItem item={item}/>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={techArticleListNextPage}
          ListFooterComponent={() => (
            <View style={isLoading && techArticleList.length > 0 ? {alignItems: 'center'} : {display: 'none'}}>
              <Image style={{height: 30, width: 30}} source={Preloader} />
            </View>
          )}
        />
        <View style={isLoading && techArticleList.length == 0 ? {alignItems: 'center'} : {display: 'none'}}>
          <Image style={{height: 60, width: 60}} source={Preloader} />
        </View>
      </View>
    </View>
  )
}

export default TechScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
