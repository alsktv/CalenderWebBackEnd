import strawberry
import typing
from .types import ScheduleType, StatusType
from . import quries
from . import mutations



@strawberry.type
class Query: 
  schedule: ScheduleType = strawberry.field(resolver= quries.get_schedule)
  schedules : typing.List[ScheduleType] = strawberry.field(resolver = quries.get_schedules)
  delaySchedules :  typing.List[ScheduleType] = strawberry.field(resolver = quries.get_delay_schedules)

@strawberry.type
class Mutation:

  post_schedule: ScheduleType = strawberry.field(resolver=mutations.add_schedule)

  delete_schedule: StatusType  = strawberry.field(resolver=mutations.delete_schedule)

  put_scheduleIsChecked : ScheduleType = strawberry.field(resolver=mutations.put_schedule_isChecked)

  delete_delay_schedule :StatusType  = strawberry.field(resolver=mutations.delete_delay_schedule)
  