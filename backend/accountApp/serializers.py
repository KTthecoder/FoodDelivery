from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from homeApp.models import ResteurantModal
from homeApp.serializers import *

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class DeliveryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryInfoModel
        fields = '__all__'

class FavoriteResteurantsSerializer(serializers.ModelSerializer):
    resteurantId = serializers.SerializerMethodField('get_resteurant_id')
    resteurantTitle = serializers.SerializerMethodField('get_resteurant_title')
    resteurantRating = serializers.SerializerMethodField('get_resteurant_rating')
    resteurantImage = serializers.SerializerMethodField('get_resteurant_image')
    resteurantDeliveryFeePrice = serializers.SerializerMethodField('get_resteurant_deliveryFeePrice')
    resteurantDiscountDeliveryFeePrice = serializers.SerializerMethodField('get_resteurant_discountDeliveryFeePrice')
    resteurantWaitingTime = serializers.SerializerMethodField('get_resteurant_waitingTime')
    resteurantSlug = serializers.SerializerMethodField('get_resteurant_slug')
    resteurantCategory = serializers.SerializerMethodField('get_resteurant_category')

    class Meta:
        model = FavoriteResteurantsModel
        fields = ['id', 'favorite', 'resteurantId', 'resteurantTitle', 'resteurantRating', 'resteurantDeliveryFeePrice', 'resteurantDiscountDeliveryFeePrice', 'resteurantWaitingTime', 'resteurantSlug', 'resteurantCategory', 'resteurantImage']
    
    def get_resteurant_id(self, favorite):
        return favorite.resteurant.id

    def get_resteurant_title(self, favorite):
        return favorite.resteurant.title

    def get_resteurant_rating(self, favorite):
        return favorite.resteurant.rating

    def get_resteurant_image(self, favorite):
        return favorite.resteurant.image.url

    def get_resteurant_deliveryFeePrice(self, favorite):
        return favorite.resteurant.deliveryFeePrice

    def get_resteurant_discountDeliveryFeePrice(self, favorite):
        return favorite.resteurant.discountDeliveryFeePrice

    def get_resteurant_slug(self, favorite):
        return favorite.resteurant.slug

    def get_resteurant_category(self, favorite):
        return favorite.resteurant.category.title

    def get_resteurant_waitingTime(self, favorite):
        return favorite.resteurant.waitingTime

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FavoriteResteurantsModel
        fields = '__all__'