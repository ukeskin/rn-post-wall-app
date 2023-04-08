import 'react-native-url-polyfill/auto'

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import supabase from './lib/supabase';
// Screens
import { HomeScreen, ProfileScreen, CreatePostScreen, SplashScreen, AuthScreen } from './screens';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [state, setState] = useState({
    session: null,
    isLoading: true,
    userToken: null,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ ...state, session, isLoading: false, userToken: session?.access_token })
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setState({ ...state, session, isLoading: false, userToken: session?.access_token })
    })
  }, [])


  if (state.isLoading) {
    return <SplashScreen />
  }

  return (
    // create a navigation container that will be used to navigate between screens in the app  bottom bar
    <NavigationContainer>
      {state.session ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Create Post"
            component={CreatePostScreen}
            initialParams={{ session: state.session }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{ session: state.session }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
