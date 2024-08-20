import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import SearchInput from '@/components/SearchInput'
import VideoCard, { VideoI } from '@/components/VideoCard'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getUserPosts, signOut } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'


const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id))
  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLogged(false)

    router.replace('/sign-in')
   }

  useEffect(() => {
    refetch()
  }, [user])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={posts || []}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard video={item as unknown as VideoI} />
          )}
          ListHeaderComponent={() => (
            <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
              <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
                <Image
                  source={icons.logout}
                  resizeMode='contain'
                  className='w-6 h-6'
                />
              </TouchableOpacity>

              <View className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
                <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
              </View>

              <InfoBox
                title={user?.username}
                containerStyle='mt-5'
                titleStyles='text-lg'
              />

              <View className='mt-5 flex-row'>
                <InfoBox
                  title={posts?.length || 0}
                  subtitle='Posts'
                  containerStyle='mr-10'
                  titleStyles='text-xl'
                />
                <InfoBox
                  title="1.2k"
                  subtitle="followes"
                  containerStyle='mr-5'
                  titleStyles='text-lg'
                />
              </View>
            </View>
          )}

          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              subtitle="No videos found for this serch query"
            />
          )}


        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Profile