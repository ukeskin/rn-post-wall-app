import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { InputBox, Button } from '../../components/ui'
import supabase from '../../lib/supabase'

export default function CreatePost({ route: { params: { session } } }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function createPost() {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: session.user.id,
          title: title,
          content: content,
        },
      ])
    if (error) alert(error.message)
    else alert('Post created!')
  }
  return (
    <View
      style={styles.container}
    >
      <Text style={{ fontSize: 30 }}>Create Post</Text>
      <InputBox
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <InputBox
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <Button
        title="Create Post"
        onPress={createPost}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
})
