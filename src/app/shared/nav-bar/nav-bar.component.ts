import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  searchText: string = '';

  buscar() {
    console.log('Buscando:', this.searchText);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.getCurrentUser().subscribe((user) => {
      this.isLoggedIn = !user;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  public login(){
    this.router.navigate(['/login']);
  }

}
