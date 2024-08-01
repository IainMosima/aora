import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

interface Props {
  title: string,
  subtitle: string
}

const EmptyState = (props: Props) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[207px] h-[215px]" resizeMode='contain' />
      
      <Text className='text-xl text-center font-psemibold text-white mt-2'>
        {props.title}
      </Text>

      <Text className="font-pmedium text-sm text-gray-100">
        {props.subtitle}
      </Text>
    </View>
  )
}

export default EmptyState