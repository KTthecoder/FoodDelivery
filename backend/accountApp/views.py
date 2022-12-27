from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_tokens_for_user(request):
    user = request.user
    refresh = RefreshToken.for_user(user)

    data =  {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    return Response(data, status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def RegisterPage(request):
    if request.method == "POST":
        account = AccountSerializer(data = request.data)
        if account.is_valid():
            data = {}
            username = account.data["username"]
            password = account.data["password"]
            email = account.data["email"]

            user = User.objects.create_user(username, email, password)
            user.save()
            data = {'Response' : 'User created Succesfully'}
            return Response(data)
        else:
            data = {'Response' : 'Username or email is already taken!'} 
            return Response(data)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddDeliveryInfo(request):
    if request.method == "POST":
        delivery = DeliveryInfoSerializer(data = request.data)
        if delivery.is_valid():
            delivery.save()
            data = {'Success' : 'Delivery Info Added Succesfully'}
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def DeliveryInfoGet(request):
    if request.method == 'GET':
        try:
            deliveries = DeliveryInfoModel.objects.all()
            deliveriesSerializer = DeliveryInfoSerializer(deliveries, many = True)
            return Response(deliveriesSerializer.data, status=status.HTTP_200_OK)
        except DeliveryInfoModel.DoesNotExist:
            data = {'Error' : 'No Delivery Info'}
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def DeliveryInfoEdit(request, id):
    if request.method == "PUT":
        
        try:
            delivery = DeliveryInfoModel.objects.get(id = id)
            deliverySerializer = DeliveryInfoSerializer(data=request.data, instance=delivery)
            if deliverySerializer.is_valid():
                deliverySerializer.save()
                data = {'Response' : 'Delivery Address Exists'}
                return Response(deliverySerializer.data, status=status.HTTP_200_OK)

        except DeliveryInfoModel.DoesNotExist:
            data = {'Response' : 'Delivery Address Does Not Exists'}
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def DeliveryInfoGetByID(request, id):
    if request.method == 'GET':
        try:
            deliveries = DeliveryInfoModel.objects.get(id = id)
            deliveriesSerializer = DeliveryInfoSerializer(deliveries)
            return Response(deliveriesSerializer.data, status=status.HTTP_200_OK)
        except DeliveryInfoModel.DoesNotExist:
            data = {'Error' : 'No Delivery Info'}
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FavoriteResteurantsGet(request):
    if request.method == 'GET':
        favorite = FavoriteResteurantsModel.objects.filter(user = request.user)
        favoriteSerializer = FavoriteResteurantsSerializer(favorite, many = True)
        print(favorite)

        return Response(favoriteSerializer.data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddToFavorite(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            try:
                FavoriteResteurantsModel.objects.get(user = request.user, resteurant = request.data['resteurant'])
                data = {'Success' : 'Favorite Resteurant Currently Added'}
                return Response(data, status=status.HTTP_200_OK)
            except:
                favorite = FavoriteSerializer(data = request.data)
                if favorite.is_valid():
                    favorite.save()
                    data = {'Success' : 'Favorite Resteurant Added'}
                    return Response(data, status=status.HTTP_200_OK)
               
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def DeleteFromFavorite(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            try:
                favorite = FavoriteResteurantsModel.objects.get(user = request.user, resteurant = request.data['resteurant'])
                favorite.delete()
                data = {'Success' : 'Favorite Resteurant Deleted'}
                return Response(data, status=status.HTTP_200_OK)
            except:
                data = {'Error' : 'You don not have this resteurant in favorite'}
                return Response(data, status=status.HTTP_200_OK)
               
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ProfileView(request):
    if request.user.is_authenticated:
        if request.method == "GET":
            profile = UserModel.objects.get(user = request.user)
            profileSerializer = UserModelSerializer(profile)
            return Response(profileSerializer.data, status=status.HTTP_200_OK)
        else:
            data = {'Error' : 'Bad Request'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FavoriteResteurantsGetByID(request, resteurantId):
    if request.method == 'GET':
        try:
            favorite = FavoriteResteurantsModel.objects.get(resteurant = resteurantId, user = request.user)
            favoriteSerializer = FavoriteSerializer(favorite)
            return Response(favoriteSerializer.data, status=status.HTTP_200_OK)
        except:
            data = {'Error' : 'No Favorite'}
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)