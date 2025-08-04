import { CategorieService } from './../../core/services/Categories/categorie.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/Products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategorie } from '../../shared/interfaces/icategorie';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-home',
  imports: [ CarouselModule , RouterLink , CurrencyPipe , SearchPipe  , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {


 
  handleClick(event: Event): void {
    event.stopPropagation(); // Stops the event from bubbling up
  }

  private readonly productService = inject(ProductService);
  private readonly categorieService = inject(CategorieService);
  private readonly cartService = inject(CartService);

  myProducts: Iproduct[] = []
  myCategories: Icategorie[] = []
  searchItem : string = '';



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    pullDrag: false,
    animateIn:true,
    margin:9,
    mergeFit:true,
    merge:true,
    rewind:true,
    dots: false,
    navSpeed: 800,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  MainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  ngOnInit(): void {
    this.CallProduct()

    this.CallCategorie()

   


   
  }

  CallProduct(){
    this.productService.getProducts().subscribe( {


      next:(res)=>{
        console.log(res.data);
        this.myProducts = res.data
        
        
      },
      error:(err)=>{
        console.log(err);
        

      }


    } )
  }

  CallCategorie(){

    this.categorieService.getCategories().subscribe( {


      next:(res)=>{
        console.log(res.data);
        this.myCategories = res.data
        
        
      },
      error:(err)=>{
        console.log(err);
        

      }


    } )
    
  }

  addProductToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



 
}
