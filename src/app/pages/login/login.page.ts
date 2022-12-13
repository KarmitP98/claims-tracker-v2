import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('loginForm', {static: false}) form!: NgForm;
  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit() {
  }
  
  handleSubmit = () => {
  //   TODO: Implement normal login
  }
  
  handleGoogleLogin = () => {
  //   TODO: Implement Google Login
  }

}
