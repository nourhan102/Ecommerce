import { CanActivateFn, Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const logedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const ID = inject(PLATFORM_ID)


  if (isPlatformBrowser(ID)) {
    if (localStorage.getItem('myToken') !== null) {
      router.navigate(['/home'])
      return false;
      
    }else{
      return true;
    }
    
  }
  else{
    return false
  }
  
};
