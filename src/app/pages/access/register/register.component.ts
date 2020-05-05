import {Component, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formAnimation} from '../../../animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    formAnimation
  ]
})
export class RegisterComponent {
  stateForm = 'normal';
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  @Output() public displayPanel: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       name: ['', Validators.required],
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
   }

   tryFacebookLogin() {
     this.authService.doFacebookLogin()
     .then(res => {
       this.router.navigate(['/home']);
     }, err => console.log(err));
   }

   tryTwitterLogin() {
     this.authService.doTwitterLogin()
     .then(res => {
       this.router.navigate(['/home']);
     }, err => console.log(err));
   }

   tryGoogleLogin() {
     this.authService.doGoogleLogin()
     .then(res => {
       this.router.navigate(['/home']);
     }, err => console.log(err));
   }

   tryRegister(value) {
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = '';
       this.successMessage = 'Your account has been created';
     }, err => {
       console.log(err);
       this.stateForm = 'invalid';
       setTimeout(() => {
         this.stateForm = 'normal';
       }, 700);
       this.registerForm.get('email').markAsTouched();
       this.registerForm.get('name').markAsTouched();
       this.registerForm.get('username').markAsTouched();
       this.registerForm.get('password').markAsTouched();
       this.errorMessage = err.message;
       this.successMessage = '';
     });
   }

  public displayPanelLogin(): void {
    this.displayPanel.emit('login');
  }
}
