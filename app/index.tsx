import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if(!isLoading && !isLoggedIn) return <Redirect href='/home'/>
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className='w-full justify-center items-center min-h-[85vh] px-4'>
            <Image
              source={images.logo}
              className='w-[130px] h-[84px]'
              resizeMode='contain'
            />

            <Image
              source={images.cards}
              className='max-w-[380px] w-full h-[300px]'
              resizeMode='contain'
            />

            <View className='relative mt-5'>
              <Text className='text-3xl text-white font-bold text-center'>Discover endless possibilities with {' '}
                <Text className='text-secondary-200'>Aora</Text>
              </Text>
              <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-3 right-[66px]' resizeMode='contain' />
            </View>

            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

            <CustomButton
              title='Continue with email'
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor='#161622' style='light' />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default index