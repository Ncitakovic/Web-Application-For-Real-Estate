import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.canLogout();

  }
  logout_flag :boolean = false;
  logout(){

    localStorage.clear();
    this.router.navigate(['']);
    this.logout_flag=false;
  }

  canLogout(){

    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(korisnik) this.logout_flag = true;
    var  self = this;
    setTimeout(function () {
      self.canLogout();
    }, 50);
  }



  // navItems = [
  //   { path: '/users/dashboard', name: 'Dashboard' },
  //   { path: '/property/new', name: 'Add New Property' },
  //   { path: '/property/search', name: 'Find Property' },
  //   { path: '/property/listing', name: 'My Listing' },
  //   { path: '/users/profile/edit', name: 'My Profile' }
  // ];
}
