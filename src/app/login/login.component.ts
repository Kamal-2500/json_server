import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { Router } from '@angular/router';
import { AuthguardServiceService } from '../authguard-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid!: String;
  password!: String;
  login = new Login();
  message!: String;
  returnURL!: String;

  model: Login = { username: "admin", password: "abc" }

  constructor(private router: Router,
    private authguard: AuthguardServiceService) { }

  ngOnInit(): void {
    this.returnURL = '/voucher';
    this.authguard.logout();
  }

  onLogin(form: NgForm){
    if (form.invalid) {
      return;
    } else {
      if (form.value.username == this.model.username && form.value.password == this.model.password) {
        console.log("Login successful");
        localStorage.setItem('isLoggedIn',"true");
        localStorage.setItem('token',form.value.username);
        this.router.navigate([this.returnURL]);
      } else {
        this.message = "Please check your username and password"; 
      }
      
    }
  }

}
