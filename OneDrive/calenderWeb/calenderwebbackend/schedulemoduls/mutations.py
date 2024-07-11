from .models import ScheduleModul
from users.models import User
from rest_framework.exceptions import ParseError , NotFound
from django.core.exceptions import ObjectDoesNotExist

#여기서 pk는 유저의 pk를 의미함
def add_scheduleModule(pk:int , description:str):
  try:
    new_module = ScheduleModul.objects.create(user = User.objects.get(pk = pk) , description = description)
    return new_module
  
  except ScheduleModul.DoesNotExist:  
        raise ParseError("Post Does not work")
  except ObjectDoesNotExist:
        raise NotFound(detail=f"Doesn't make module")

