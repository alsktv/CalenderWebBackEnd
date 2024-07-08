import strawberry
import typing
from .types import DatememoType
from . import quries
from . import mutations


@strawberry.type
class Query: 
  dateUserMemos: typing.List[DatememoType] = strawberry.field(resolver= quries.get_dateMemo)
  dateAllMemos : typing.List[DatememoType] = strawberry.field(resolver = quries.get_dateMemos)

@strawberry.type
class Mutation:
  putUserMemo : DatememoType = strawberry.field(resolver=mutations.put_dateMemo)
  postUserMemo : DatememoType = strawberry.field(resolver=mutations.post_dateMemo)