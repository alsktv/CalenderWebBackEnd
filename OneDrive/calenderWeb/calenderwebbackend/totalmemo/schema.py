import strawberry
import typing
from .types import TotalMemoType
from . import quries
from . import mutations


@strawberry.type
class Query: 
  totalMemo: TotalMemoType = strawberry.field(resolver= quries.get_totalMemo)
  totalMemos : typing.List[TotalMemoType] = strawberry.field(resolver = quries.get_totalMemos)

@strawberry.type
class Mutation:
  put_totalMemo : TotalMemoType = strawberry.field(resolver=mutations.put_totalMemo) 