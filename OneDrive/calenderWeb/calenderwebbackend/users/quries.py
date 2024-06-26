from .models import User

#ts처럼 받는 인자에도 type을 작성해주어야 함!!!
def get_user(pk:int):
  return User.objects.get(pk=pk)

def get_users():
  return User.objects.all()