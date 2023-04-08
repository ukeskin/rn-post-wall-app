import React, { useState } from 'react'
import { Text, View, StyleSheet, Modal } from 'react-native'
import supabase from '../../lib/supabase'
import { InputBox, Button } from '../../components/ui'
import { TextArea } from 'react-native-ui-lib'

export default function Auth() {
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    console.log({ email, password })
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,

    })

    if (error) alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: userName,
        },
      },
    })

    if (data) {
      // add user to profiles table with default values for username and website fields 
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            username: userName,
          },
        ])

      if (error) alert(error.message)
    }

    alert('Check your email for the login link!')
    if (error) alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <InputBox
        placeholder="Email"
        onChangeText={setUsername}
        value={userName}
      />
      <InputBox
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <InputBox
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title="Login"
        onPress={signInWithEmail}
        loading={loading}
      />
      <Button
        title="Sign Up"
        onPress={signUpWithEmail}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})
