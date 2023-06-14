import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import * as SecureStore from "expo-secure-store"

const useFetchGet = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  const [refresh, setRefresh] = useState(false)

  const [token, setToken] = useState()

  async function getData() {
    await SecureStore.getItemAsync("accessToken").then(async(token) => {
      setToken(token)
      let response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
          },
      })
      let data = await response.json()
        setData(data)
        setLoading(false)
    })
  }

  useEffect(() => {
    if(token !== null){
      navigation.addListener('focus', () => {
        getData()
      })
    }
  }, [url, refresh])

  return {data, loading, refresh, setRefresh}
}

export default useFetchGet