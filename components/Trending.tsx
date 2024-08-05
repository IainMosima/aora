import React, { useState } from 'react'
import { ImageStyle, Text, TextStyle, ViewStyle } from 'react-native'
import { Models } from 'react-native-appwrite'
import { FlatList } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

interface TredingItemsProps {
  activeItem?: Models.Document,
  item?: Models.Document

}

const TrendingItems = (props: TredingItemsProps) => (
  <Animatable.View
    className="mr-5"
    animation={props.activeItem?.$id === props.item?.$id ? zoomIn : zoomOut}
    duration={500}>

  </Animatable.View>
)

interface Props {
  posts: Models.Document[] | undefined
}

const Trending = (props: Props) => {
  const [activeItem, setActiveItem] = useState(props.posts && props.posts[0])

  return (
    <FlatList
      data={props.posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItems activeItem={activeItem} item={item} />
      )}
      horizontal
    />
  )
}

export default Trending