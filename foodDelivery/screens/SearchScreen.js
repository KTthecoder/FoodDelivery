import { View, Text, SafeAreaView, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import SearchCategoryBlock from '../components/SearchCategoryBlock';
import { useNavigation } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';

const SearchScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()

  const { data } = useFetchGet('http://192.168.1.34:8000/api/categories/all')

  const ref = React.useRef(null);
  useScrollToTop(ref)

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <View className={`${Platform.OS === 'ios' ? 'pt-3' : 'pt-9'} bg-[#f1f1f1] items-center rounded-b-xl`}>
            <Pressable className='bg-[#dedede] rounded-xl flex-row px-2 items-center' style={{width: width * 0.9}} onPress={() => navigation.navigate('SearchModuleScreen')}>
              <AntDesign name="search1" size={22} color="gray" />
              <Text className='flex-1 ml-2 text-sm py-2' style={{fontFamily: 'Montserrat-Regular', color: 'gray'}}>Search...</Text>
            </Pressable>
          </View>
          
          <ScrollView ref={ref} className='mt-6 w-screen' showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 120}}>
            <View style={{width: width * 0.9}}>
              <Text className='text-lg' style={{fontFamily: 'Montserrat-SemiBold'}}>All Categories</Text>

              <View className='flex-row flex-wrap mt-5 justify-between'>
                {data && data.map((item) => (
                  <SearchCategoryBlock title={item.title} image={item.image} slug={item.slug} key={item.id}/>
                ))}
              </View>

            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SearchScreen