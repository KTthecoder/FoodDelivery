from rest_framework import serializers
from .models import *

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'title', 'icon', 'slug']

class ResteurantsSerializer(serializers.ModelSerializer):
    categoryTitle = serializers.SerializerMethodField('get_category_title')
    class Meta:
        model = ResteurantModal
        fields = ['id', 'title', 'rating', 'image', 'latitude', 'longitude', 'deliveryFeePrice', 'discountDeliveryFeePrice', 'waitingTime', 'slug', 'categoryTitle']

    def get_category_title(self, resteurant):
        return resteurant.category.title

class CategoriesResteurantsSerializer(serializers.ModelSerializer):
    resteurants = ResteurantsSerializer(read_only = True, many = True)
    class Meta:
        model = CategoryModel
        fields = ['id', 'icon', 'resteurants']

class CategoriesResteurantsSerializerBig(serializers.ModelSerializer):
    resteurants = ResteurantsSerializer(read_only = True, many = True)
    class Meta:
        model = CategoryModel
        fields = ['id', 'title', 'icon', 'resteurants']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['id', 'title', 'regularPrice', 'discountPrice', 'description', 'image', 'slug', 'menuCategory', 'resteurant']

class ResteurantProductSerializer(serializers.ModelSerializer):
    products = ProductSerializer(read_only = True, many = True)
    categoryTitle = serializers.SerializerMethodField('get_resteurant_category')

    class Meta:
        model = ResteurantModal
        fields = ['title', 'rating', 'image', 'latitude', 'longitude', 'deliveryFeePrice', 'discountDeliveryFeePrice', 'waitingTime', 'slug', 'categoryTitle', 'products']
    
    def get_resteurant_category(self, resteurant):
        return resteurant.category.title