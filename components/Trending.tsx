import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface id {
    id: number
}

interface Props {
    posts: id[]
}

const Trending = (props: Props) => {
  return (
    <FlatList
        data={props.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
        )}
        horizontal
    />
  )
}

export default Trending