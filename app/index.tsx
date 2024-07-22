import { Link } from 'expo-router'
import React from 'react'
import { StatusBar, Text, View } from 'react-native'

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-3xl font-pblack'>Aora</Text>
      <StatusBar barStyle="default" />
      <Link href="/home" style={{color: 'blue'}}>Go to Home</Link>
    </View>
  )
}

export default index