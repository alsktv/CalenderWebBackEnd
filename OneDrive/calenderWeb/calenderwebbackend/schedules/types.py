import strawberry
import strawberry.django
from . import models
from strawberry import auto

@strawberry.django.type(models.Schedule)
class ScheduleType:
  pk: int
  user: auto
  description : auto
  date: auto
  is_checked: auto

@strawberry.type
class StatusType:
  status: str

