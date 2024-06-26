from django.db import models
from commonmodel.models import CommonModel

class Totalmemo(CommonModel):
  """ 항상 볼 수 있는 메모, 일정 옆에 나타나는 메모임 """
  description= models.TextField(max_length=100 ,default = "")
  user = models.ForeignKey("users.User" , on_delete=models.CASCADE)
  
  def __str__(self):
    return f"{self.user} : {self.description}"
