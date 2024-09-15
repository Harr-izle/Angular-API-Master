import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Add mock authentication token
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token'
    }
  });

  // Log the request
  // console.log('Outgoing request', authReq);

  return next(authReq);
};
