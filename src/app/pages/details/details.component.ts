import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/Products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  private readonly cartService = inject(CartService)
  prodID:any
  prodData:Iproduct | null = null ; 
  


  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.prodID = res.get('id')
      this.productService.GetSpecificProduct(this.prodID).subscribe({
        next:(res)=>{
          this.prodData = res.data
          console.log(this.prodData);
          
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      
    }

   })
    
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
