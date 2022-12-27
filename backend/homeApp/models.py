from django.db import models

# Create your models here.
class CategoryModel(models.Model):
    title = models.CharField(max_length=50, blank=False, null=True)
    icon = models.ImageField(upload_to='categoryIcons')
    image = models.ImageField(upload_to='categoryImages')
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

class ResteurantModal(models.Model):
    title = models.CharField(max_length=150, blank=False, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=False, null=True)
    image = models.ImageField(upload_to='resteurantImages')
    deliveryFeePrice = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=True)
    discountDeliveryFeePrice = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    waitingTime = models.CharField(max_length=30, blank=False, null=True)
    slug = models.SlugField(unique=True)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)

    category = models.ForeignKey(CategoryModel, related_name='resteurants', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id) + " - " + str(self.title)

class ProductModel(models.Model):
    title = models.CharField(max_length=120, blank=False, null=True)
    regularPrice = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=True)
    discountPrice = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    description = models.TextField(blank=False, null=True)
    image = models.ImageField(upload_to='productImages')
    slug = models.SlugField(unique=True)
    menuCategory = models.CharField(max_length=50)

    resteurant = models.ForeignKey(ResteurantModal, related_name='products', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
