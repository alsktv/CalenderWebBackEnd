from .models import DateMemo
from users.models import User
from rest_framework.exceptions import ParseError ,NotFound
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime

# pk는 유저의 pk를 의미함 . date는 문자열 형태를 말함.
def put_dateMemo(pk:int, date:str , description:str):
   try:
    memo = DateMemo.objects.filter(user__pk = str(pk)).get(date = date)
    memo.description = description
    memo.save()
    return memo
   except DateMemo.DoesNotExist:  #입력값의 type이 다를 때, 반드시 table(객체)이름에 DoesNotExist적용해야함.
        raise ParseError("memo Dose Not Exist")
   except ObjectDoesNotExist: #입력된 pk의 대응되는 값이 존재하지 않을 떄
        raise NotFound(detail=f"Schedule with pk {pk} does not exist.")

#pk는 유저의 pk를 의미함
def post_dateMemo(pk:int , description:str , date:str):
    try:
      newMemo = DateMemo.objects.create(user = User.objects.get(pk = pk) , description = description , date = datetime.strptime(date, "%Y-%m-%d"))

      return newMemo

    except DateMemo.DoesNotExist:  #입력값의 type이 다를 때, 반드시 table(객체)이름에 DoesNotExist적용해야함.
        raise ParseError("Post Does not work")
    except ObjectDoesNotExist: #입력된 pk의 대응되는 값이 존재하지 않을 떄
        raise NotFound(detail=f"Schedule with pk {pk} does not exist.")


