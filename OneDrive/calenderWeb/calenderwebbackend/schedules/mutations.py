from .models import Schedule
from users.models import User

def add_schedule(self, description: str  ,pk :int , user:int ,date:str):
  Schedule.objects.create(pk=pk  , description= description , user=User.objects.get(pk = user) , date=date )
  return Schedule(pk=pk  , description= description , user=user , date = date )