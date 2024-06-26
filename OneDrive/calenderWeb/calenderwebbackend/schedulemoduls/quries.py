from .models import ScheduleModul

def get_scheduleModule(pk:int):
  return ScheduleModul.objects.get(pk = pk)

def get_scheduleModules():
  return ScheduleModul.objects.all()