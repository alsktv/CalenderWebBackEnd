import strawberry
import typing
from users import schema as users_schema
from schedules import schema as schedules_schema
from schedulemoduls import schema as scheduleModule_schema
from totalmemo import schema as totalmemo_schema
from datememo import schema as datememo_schema



@strawberry.type
class Query(users_schema.Query, schedules_schema.Query , scheduleModule_schema.Query ,totalmemo_schema.Query ,datememo_schema.Query ): #여러개를 상속 받을 수 있음
   pass


@strawberry.type
class Mutation(schedules_schema.Mutation , datememo_schema.Mutation, scheduleModule_schema.Mutation):
   pass


schema = strawberry.Schema(query=Query , mutation=Mutation)