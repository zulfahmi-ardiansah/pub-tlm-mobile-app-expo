import React, {useEffect, useState} from 'react';
import {Image, Text, ScrollView, View, Dimensions, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Preloader from '../assets/preloader.gif';
import ArticleImage from './ArticleImage';

const ArticleDetal = (props) => {
  const article = props.data;
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let date = new Date(article.date);
  
  const generateElement = (content) => {
    let elementArray = [];
    let elementType = '';
    let elementParagraph = '';
    content.forEach(item => {
      let value = Array.isArray(item.value) ? item.value : item.value.trim().replace(/(\r\n|\n\r|\r|\n)/g, "");
      let type = item.type;
      if (value.length > 0) {
        if (elementType != type && elementType == 'p') {
            elementArray.push((
              <Text style={styles.artContentP}>{elementParagraph}</Text>
            ));
            elementParagraph = '';
        }
        switch (type) {
          case 'p':
            elementParagraph += (elementParagraph == '') ? value : '\n\n' + value;
            break;
          case 'h1': case 'h2': case 'h3':
          case 'h4': case 'h5': case 'h6':
            elementArray.push((
              <Text style={[styles.artContentH, ((!elementType.includes('h') ? styles.artContentHMargin : {}))]}>
                {value}
              </Text>
            ))
            break;
          case 'ul':
          case 'ol':
            let listArray = [];
            let listNumber = 1;
            for (let i = 0; i < value.length; i++) {
              if (value[i].trim().length > 0) {
                listArray.push((
                  <View style={styles.artContentListItem}>
                    <Text style={styles.artContentListItemSymbol}>{type == 'ol' ? (listNumber + '.') : '-'}</Text>
                    <Text style={styles.artContentListItemText}>{value[i]}</Text>
                  </View>
                ))
                listNumber++;
              }
            }
            elementArray.push(
              <View style={styles.artContentList}>
                {listArray.map(item2 => (item2))}
              </View>
            )
            break;
          case 'img':
            elementArray.push((
              <ArticleImage  source={value} />
            ))
            break;
        }
        elementType = type;
      }
    });
    if (elementParagraph != '' && elementType == 'p') {
        elementArray.push((
          <Text style={styles.artContentP}>{elementParagraph}</Text>
        ));
    }
    return (
      <View>
        {elementArray.map(item => (item))}
      </View>
    )
  }

  return (
    <ScrollView style={styles.artContainer}>
      <Text style={styles.artTitle}>
        {article.title}
      </Text>
      <View style={styles.artMeta}>  
        {article.category.length == 0 
          ? (<View></View>) 
          : (
            <View style={styles.artMetaCategory}>
              <Text style={styles.artMetaCategoryText}>
                {article.category[0]}
              </Text>
            </View>
        ) }
        <Text style={styles.artMetaText}>
          <Text style={{fontWeight: "bold", color: "#282828"}}>{article.author}</Text>
        </Text>
        <Text style={styles.artMetaSeparator}>
          -
        </Text>
        <Text style={styles.artMetaText}>
          {(date.getDate() + " " + (monthNames[date.getMonth()]) + " " + date.getFullYear())}
        </Text>
      </View>
      <View style={styles.artContent}>
        {generateElement(article.content)}
      </View>
    </ScrollView>
  )
}

export default ArticleDetal;

const styles = StyleSheet.create({
  artContainer: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 18,
  },
  artTitle: {
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    lineHeight: 30,
    color: "#282828"
  },
  artMeta: {
    flexDirection: "row",
  },
  artMetaCategory: {
    alignSelf: 'flex-start', 
    backgroundColor: "#282828", 
    borderRadius: 2, 
    paddingTop: 1, 
    paddingBottom: 2, 
    paddingLeft: 4, 
    paddingRight: 4,
    marginRight: 10
  },
  artMetaCategoryText: {
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  artMetaText: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "semibold",
    color: "#7C7C7C"
  },
  artMetaSeparator: {
    marginLeft: 6,
    marginRight: 6,
    color: "#7C7C7C"
  },
  artContent: {
    marginTop: 12,
    marginBottom: 25
  },
  artContentP: {
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 24,
    marginVertical: 8,
    textAlign: "justify",
    color: "#333333"
  },
  artContentList: {
    marginVertical: 8,
  },
  artContentListItem: {
    display: "flex",
    flexDirection: "row"
  },
  artContentListItemSymbol: {
    width: 14,
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 24,
    color: "#333333"
  },
  artContentListItemText: {
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 24,
    color: "#333333"
  },
  artContentH: {
    fontFamily: "Roboto",
    fontSize: 18,
    marginVertical: 8,
    lineHeight: 26,
    fontWeight: "bold",
    textAlign: "justify",
    color: "#333333"
  }
});
