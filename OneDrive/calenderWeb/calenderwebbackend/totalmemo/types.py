import strawberry
import strawberry.django
from . import models
from strawberry import auto

@strawberry.django.type(models.Totalmemo)
class TotalMemoType:
  pk: int
  user: auto
  description :auto
