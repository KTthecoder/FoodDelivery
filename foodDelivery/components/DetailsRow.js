import { View, Text, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsBlock from './DetailsBlock'

const DetailsRow = ({title, last, products, resteurantId}) => {
    const { width, height } = Dimensions.get('screen')
    const [items, setItem] = useState([])

    const FilterProducts = () => {
        for(var i = 0; i<Object.keys(products).length; i++){
            if(products[i].menuCategory === title){
                items.push(products[i])
            }
        }
    }

    useEffect(() => {
        FilterProducts()
    }, [])

    return (
        <View className='w-screen bg-white items-center pt-5 rounded-xl mt-5 mb-5 pb-5'>
            <View style={{width: width * 0.9}}>
                <Text className='text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{title}</Text>
                {items && items.map((value, nr) => (
                    <DetailsBlock key={nr} data={value} resteurantId={resteurantId}/>
                ))}
            </View>
        </View>
    )
}

export default DetailsRow