from .models import DateMemo
from users.models import User

#ts처럼 받는 인자에도 type을 작성해주어야 함!!!
# 여기서 pk 는 유저의 pk가 아님.
def get_dateMemo(pk:int):
  user = User.objects.get(pk = pk)
  return user.dateMemos.all()

def get_dateMemos():
  return DateMemo.objects.all()