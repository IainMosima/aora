import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import EmptyState from '@/assets/EmptyState'

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary'>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6'>

                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome back
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    Iain Mosima
                  </Text>
                </View>

                <View className='mt-1.5'>
                  <Image source={images.logoSmall} className='w-9 h-9' resizeMode='contain' />
                </View>

              </View>

              {/* <SearchInput/> */}

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
              </View>

            </View>

          )}

          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              subtitle="Be the first one to upload a video"
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home