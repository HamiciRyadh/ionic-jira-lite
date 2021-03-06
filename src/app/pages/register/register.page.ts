import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public register(): void {
    const fullName = this.registerForm.get('fullName').value.trim();
    const email = this.registerForm.get('email').value.trim();
    const telephone = this.registerForm.get('telephone').value.trim();
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;

    if (password === confirmPassword) {
      this.userService.createAccount(fullName, email, telephone, password)
        .then(() => this.redirectToLogin(true));
    } else {
      this.toastController.create({
        message: 'Mots de passes différents.',
        duration: 3000
      }).then(toast => toast.present());
    }
  }

  redirectToLogin(successfulRegistration = false): void {
    if (successfulRegistration) {this.router.navigate(['/login'], {queryParams: {verifyEmail: true}}).then(() => {});}
    else {this.router.navigate(['/login']).then(() => {});}
  }
}
