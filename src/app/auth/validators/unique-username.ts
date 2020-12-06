import {Injectable} from '@angular/core';
import {AsyncValidator, FormControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    const { value: username } = control;

    return this.authService.usernameAvailable(username).pipe(
      map(() => null),
      catchError(err => err.error.username
         ? of( { nonUniqueUsername: true })
         : of ({ noConnection: true }))
    );
  }

}
