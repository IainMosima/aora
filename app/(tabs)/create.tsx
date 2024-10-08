import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { creatVideo } from '@/lib/appwrite'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


export interface DocumentPickerResult {
  uri: string;
  name?: string;
  size?: number;
  mimeType?: string;
}

export interface FormState {
  userId: string,
  title: string,
  video: DocumentPickerResult | null,
  thumbnail: DocumentPickerResult | null,
  prompt: string
}
const Create = () => {
  const [uploading, setUploading] = useState(false)
  const { user, setUser, setIsLogged } = useGlobalContext()
  const [form, setForm] = useState<FormState>({
    userId: user.$id,
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })


  const openPicker = async (selectType: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert('Documner picked', JSON.stringify(result, null, 2))
      }, 100);
    }
  }

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert('Please fill in all the fields')
    }

    setUploading(true)
    try {
      await creatVideo({
        ...form,
        userId: user.$id,
      })

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while trying to upload')
    } finally {
      setForm(
        {
          userId: user.id,
          title: '',
          video: { uri: '' } || null,
          thumbnail: { uri: '' } || null,
          prompt: ''
        }
      )
      setUploading(false)
    }
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView className='px-4 my-6'>
          <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>

          <FormField
            title='Video Title'
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            placeholder='Give your video a catchy title'
            otherStyle='mt-10'
          />

          <View className='mt-7 space-y-2'>
            <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
            <TouchableOpacity onPress={() => openPicker('video')}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className='w-full h-64 rounded-2xl'
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                  <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className='mt-7 space-y-2'>
            <Text className='text-2xl text-white font-psemibold'>Thumbnail Image</Text>

            <TouchableOpacity onPress={() => openPicker('image')}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode='cover'
                  className='w-full h-64 rounded-2xl'
                />
              ) : (
                <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                  <Image source={icons.upload} resizeMode='contain' className='w-5 h-5' />
                  <Text className='text-sm text-gray-100 font-psemibold'>Choose a file</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title='AI Prompt'
            value={form.prompt}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            placeholder='The prompt you used to create this video'
            otherStyle='mt-7'
          />

          <CustomButton
            title='Submit & Publish'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={uploading}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Create