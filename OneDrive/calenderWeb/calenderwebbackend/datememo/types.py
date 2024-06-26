import strawberry
import strawberry.django
from . import models
from strawberry import auto

@strawberry.django.type(models.DateMemo)
class DatememoType:
  pk: int
  user: auto
  description :auto
  date: auto