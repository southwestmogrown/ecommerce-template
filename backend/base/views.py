from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer
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
  products = Product.objects.all()
  serializer = ProductSerializer(products, many=True)
  return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, id):
  product = Product.objects.get(_id = id)
  serializer = ProductSerializer(product, many=False)

  return Response(serializer.data)

