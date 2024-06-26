import strawberry
import typing
from .types import ScheduleModuleType
from . import quries


@strawberry.type
class Query: 
  schedule: ScheduleModuleType = strawberry.field(resolver= quries.get_scheduleModule)
  schedules : typing.List[ScheduleModuleType] = strawberry.field(resolver = quries.get_scheduleModules)