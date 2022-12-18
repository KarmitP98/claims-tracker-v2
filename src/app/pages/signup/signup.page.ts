import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  @ViewChild('loginForm', {static: false}) form!: NgForm;
  email: string = '';
  password: string = '';
  username: string = '';
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
