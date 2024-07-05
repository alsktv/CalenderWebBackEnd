from .models import Schedule
from users.models import User
from .types import ScheduleType, StatusType
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ParseError, NotFound


def add_schedule( description: str , user:int ,date:str) -> ScheduleType:
    # pk = Schedule.objects.all().count() + 1
   #create를 할 때 pk값을 넣어주지 않아도 django에서 알아서 값을 할당해줌.
    new_schedule = Schedule.objects.create( description= description , user=User.objects.get(pk = user) , date=date )

    return ScheduleType(pk = new_schedule.pk ,  description= description , user=User.objects.get(pk = user), date =date)



def put_schedule_isChecked(pk:int):
    try:
        schedule = Schedule.objects.get(pk = pk)
        schedule.is_checked = not schedule.is_checked
        schedule.save()
        return schedule
    except Schedule.DoesNotExist:  #입력값의 type이 다를 때, 반드시 table(객체)이름에 DoesNotExist적용해야함.
        raise ParseError("Pk must be int")
    except ObjectDoesNotExist: #입력된 pk의 대응되는 값이 존재하지 않을 떄
        raise NotFound(detail=f"Schedule with pk {pk} does not exist.")



def delete_schedule(pk:int):
    try:
       schedule = Schedule.objects.get(pk = pk)
       schedule.delete()
       # gql에서 return 값은 이런식으로 type클레스를 이용하여 반환해 주어야 함.
       return StatusType(status="ok")
    except ObjectDoesNotExist:
        #NotFound는 값을 찾을 수 없을 때, ParseError는 입력 형식이 잘못되었을 때 사용함. 둘다 함수이기에 안에 메세지를 넣을 수 있음
        raise NotFound(detail=f"Schedule with pk {pk} does not exist.")
    

    

