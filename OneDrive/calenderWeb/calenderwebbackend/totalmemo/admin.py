from django.contrib import admin
from .models import Totalmemo


@admin.register(Totalmemo)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    "__str__",
  )
