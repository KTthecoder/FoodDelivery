import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import OrderCurrentBlock from '../components/OrderCurrentBlock'
import OrderPastBlock from '../components/OrderPastBlock'
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet'

const OrdersScreen = () => {
  const { width } = Dimensions.get('screen')
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation()

  const { data } = useFetchGet('http://192.168.1.34:8000/api/orders')
  
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
        <View className='items-start mt-5' style={{width: width * 0.9}}> 
          <Text className='text-2xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Currnet Order</Text>
        </View>
        <View className='items-center justify-center mt-8' style={{width: width * 0.9}}>
          {data && data['Current Order'] != 'No Current Order' ? (
            <OrderCurrentBlock id={data['id']} title={data['Current Order']['resteurant']['title']} image={data['Current Order']['resteurant']['image']} orderTotal={data['Current Order']['order_total']} slug={data['Current Order']['resteurant']['slug']} count={data['Current Order Items']}/>
          ) : (
            <Text className='text-2xl' style={{fontFamily: 'Montserrat-SemiBold'}}>No Current Order</Text>
          )}
        </View>
        <View className='flex-row items-center justify-between mt-8' style={{width: width * 0.9}}> 
          <Text className='text-2xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Past Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllPastOrders')}>
            <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <View className='items-center justify-center mt-8' style={{width: width * 0.9}}>
          {data && data['Past Orders'] != 'No Past Order' ? (
            data['Past Orders'].map((item) => (
              <OrderPastBlock id={item['id']} key={item.id} title={item['resteurant']['title']} image={item['resteurant']['image']} count={Object.keys(data['Past Orders']).length} price={item['order_total']} slug={item['resteurant']['slug']} />
            ))
          ) : (
            <Text>No Past Orders</Text>
          ) }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrdersScreen