import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req.clone({
      withCredentials: true
    })).pipe(
      tap(val => {
        switch (val.type) {
          case HttpEventType.Sent:
            console.log(`Request was sent to server`);
            break;
          case HttpEventType.Response:
            console.log(`Got a response from the API`, val);
            break;
        }
      }),
    );
  }
}
