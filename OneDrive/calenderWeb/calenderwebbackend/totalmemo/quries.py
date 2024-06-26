from .models import Totalmemo

#ts처럼 받는 인자에도 type을 작성해주어야 함!!!
def get_totalMemo(pk:int):
  return Totalmemo.objects.get(pk=pk)

def get_totalMemos():
  return Totalmemo.objects.all()