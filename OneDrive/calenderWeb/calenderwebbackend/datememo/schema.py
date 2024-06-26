import strawberry
import typing
from .types import DatememoType
from . import quries


@strawberry.type
class Query: 
  totalmemo: DatememoType = strawberry.field(resolver= quries.get_dateMemo)
  totalMemos : typing.List[DatememoType] = strawberry.field(resolver = quries.get_dateMemos)