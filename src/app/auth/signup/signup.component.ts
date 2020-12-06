import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatchPassword} from '../validators/match-password';
import {UniqueUsername} from '../validators/unique-username';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

export const passwordValidators = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(20),
];

export const usernameValidators = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20),
  Validators.pattern(/^[a-z0-9]+$/),
];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', usernameValidators, [this.uniqueUsername.validate]),
    password: new FormControl('', passwordValidators),
    passwordConfirmation: new FormControl('', passwordValidators),
  }, {
    validators: [this.matchPassword.validate]
  });

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/inbox');
        },
        error: err => {
          if (!err.status) {
            this.authForm.setErrors(
              !err.status
                ? { noConnection: true }
                : { unknownError: true }
            );
          }
        }
      });
  }
}
