from django.db import models
from django.contrib.auth.models import User
from homeApp.models import ResteurantModal

# Create your models here.
class DeliveryInfoModel(models.Model):
    street = models.CharField(max_length=150)
    postCode = models.CharField(max_length=30)
    city = models.CharField(max_length=100)
    instructions = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current = models.BooleanField(default=True)

    def __str__(self):
        return self.street

class FavoriteResteurantsModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resteurant = models.ForeignKey(ResteurantModal, related_name='resteurants', on_delete=models.CASCADE)
    favorite = models.BooleanField(default=True)

    def __str__(self):
        return self.resteurant.title + " - " + self.user.username 

class UserModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    phoneNr = models.CharField(max_length=15)

    def __str__(self):
        return self.name + " " + self.lastName