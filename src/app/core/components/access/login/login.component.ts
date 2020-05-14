import {Component, EventEmitter, Output} from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formAnimation} from '../../../../animations';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  animations: [
    formAnimation
  ]
})
export class LoginComponent {
  stateForm = 'normal';
  loginForm: FormGroup;
  errorMessage = '';
  errorLogin: string;

  @Output() public displayPanel: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/home']);
    });
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/home']);
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/home']);
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
    }, err => {
      this.stateForm = 'invalid';
      setTimeout(() => {
        this.stateForm = 'normal';
      }, 700);
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      this.errorMessage = err.message;
    });
  }

  public displayPanelLogin(): void {
    this.displayPanel.emit('register');
  }
}
