# CROS SETUP
```
php artisan make:middleware Cors
```

`app\Http\Middleware\Cors.php`

```
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', '*');
        
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
        
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application');

        // Add this line to expose Content-Range header
        $response->headers->set('Access-Control-Expose-Headers', 'Content-Range');
        
        return $response;
    }
}
```

`bootstrap\app.php`

```
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use App\Http\Middleware\Cors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
         // Add CORS HERE
         $middleware->append(Cors::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```


```
php artisan make:controller api/v1/CategoryController --resource
```

```
php artisan make:controller api/v1/BrandController --resource
```

`app\Http\Controllers\api\v1\CategoryController.php`

```
<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Define pagination parameters
        $perPage = $request->input('perPage', 2); // Default to 10 items per page
        $currentPage = $request->input('page', 1);
        
        // Get paginated categories
        $categories = Category::paginate($perPage);
        $totalItems = $categories->total(); // Total items in the dataset

            
        // // Set the Content-Range header
        // $response = new Response($categories->items());
        // $response->header('Content-Range', 'categories '.$categories->firstItem().'-'.$categories->lastItem().'/'.$categories->total());
        
        // return $response;

        $response = response()->json($categories);
    
        // Set Content-Range header
        $response->headers->set('Content-Range', 'items '.$currentPage.'-'.$categories->count().'/' . $totalItems);
    
        return $response;
    }

    public function store(Request $request)
    {
        $category = Category::create($request->validate(['name' => 'required|string']));
        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(Request $request, Category $category)
    {
        $category->update($request->validate(['name' => 'required|string']));
        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
```
`app\Http\Controllers\api\v1\BrandController.php`
```
<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Brand;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Define pagination parameters
        $perPage = $request->input('perPage', 2); // Default to 10 items per page
        $currentPage = $request->input('page', 1);
        
        // Get paginated categories
        $categories = Brand::paginate($perPage);
        $totalItems = $categories->total(); // Total items in the dataset

            
        // // Set the Content-Range header
        // $response = new Response($categories->items());
        // $response->header('Content-Range', 'categories '.$categories->firstItem().'-'.$categories->lastItem().'/'.$categories->total());
        
        // return $response;

        $response = response()->json($categories);
    
        // Set Content-Range header
        $response->headers->set('Content-Range', 'items '.$currentPage.'-'.$categories->count().'/' . $totalItems);
    
        return $response;
    }

    public function store(Request $request)
    {
        $brand = Brand::create($request->validate(['name' => 'required|string']));
        return response()->json($brand, 201);
    }

    public function show(Brand $brand)
    {
        return $brand;
    }

    public function update(Request $request, Brand $brand)
    {
        $brand->update($request->validate(['name' => 'required|string']));
        return response()->json($brand);
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json(null, 204);
    }
}
```


`routes\api.php`

```
// V1
use App\Http\Controllers\api\v1\CategoryController as V1CategoryController;
use App\Http\Controllers\api\v1\BrandController as V1BrandController;

Route::prefix('v1')->group(function () {
    Route::apiResource('categories', V1CategoryController::class);
    Route::apiResource('brands', V1BrandController::class);
});
```

```
http://192.168.1.111:8000/api/v1/categories?page=1
```

```
http://192.168.1.111:8000/api/v1/brands?page=1
```

```
npm create vite react_admin_laraval_small_shop
```

```
√ Select a framework: » React
√ Select a variant: » JavaScript

Scaffolding project in C:\Users\windows_rig1\Documents\GitHub\react_admin_laraval_small_shop...

Done. Now run:
```

```
cd react_admin_laraval_small_shop
npm install
npm run dev
```

```
npm add react-admin
```

```
https://www.npmjs.com/package/ra-data-simple-rest
```

```
npm i ra-data-simple-rest
```

# Env Setup

`.env`

```
VITE_API_BASE_URL="http://192.168.1.111:8000/api/v1"
```

# Folder Setup

```
project_name -> src -> components

project_name -> src -> components -> admin

project_name -> src -> components -> admin -> category

project_name -> src -> components -> admin -> brand
```

# File Setup

```
project_name -> src -> components -> admin -> category -> CategoryList.jsx

project_name -> src -> components -> admin -> category -> BrandList.jsx
```

`CategoryList.jsx`

```
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basepath='/categories'/>
            <DeleteButton basepath='/categories' />
        </Datagrid>
    </List>
);
```

`BrandList.jsx`

```
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const BrandList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="image_path" />
            <EditButton basepath='/brands'/>
            <DeleteButton basepath='/brands' />
        </Datagrid>
    </List>
);
```

`App.jsx`

```
import { useState } from 'react'

import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { CategoryList } from './components/admin/category/CategoryList';
import { BrandList } from './components/admin/brand/BrandList';

// Custom data provider for react-admin
const customDataProvider = (baseUrl) => ({
  getList: async (resource, params) => {
      const { data, total } = await fetch(`${baseUrl}/${resource}`)
          .then(response => response.json());

      return {
          data,
          total,
      };
  },
  getOne: async (resource, params) => {
      const { id } = params;
      const record = await fetch(`${baseUrl}/${resource}/${id}`)
          .then(response => response.json());

      return {
          data: record,
      };
  },
  create: async (resource, params) => {
      const { data } = await fetch(`${baseUrl}/${resource}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(params.data),
      }).then(response => response.json());

      return {
          data,
      };
  },
  update: async (resource, params) => {
      const { id, data } = params;
      const updatedRecord = await fetch(`${baseUrl}/${resource}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      }).then(response => response.json());

      return {
          data: updatedRecord,
      };
  },
  delete: async (resource, params) => {
      const { id } = params;
      await fetch(`${baseUrl}/${resource}/${id}`, {
          method: 'DELETE',
      });

      return {
          data: { id }, // Returning the deleted record's ID
      };
  },
  // Other methods (getMany, getManyReference, etc.) can be implemented similarly
});

// Use the custom data provider in your App component
function App() {
  return (
      <>
          <Admin dataProvider={customDataProvider(import.meta.env.VITE_API_BASE_URL)}>
              <Resource name="categories" list={CategoryList} />
              <Resource name="brands" list={BrandList} />
          </Admin>
      </>
  );
}

export default App;
```
