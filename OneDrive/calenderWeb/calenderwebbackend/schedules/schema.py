import strawberry
import typing
from .types import ScheduleType
from . import quries
from .models import Schedule
from users.types import UserType
from users.models import User

@strawberry.type
class Query: 
  schedule: ScheduleType = strawberry.field(resolver= quries.get_schedule)
  schedules : typing.List[ScheduleType] = strawberry.field(resolver = quries.get_schedules)

@strawberry.type
class Mutation:
  
  @strawberry.mutation
  def post_schedule(self, description: str  ,pk :int , user:int ,date:str) -> ScheduleType:
    Schedule.objects.create(pk=pk  , description= description , user=User.objects.get(pk = user) , date="2024-06-28T06:00:00+00:00" )
    return ScheduleType(pk=pk  , description= description , user=user , date = "2024-06-28T06:00:00+00:00" )