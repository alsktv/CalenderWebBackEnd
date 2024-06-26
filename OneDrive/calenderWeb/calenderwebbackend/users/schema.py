import strawberry
import typing
from .types import UserType
from . import quries


@strawberry.type
class Query: 
  user: UserType = strawberry.field(resolver= quries.get_user)
  users : typing.List[UserType] = strawberry.field(resolver = quries.get_users)