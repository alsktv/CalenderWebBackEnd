import strawberry
import strawberry.django
from . import models
from strawberry import auto

@strawberry.django.type(models.User)
class UserType:
  pk: int
  username : auto
  email : auto
