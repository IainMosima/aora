import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

export interface SignUpForm {
  userName: string,
  email: string,
  password: string,
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    userName: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.userName)
    } catch (error) {
      Alert.alert('Error', error as string)
    } finally {
      setIsSubmitting(false)
      router.replace('/home')
    }

  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
          <View className='w-full justify-center min-h-[10vh] px-4 my-6'>
            <Image source={images.logo} className='w-[115px] h-[35px]' />
            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>
            <FormField
              title='Username'
              value={form.userName}
              handleChangeText={e => setForm({ ...form, userName: e })}
              otherStyle="mt-10"
            />

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
              title='Sign Up'
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
              <Link href="/sign-in" className='text-lg text-secondary'>Sign In</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default SignUp