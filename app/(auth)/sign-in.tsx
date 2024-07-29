import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'

export interface SignInForm {
  email: string,
    password: string,
}

const SignIn = () => {
  const [form, setForm] = useState<SignInForm>({
    email: '',
    password: '',
  })
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
          <View className='w-full justify-center h-full px-4 my-6'>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default SignIn