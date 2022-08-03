import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private ruter:Router){

  }
  canActivate(){
       let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
       if(korisnik){
         if(korisnik.tip=='admin') return true;
          else {
            this.ruter.navigate(['']);
            return false;
          }
       }
        else {
          this.ruter.navigate(['']);
          return false;
        }
  }

}


