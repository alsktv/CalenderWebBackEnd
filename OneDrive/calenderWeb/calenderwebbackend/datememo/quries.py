from .models import DateMemo

#ts처럼 받는 인자에도 type을 작성해주어야 함!!!
def get_dateMemo(pk:int):
  return DateMemo.objects.get(pk=pk)

def get_dateMemos():
  return DateMemo.objects.all()