import strawberry
import strawberry.django
from . import models
from strawberry import auto
from schedules.types import ScheduleType
import typing

@strawberry.django.type(models.User)
class UserType:
  pk: int
  username : auto
  email : auto
  
  @strawberry.field
  def my_schedule(self) -> typing.List['ScheduleType']:
        user = models.User.objects.get(pk = self.pk)
        return user.schedules.all()
