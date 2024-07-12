from .models import Totalmemo
from rest_framework.exceptions import NotFound

def put_totalMemo(description:str , pk:int):
  try:
    totalmemo = Totalmemo.objects.get(pk = pk)
    totalmemo.description = description
    totalmemo.save()
    return totalmemo
  except Totalmemo.DoesNotExist:
    raise NotFound
  except ValueError as e:
        # 다른 오류 처리
    print(f"Value error: {e}")
    raise NotFound