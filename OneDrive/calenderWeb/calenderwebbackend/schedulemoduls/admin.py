from django.contrib import admin
from .models import ScheduleModul

@admin.register(ScheduleModul)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    "__str__",
  )
