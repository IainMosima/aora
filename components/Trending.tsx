import React, { useState } from 'react'
import { ImageBackground, ImageStyle, Text, TextStyle, TouchableOpacity, ViewStyle, Image, ViewToken } from 'react-native'
import { Models } from 'react-native-appwrite'
import { FlatList } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 1.1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

interface TrendingItemsProps {
  activeItemId?: string,
  item?: Models.Document
}

const TrendingItems = (props: TrendingItemsProps) => {
  const [play, setPlay] = useState(false)

  return (
    <Animatable.View
      className="mr-5"
      animation={props.activeItemId === props.item?.$id ? zoomIn : zoomOut}
      duration={500}>
      {play ? (
        <Video
          source={{ uri: props.item?.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          // onPlaybackStatusUpdate={(status) => {
          //   if (status.didJustFinish) {
          //     setPlay(false);
          //   }
          // }}
        />
      ) : (
        <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground source={{ uri: props.item?.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

interface Props {
  posts: Models.Document[] | undefined
}

const Trending = (props: Props) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(props.posts && props.posts[0].$id)

  function viewableItemsChange(info: { viewableItems: ViewToken<Models.Document>[]; changed: ViewToken<Models.Document>[] }): void {
    if (info.viewableItems.length > 0) {
      setActiveItem(info.viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={props.posts || []} // Fallback to empty array if posts is undefined
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItems activeItemId={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      // when to apply the visibility config
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  )
}

export default Trending
