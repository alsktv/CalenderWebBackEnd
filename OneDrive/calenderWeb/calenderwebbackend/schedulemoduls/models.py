from django.db import models
from commonmodel.models import CommonModel

#모델 이름은 단수로 통일하기
class ScheduleModul(CommonModel):
  """ 자주 사용하는 일정을 모듈화 해서 사용할 수 있게 만든 모델 """
  description= models.CharField(max_length=100 ,default = "")
  user = models.ForeignKey("users.User" , on_delete=models.CASCADE)
  
  def __str__(self):
    return f"{self.user} : {self.description}"
