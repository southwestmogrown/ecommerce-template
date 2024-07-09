from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import products as p
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/products/',
    '/api/products/create/',
    '/api/products/upload',
    '/api/products/<int:id>/reviews',
    '/api/products/top',
    '/api/products/<int:id>/',
    '/api/products/delete/<int:id>/',
    '/api/products/<update>/<int:id>/',
  ]

  return Response(routes)


@api_view(['GET'])
def getProducts(request):
  return Response(p.products)


@api_view(['GET'])
def getProduct(request, id):
  product = None

  for i in p.products:
    if i['_id'] == id:
      product = i
      break

  return Response(product)