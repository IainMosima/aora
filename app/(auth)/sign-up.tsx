import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '@/lib/appwrite'

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
  const submit = () => {
    // createUser();
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
          <View className='w-full justify-center min-h-[75vh] px-4 my-6'>
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
              title='Sign In'
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