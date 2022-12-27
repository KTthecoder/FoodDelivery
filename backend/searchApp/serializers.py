from rest_framework import serializers
from homeApp.models import *

class CategoriesSerializerImage(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'title', 'image', 'slug']