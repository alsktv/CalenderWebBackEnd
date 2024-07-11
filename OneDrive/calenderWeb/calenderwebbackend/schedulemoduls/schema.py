import strawberry
import typing
from .types import ScheduleModuleType
from . import quries
from . import mutations


@strawberry.type
class Query: 
  scheduleModule: ScheduleModuleType = strawberry.field(resolver= quries.get_scheduleModule)
  scheduleModules : typing.List[ScheduleModuleType] = strawberry.field(resolver = quries.get_scheduleModules)

@strawberry.type
class Mutation: 
  postScheduleModule : ScheduleModuleType = strawberry.field(resolver=mutations.add_scheduleModule)