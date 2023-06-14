"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from homeApp.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
)
from accountApp.views import *
from searchApp.views import *
from ordersApp.views import *
from cartApp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', get_tokens_for_user, name='get_tokens_for_user'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/register', RegisterPage, name='RegisterPage'),
    path('api/home', HomeView, name='HomeView'),
    path('api/category/<str:slug>', ResteurantsByCategory, name='ResteurantsByCategory'),
    path('api/resteurant/<str:slug>', ResteurantDetails, name='ResteurantDetails'),
    path('api/categories/all', AllCategories, name='AllCategories'),
    path('api/address/add', AddDeliveryInfo, name='AddDeliveryInfo'),
    path('api/address/get', DeliveryInfoGet, name='DeliveryInfoGet'),
    path('api/address/edit/<int:id>', DeliveryInfoEdit, name='DeliveryInfoEdit'),
    path('api/address/get/<int:id>', DeliveryInfoGetByID, name='DeliveryInfoGetByID'),
    path('api/search/resteurant/<str:search>', SearchResteurants, name='SearchResteurants'),
    path('api/orders', OrdersView, name='OrdersView'),
    path('api/orders/past', AllPastOrders, name='AllPastOrders'),
    path('api/order/current', CurrentOrderDetails, name='CurrentOrderDetails'),
    path('api/order/past/<int:id>', PastOrdersDetails, name='PastOrdersDetails'),
    path('api/resteurants/favorite', FavoriteResteurantsGet, name='FavoriteResteurantsGet'),
    path('api/product/add/<int:productId>/<int:resteurantId>', AddToCart, name='AddToCart'),
    path('api/product/remove/<int:orderItemId>', RemoveFromCart, name='RemoveFromCart'),
    path('api/order/remove/<int:orderId>', DeleteOrder, name='DeleteOrder'),
    path('api/resteurant/favorite/add', AddToFavorite, name='AddToFavorite'),
    path('api/resteurant/favorite/remove', DeleteFromFavorite, name='DeleteFromFavorite'),
    path('api/profile', ProfileView, name='ProfileView'),
    path('api/search/resteurant/<str:search>/<slug:slug>', SearchResteurantsByCategory, name='SearchResteurantsByCategory'),
    path('api/resteurant/favorite/<int:resteurantId>', FavoriteResteurantsGetByID, name='FavoriteResteurantsGetByID'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
