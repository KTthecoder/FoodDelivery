from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from homeApp.models import *
from homeApp.serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def AllCategories(request):
    if request.method == 'GET':
        
        try:
            categories = CategoryModel.objects.all()
            categoriesSerializer = CategoriesSerializerImage(categories, many = True)
            return Response(categoriesSerializer.data, status=status.HTTP_200_OK)
        except CategoryModel.DoesNotExist:
            data = {'Error' : 'Italian Category is empty'}
            return Response(data, status=status.HTTP_200_OK)

    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def SearchResteurants(request, search):
    if request.method == 'GET':
        
        try:
            resteurants = ResteurantModal.objects.filter(title__contains = search)
            resteurantsSerializer = ResteurantsSerializer(resteurants, many = True)
            return Response(resteurantsSerializer.data, status=status.HTTP_200_OK)
        except CategoryModel.DoesNotExist:
            data = {'Error' : 'No resteurants with that name'}
            return Response(data, status=status.HTTP_200_OK)

    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def SearchResteurantsByCategory(request, search, slug):
    if request.method == 'GET':
        try:
            try:
                category = CategoryModel.objects.get(slug = slug)
            except:
                data = {'Error' : 'This category does not exists'}
                return Response(data, status=status.HTTP_200_OK)
                
            resteurants = ResteurantModal.objects.filter(title__contains = search, category = category)
            resteurantsSerializer = ResteurantsSerializer(resteurants, many = True)

            return Response(resteurantsSerializer.data, status=status.HTTP_200_OK)

        except CategoryModel.DoesNotExist:
            data = {'Error' : 'No resteurants with that name'}
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)