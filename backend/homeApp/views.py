from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from accountApp.models import *
from accountApp.serializers import *
from ordersApp.models import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def HomeView(request):
    if request.user.is_authenticated: 
        if request.method == 'GET':
        
            # categories = CategoryModel.objects.all()
            # categoriesSerializer = CategoriesSerializer(categories, many = True)

            # resteurants = ResteurantModal.objects.all()
            # resteurantsSerializer = ResteurantsSerializer(resteurants, many = True)

            user = request.user
            

            response = {
                'Order Items Count' : None,
                'Delivery Address' : None,
                'Categories' : None,
                'Italian' : None,
                'Fast Food' : None,
                'Asian' : None,
                'All Resteurants' : None
            }

            italian = None
            fastFood = None
            asian = None
            delivery = None

            try:
                order = OrderModel.objects.get(user=user, ordered=False) 
                orderItem = OrderItemModel.objects.filter(order=order).count()
                response['Order Items Count'] = orderItem
            except OrderModel.DoesNotExist:
                orderItem = {'Error' : 'No Orders'}
                response['Order Items Count'] = orderItem

            try:
                resteurants = ResteurantModal.objects.all()
                resteurantsSerializer = ResteurantsSerializer(resteurants, many = True)
                response['All Resteurants'] = resteurantsSerializer.data
            except ResteurantModal.DoesNotExist:
                resteurantsSerializer = {'Error' : 'No Resteurants'}
                response['All Resteurants'] = resteurantsSerializer

            try:
                categories = CategoryModel.objects.all()
                categoriesSerializer = CategoriesSerializer(categories, many = True)
                response['Categories'] = categoriesSerializer.data
            except CategoryModel.DoesNotExist:
                categoriesSerializer = {'Error' : 'Categories is empty'}
                response['Categories'] = categoriesSerializer

            try:
                italian = CategoryModel.objects.get(title = 'Italian')
                italianSerializer = CategoriesResteurantsSerializer(italian)
                response['Italian'] = italianSerializer.data.get('resteurants')[:8]
            except CategoryModel.DoesNotExist:
                italianSerializer = {'Error' : 'Italian Category is empty'}
                response['Italian'] = italianSerializer

            try:
                fastFood = CategoryModel.objects.get(title = 'Fast Food')
                fastFoodSerializer = CategoriesResteurantsSerializer(fastFood)
                response['Fast Food'] = fastFoodSerializer.data.get('resteurants')[:8]
            except CategoryModel.DoesNotExist:
                fastFoodSerializer = {'Error' : 'Fast Food Category is empty'}
                response['Fast Food'] = fastFoodSerializer

            try:
                asian = CategoryModel.objects.get(title = 'Asian')
                asianSerializer = CategoriesResteurantsSerializer(asian)
                response['Asian'] = asianSerializer.data.get('resteurants')[:8]
            except CategoryModel.DoesNotExist:
                asianSerializer = {'Error' : 'Asian Category is empty'}
                response['Asian'] = asianSerializer

            try:
                delivery = DeliveryInfoModel.objects.get(user = request.user, current = True)
                deliverySerializer = DeliveryInfoSerializer(delivery)
                response['Delivery Address'] = deliverySerializer.data
            except DeliveryInfoModel.DoesNotExist:
                deliverySerializer = {'Error' : 'No Delivery Info'}
                response['Delivery Address'] = deliverySerializer

            return Response(response, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'Bad Request'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ResteurantsByCategory(request, slug):
    if request.method == 'GET':
        category = CategoryModel.objects.get(slug = slug)

        try:
            category = CategoryModel.objects.get(slug = slug)
            resteurants = CategoriesResteurantsSerializerBig(category)
            return Response(resteurants.data, status=status.HTTP_200_OK)
        except CategoryModel.DoesNotExist:
            data = {'Error' : 'This Category is Empty'}
            return Response(data, status=status.HTTP_200_OK)

    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ResteurantDetails(request, slug):
    if request.method == 'GET':
        try:
            resteurant = ResteurantModal.objects.get(slug = slug)
            products = ProductModel.objects.filter(resteurant = resteurant)
            categories = ProductModel.objects.filter(resteurant = resteurant).values_list('menuCategory', flat=True).distinct()
            resteurantsSerializer = ResteurantsSerializer(resteurant)
            productsSerializer = ProductSerializer(products, many = True)

            response = {
                'resteurant' : resteurantsSerializer.data,
                'categories' : categories,
                'products' : productsSerializer.data,
            }

            return Response(response, status=status.HTTP_200_OK)
        except CategoryModel.DoesNotExist:
            data = {'Error' : 'This Resteurant Does Not Exists'}
            return Response(data, status=status.HTTP_200_OK)

    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

