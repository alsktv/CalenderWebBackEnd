from django.db import models
from commonmodel.models import CommonModel

#모델 이름은 단수로 통일하기
class Schedule(CommonModel):
  """ 전체 일정이 아닌 하나의 일정 . 에를 들어 하루 전체 일정이 아닌 수영, 독서 등을 따로 저장해놓은 모델. 하루에 여러가지 스케쥴을 가질 수 있음"""
  description= models.CharField(max_length=100 ,default = "")
  user = models.ForeignKey("users.User" , on_delete=models.CASCADE)
  date = models.DateTimeField()
  
  def __str__(self):
    return f"{self.user} : {self.description}"
