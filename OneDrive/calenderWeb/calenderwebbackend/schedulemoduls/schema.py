import strawberry
import typing
from .types import ScheduleModuleType
from . import quries
from . import mutations
from schedules.types import StatusType


@strawberry.type
class Query: 
  scheduleModule: ScheduleModuleType = strawberry.field(resolver= quries.get_scheduleModule)
  scheduleModules : typing.List[ScheduleModuleType] = strawberry.field(resolver = quries.get_scheduleModules)

@strawberry.type
class Mutation: 
  postScheduleModule : ScheduleModuleType = strawberry.field(resolver=mutations.add_scheduleModule)
  deleteScheduleModule : StatusType = strawberry.field(resolver=mutations.delete_scheduleModule)