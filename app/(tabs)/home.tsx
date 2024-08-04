import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard, { Video } from '@/components/VideoCard'
import { images } from '@/constants'
import { getALllPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import React, { useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {
  const { data: posts, refetch } = useAppwrite(getALllPosts)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  // console.log(posts)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard video={item as unknown as Video}/>
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

              <SearchInput />

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

          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home