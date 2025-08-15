import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "@app/services/loader.service";
import { delay, finalize, Observable } from "rxjs";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    count = 0;
    constructor(private spinner: LoaderService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show();

        this.count++;

        return next.handle(req)
            .pipe(
                delay(200),
                finalize(() => {
                    this.count--;
                    if (this.count == 0) this.spinner.hide();
                })
            );
    }

}