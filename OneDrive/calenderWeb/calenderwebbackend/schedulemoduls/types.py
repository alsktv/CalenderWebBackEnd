import strawberry
import strawberry.django
from . import models
from strawberry import auto

@strawberry.django.type(models.ScheduleModul)
class ScheduleModuleType:
  pk: int
  user: auto
  description : auto
