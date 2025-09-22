import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http"; 
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, publishReplay, refCount, retry } from "rxjs/operators"; 
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( private router: Router) {}

  erroMessagePrevious: string = "";

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      publishReplay(1),
      refCount(),
      retry(0),
      catchError((error: any) => {
        if (
          !request.headers.get("ignore-atos-interceptor") &&
          request.url.match(":60134|ms-quanto-custa")
        ) {
          if (error.status === 404) {
            this.router.navigate(["404"]);
            return throwError(error);
          } 
        }
        return throwError(error);
      })
    );
  }
}
