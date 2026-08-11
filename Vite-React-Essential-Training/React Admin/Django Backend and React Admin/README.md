To convert the Laravel `CategoryController` logic to Django view logic, I'll use Django's `views`, `serializers`, and `pagination` for the API. Here's the equivalent implementation:

### Django Setup:
1. **Model** (Assumed that you already have a `Category` model in `models.py`):
    ```python
    from django.db import models

    class Category(models.Model):
        id = models.BigAutoField(primary_key=True)
        name = models.CharField(max_length=255)

        def __str__(self):
            return self.name

        class Meta:
            db_table = 'category'
    ```

2. **Serializer** (In `serializers.py`):
    ```python
    from rest_framework import serializers
    from backend.models import Category

    class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = Category
            fields = '__all__'
    ```

3. **Pagination** (In `pagination.py`):
    ```python
    from rest_framework.pagination import PageNumberPagination
    from rest_framework.response import Response

    class CustomPagination(PageNumberPagination):
        # Set default page size
        page_size = 2  # Default number of items per page (you can modify it)
        
        # Allow the client to set the page size with a query parameter, if necessary
        page_size_query_param = 'perPage'
        
        # Set the maximum page size limit
        max_page_size = 100

        def get_paginated_response(self, data):
            """
            This method overrides the default pagination response to include custom headers.
            """
            total_items = self.page.paginator.count  # Total number of items
            current_page = self.page.number  # Current page number
            
            # Create the response with paginated data
            response = Response(data)
            
            # Set custom Content-Range header
            response.headers['Content-Range'] = f'items {current_page}-{len(data)}/{total_items}'
            
            return response

    ```


3. **Views** (In `views.py`):
    Here, we will use Django REST Framework's generic views for listing, creating, updating, and deleting categories.

    ```python
    from rest_framework import generics
    from rest_framework.response import Response
    from rest_framework.pagination import PageNumberPagination
    from backend.models import Category
    from .serializers import CategorySerializer
    from .pagination import CustomPagination  # Import the custom pagination class

    # Custom pagination class to handle Content-Range header
    class CustomPagination(PageNumberPagination):
        page_size = 2  # Default number of items per page

        def get_paginated_response(self, data):
            response = Response(data)
            total_items = self.page.paginator.count
            current_page = self.page.number
            response.headers['Content-Range'] = f'items {current_page}-{len(data)}/{total_items}'
            return response

    class CategoryListCreateView(generics.ListCreateAPIView):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer
        pagination_class = CustomPagination

        def get(self, request, *args, **kwargs):
            return super().get(request, *args, **kwargs)

        def post(self, request, *args, **kwargs):
            return super().post(request, *args, **kwargs)

    class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer
    ```

4. **URL Configuration** (In `urls.py`):
    ```python
    from django.urls import path
    from . import views

    urlpatterns = [
        path('categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
        path('categories/<int:pk>/', views.CategoryRetrieveUpdateDestroyView.as_view(), name='category-detail'),
    ]
    ```

### Explanation:
- **Pagination**: The `CustomPagination` class handles pagination and adds a `Content-Range` header similar to the one in your Laravel code.
- **List & Create**: `CategoryListCreateView` handles listing all categories and creating a new one. It uses the `get_paginated_response` to add the `Content-Range` header.
- **Retrieve, Update, Delete**: `CategoryRetrieveUpdateDestroyView` handles showing, updating, and deleting individual categories.
- **Validation**: Django Rest Framework automatically handles validation through the `serializers.py`.

This logic mimics the functionality of your Laravel `CategoryController` but adapted for Django REST Framework.