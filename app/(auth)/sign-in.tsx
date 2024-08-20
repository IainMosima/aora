import React, { useState } from 'react'
import { View, Image, Text, Alert } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

export interface SignInForm {
  email: string,
  password: string,
}

const SignIn = () => {
  const [form, setForm] = useState<SignInForm>({
    email: '',
    password: '',
  })
  const { user, setUser, setIsLogged } = useGlobalContext()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password)

      const result = getCurrentUser()

      setUser(result)
      setIsLogged(true)


      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error as string)
    } finally {
      setIsSubmitting(false)
    }

  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
          <View className='w-full justify-center min-h-[75vh] px-4 my-6'>
            <Image source={images.logo} className='w-[115px] h-[35px]' />
            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
            <FormField
              title='Email'
              value={form.email}
              handleChangeText={e => setForm({ ...form, email: e })}
              otherStyle="mt-7"
              keyboardType='email-address'
            />

            <FormField
              title='Password'
              value={form.password}
              handleChangeText={e => setForm({ ...form, password: e })}
              otherStyle="mt-7"
            />

            <CustomButton
              title='Sign In'
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular'>Don't have an account?</Text>
              <Link href="/sign-up" className='text-lg text-secondary'>Sign Up</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default SignIn