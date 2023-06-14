from rest_framework import serializers
from .models import *
from homeApp.serializers import *

class OrderSerializer(serializers.ModelSerializer):
    order_total = serializers.FloatField()
    resteurant = ResteurantsSerializer(read_only = True)
    class Meta:
        model = OrderModel
        fields = ['id', 'ordered', 'dataOrdered', 'user', 'order_total', 'resteurant']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    class Meta:
        model = OrderItemModel
        fields = ['id', 'quantity', 'item_total', 'product', 'note']

