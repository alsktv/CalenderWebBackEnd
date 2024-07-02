import strawberry
import typing
from .types import ScheduleType
from . import quries
from . import mutations
from .models import Schedule
from users.types import UserType
from users.models import User


@strawberry.type
class Query: 
  schedule: ScheduleType = strawberry.field(resolver= quries.get_schedule)
  schedules : typing.List[ScheduleType] = strawberry.field(resolver = quries.get_schedules)

@strawberry.type
class Mutation:

 # post_schedule: ScheduleType = strawberry.field(resolver=mutations.add_schedule)
  
  
  @strawberry.mutation
  def post_schedule(self, description: str , user:int ,date:str) -> ScheduleType:
    pk = Schedule.objects.all().count() + 1
    Schedule.objects.create(pk =pk , description= description , user=User.objects.get(pk = user) , date=date )
    return ScheduleType(pk = pk ,  description= description , user=User.objects.get(pk = user), date =date)