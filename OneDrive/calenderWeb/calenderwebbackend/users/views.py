from rest_framework.views import APIView
import jwt
from django.contrib.auth import authenticate
from config import settings
from rest_framework.response import Response
from rest_framework.exceptions import ParseError


class JwtLogin(APIView):
  def post(self,request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username and password:
      user = authenticate(request, username= username, password = password)
      jwtToken = jwt.encode({"pk":user.pk} , settings.SECRET_KEY ,  algorithm="HS256")
      return Response({"token": jwtToken})
    else:
      return ParseError("Didn't wirte username or password")

