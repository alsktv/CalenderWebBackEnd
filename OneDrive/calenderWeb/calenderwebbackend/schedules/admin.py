from django.contrib import admin
from .models import Schedule

@admin.register(Schedule)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    "__str__",
    "date"
  )
