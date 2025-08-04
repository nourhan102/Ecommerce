import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { DetailsComponent } from './pages/details/details.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [


    {path:'' , redirectTo: 'home' , pathMatch: 'full'} ,

    {path:'' , component:AuthComponent , canActivate: [logedGuard] , title:'auth  !' , children :[
        {path:'login' , loadComponent: ()=> import('./pages/login/login.component').then((c)=> c.LoginComponent) , title: 'login  !'},
        {path:'register' , loadComponent: ()=> import('./pages/register/register.component').then((c)=> c.RegisterComponent) , title: 'register  !'},
        {path:'forgotPass' , loadComponent: ()=> import('./shared/components/ui/forgot/forgot.component').then((c)=> c.ForgotComponent) , title: 'forgotPass  !'},
    ]},

    {path:'' , component:BlankComponent , canActivate: [authGuard] , title:'blank  !' , children :[
        {path:'home' , loadComponent: ()=> import('./pages/home/home.component').then((c)=> c.HomeComponent) , title : 'home  !'},
        {path:'cart' , loadComponent: ()=> import('./pages/cart/cart.component').then((c)=> c.CartComponent) , title : 'cart  !'},
        {path:'products' , loadComponent: ()=> import('./pages/products/products.component').then((c)=> c.ProductsComponent) , title : 'products  !'},
        {path:'categories' , loadComponent: ()=> import('./pages/categories/categories.component').then((c)=> c.CategoriesComponent) , title : 'categories  !'},
        {path:'brands' ,loadComponent: ()=> import('./pages/brands/brands.component').then((c)=> c.BrandsComponent) , title : 'brands  !'},
        {path:'all orders' ,loadComponent: ()=> import('./pages/all-orders/all-orders.component').then((c)=> c.AllOrdersComponent) , title : 'all orders !'},
        {path:'chekout/:id' ,loadComponent: ()=> import('./pages/chekout/chekout/chekout.component').then((c)=> c.ChekoutComponent) , title : 'chekout  !'},
        {path:'details/:id' ,loadComponent: ()=> import('./pages/details/details.component').then((c)=> c.DetailsComponent) , title : 'details  !'},
        {path:'**' , loadComponent: ()=> import('./pages/not-found/not-found.component').then((c)=> c.NotFoundComponent) , title : 'NotFound  !!!' }
    ]},
   
    
];
