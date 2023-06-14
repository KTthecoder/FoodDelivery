import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import OrderPastBlock from '../components/OrderPastBlock'
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import useFetchGet from '../hooks/useFetchGet';

const AllPastOrders = () => {
  const { width } = Dimensions.get('screen')
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation()
  const { data } = useFetchGet('http://192.168.1.34:8000/api/orders/past')
  
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
        <View className='items-start justify-between mt-3' style={{width: width * 0.9}}> 
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-white first-line rounded-full items-center justify-center' style={{width: 38, height: 38, zIndex: 1}}>
              <AntDesign name="left" size={27} color="black" />
          </TouchableOpacity>
          <Text className='text-2xl mt-4' style={{fontFamily: 'Montserrat-SemiBold'}}>Past Orders</Text>
        </View>
        <View className='items-center justify-center mt-8' style={{width: width * 0.9}}>
          {data && data.map((item) => (
            <OrderPastBlock key={item.id} title={item['resteurant']['title']} count={Object.keys(data).length} price={item['order_total']} slug={item['resteurant']['slug']} image={item['resteurant']['image']} id={item['id']} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllPastOrders