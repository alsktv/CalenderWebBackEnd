from .models import Schedule

def get_schedule(pk:int):
  return Schedule.objects.get(pk = pk)

def get_schedules():
  return Schedule.objects.all()