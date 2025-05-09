from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
  name = models.CharField(max_length=20 ,default = "")
  email = models.CharField(max_length=30 , null=True , blank = True)
  image = models.ImageField(null=True , blank=True)

  
  def __str__(self):
    return self.username


