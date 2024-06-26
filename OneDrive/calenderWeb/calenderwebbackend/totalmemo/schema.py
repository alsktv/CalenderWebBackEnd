import strawberry
import typing
from .types import TotalMemoType
from . import quries


@strawberry.type
class Query: 
  totalmemo: TotalMemoType = strawberry.field(resolver= quries.get_totalMemo)
  totalMemos : typing.List[TotalMemoType] = strawberry.field(resolver = quries.get_totalMemos)