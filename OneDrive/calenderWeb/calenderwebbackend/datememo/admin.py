from django.contrib import admin
from .models import DateMemo

@admin.register(DateMemo)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    "__str__",
    "date"
  )
