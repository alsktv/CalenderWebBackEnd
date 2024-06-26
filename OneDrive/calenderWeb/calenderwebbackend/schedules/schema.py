import strawberry
import typing
from .types import ScheduleType
from . import quries


@strawberry.type
class Query: 
  schedule: ScheduleType = strawberry.field(resolver= quries.get_schedule)
  schedules : typing.List[ScheduleType] = strawberry.field(resolver = quries.get_schedules)