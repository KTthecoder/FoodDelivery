from cartApp.serializers import *
from ordersApp.models import *
from homeApp.models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddToCart(request, productId, resteurantId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                product = ProductModel.objects.get(id = productId)
            except ProductModel.DoesNotExist:
                data = {'Error' : 'Product Does Not Exists'}
                return Response(data)

            resteurant = ResteurantModal.objects.get(id = resteurantId)
            user = request.user

            try:
                order = OrderModel.objects.get(user = user, ordered=False)

                try:
                    OrderModel.objects.get(user = user, ordered=False, resteurant = resteurant)
                    orderItem, created = OrderItemModel.objects.get_or_create(product=product, order=order)
                    orderItem.quantity = (orderItem.quantity + 1)
                except:
                    data = {'Error' : 'You Have Current Order'}
                    return Response(data, status=status.HTTP_201_CREATED)

            except OrderModel.DoesNotExist:
                order = OrderModel.objects.create(user=user, ordered=False, resteurant = resteurant) 
                orderItem, created = OrderItemModel.objects.get_or_create(product=product, order=order)
                orderItem.quantity = (orderItem.quantity + 1)

            if request.data:
                orderItem.note = request.data['note']
                orderItem.save()
            else:
                orderItem.note = orderItem.note
                orderItem.save()

            data = {'Response' : 'Product Added Successfully'}
            return Response(data, status=status.HTTP_201_CREATED)

        else:
            data = {'Error' : 'User is not authenticated'}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def DeleteOrder(request, orderId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                order = OrderModel.objects.get(id = orderId)
            except OrderModel.DoesNotExist:
                data = {'Error' : 'Order Does Not Exists'}
                return Response(data)

            order.delete()

            data = {'Response' : 'Order Deleted Succesfully'}
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {'Error' : 'User is not authenticated'}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def RemoveFromCart(request, orderItemId):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                orderItem = OrderItemModel.objects.get(id = orderItemId)
            except OrderItemModel.DoesNotExist:
                data = {'Error' : 'OrderItem Does Not Exists'}
                return Response(data)

            orderItem.quantity = (orderItem.quantity - 1)
            orderItem.save()

            if orderItem.quantity <= 0:
                orderItem.delete()

            data = {'Response' : 'Product Deleted Succesfully'}
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {'Error' : 'User is not authenticated'}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
