from rest_framework.urls import urlpatterns,path
from users import views

urlpatterns = [
   path("/jwt-login" ,views.JwtLogin.as_view()),
]
