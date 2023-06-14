import { View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import DeliveryInfoBlock from '../components/DeliveryInfoBlock';
import { useScrollToTop } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';

const DeliveryInfoScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { data } = useFetchGet('http://192.168.1.34:8000/api/address/get')

  return (
    <View className='items-center justify-center'>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <View className='flex-row items-center justify-between mt-3' style={{width: width * 0.9}}>
            <TouchableOpacity onPress={() => navigation.goBack()} className='items-center justify-center flex-2 mb-1' style={{width: 35, height: 35}}>
              <Entypo name="cross" size={40} color="black" />
            </TouchableOpacity>
            <Text className='text-xl flex-1 text-center' style={{fontFamily: 'Montserrat-Medium'}}>Delivery Info</Text>
            <TouchableOpacity className='items-center justify-center flex-2' style={{width: 35, height: 35}} onPress={() => navigation.navigate('DeliveryForm')}>
              <Text className='text-base' style={{fontFamily: 'Montserrat-Medium'}}>Add</Text>
            </TouchableOpacity>
          </View>

          <View className='bg-[#dedede] rounded-xl flex-row px-2 items-center mt-4' style={{width: width * 0.9}}></View>

          <View className='items-start mt-5' style={{width: width * 0.9}}>
            <Text className='text-lg mb-6' style={{fontFamily: 'Montserrat-Medium'}}>Recent locations</Text>
          </View>

          <ScrollView ref={ref} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} style={{width: width * 0.9}}>  
            {data && data.map((item) => (
              <DeliveryInfoBlock key={item.id} street={item.street} city={item.city} id={item.id}/>
            ))}   
          </ScrollView>
          
        </>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default DeliveryInfoScreen