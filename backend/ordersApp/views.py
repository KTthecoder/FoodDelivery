from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from accountApp.models import *
from accountApp.serializers import *

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def OrdersView(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            user = request.user
            response = {
                'Current Order' : None,
                'Current Order Items' : None,
                'Past Orders' : None,
            }

            try: 
                order, created = OrderModel.objects.get_or_create(user = user, ordered = False)
                orderSerializer = OrderSerializer(order)
                response['Current Order'] = orderSerializer.data
            except:
                response['Current Order'] = 'No Current Order'

            try: 
                order, created = OrderModel.objects.get_or_create(user = user, ordered = False)
                orderItems = OrderItemModel.objects.filter(order = order).count()
                response['Current Order Items'] = orderItems
            except:
                response['Current Order Items'] = 0

            try: 
                pastOrders = OrderModel.objects.filter(user = user, ordered = True).order_by('-id')[:3]
                pastOrdersSerilizer = OrderSerializer(pastOrders, many = True)
                response['Past Orders'] = pastOrdersSerilizer.data
            except OrderModel.DoesNotExist:
                response['Past Orders'] = 'No Past Order'
            
            return Response(response, status=status.HTTP_200_OK)

        else:
            data = {'Error' : 'Bad Request'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def AllPastOrders(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            user = request.user

            pastOrders = OrderModel.objects.filter(user = user, ordered = True).order_by('-id')

            pastOrdersSerilizer = OrderSerializer(pastOrders, many = True)

            return Response(pastOrdersSerilizer.data, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'Bad Request'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def CurrentOrderDetails(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            user = request.user
            try: 
                order, created = OrderModel.objects.get_or_create(user = user, ordered = False)
                orderItems = OrderItemModel.objects.filter(order = order)
                deliveryInfo = DeliveryInfoModel.objects.get(user = request.user)

                orderSerializer = OrderSerializer(order)
                orderItemSerializer = OrderItemSerializer(orderItems, many = True)
                deliverySerializer = DeliveryInfoSerializer(deliveryInfo)

                response = {
                    'Current Order' : orderSerializer.data,
                    'Current Order Items' : orderItemSerializer.data,
                    'Delivery Info' : deliverySerializer.data,
                }

                return Response(response, status=status.HTTP_200_OK)
            except: 
                response = {
                    'Error' : 'No Current Order',
                }

                return Response(response, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'Bad Request'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def PastOrdersDetails(request, id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            user = request.user
            order, created = OrderModel.objects.get_or_create(user = user, ordered = True, id = id)
            orderItems = OrderItemModel.objects.filter(order = order)
            deliveryInfo = DeliveryInfoModel.objects.get(user = request.user)

            orderSerializer = OrderSerializer(order)
            orderItemSerializer = OrderItemSerializer(orderItems, many = True)
            deliverySerializer = DeliveryInfoSerializer(deliveryInfo)

            response = {
                'Current Order' : orderSerializer.data,
                'Current Order Items' : orderItemSerializer.data,
                'Delivery Info' : deliverySerializer.data,
            }

            return Response(response, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'Bad Request'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)