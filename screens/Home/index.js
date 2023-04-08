import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import supabase from '../../lib/supabase'
import PostCard from '../../components/ui/PostCard'

export default function Home() {
  // feed fetch all post from the database
  const [feed, setFeed] = useState([])

  useEffect(() => {
    // fetch all posts from the database
    fetchFeed()
  }, [])

  async function fetchFeed() {
    let { data: posts, error } = await supabase
      .from('posts')
      .select('*')

    if (error) console.log('error', error)

    setFeed(posts)

    console.log('posts', posts)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        renderItem={({ item }) => (
          <PostCard title={item.title} content={item.content} user={item.user} />
        )}
        keyExtractor={item => item.id}
        onScrollBeginDrag={() => fetchFeed()}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
