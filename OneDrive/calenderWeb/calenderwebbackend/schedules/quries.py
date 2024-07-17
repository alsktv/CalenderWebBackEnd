from .models import Schedule
import datetime

def get_schedule(pk:int):
  return Schedule.objects.get(pk = pk)

def get_schedules():
  return Schedule.objects.all()

def get_delay_schedules(pk: int):
  current_time = datetime.datetime.now()
  return Schedule.objects.filter(date__lt = current_time).filter(is_checked = False).filter(user__pk = pk)