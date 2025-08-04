import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/Products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, CarouselSlideDirective } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  imports: [RouterLink , SearchPipe ,CurrencyPipe , CarouselModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  handleClick(event: Event): void {
    event.stopPropagation(); // Stops the event from bubbling up
  }
  private readonly productService = inject(ProductService)
  private readonly cartService = inject(CartService)
    myProducts: Iproduct[] = []
    searchItem : string = '';

  
  
  ngOnInit(): void {
    this.getProdocts()
  
    
  }

  getProdocts(){
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
