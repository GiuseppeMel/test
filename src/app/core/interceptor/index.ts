import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SpinnerInterceptor } from "./spinner.interceptor";
import { Provider } from "@angular/compiler/src/compiler_facade_interface";
import { HttpErrorInterceptor } from "./http-error.interceptor";

/** Http interceptor providers in outside-in order */
export const HTTP_INTERCEPTOR_PROVIDERS: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];