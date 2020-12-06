import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSignedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isSignedIn$ = this.authService.isSignedIn$;
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(console.log);
  }
}
