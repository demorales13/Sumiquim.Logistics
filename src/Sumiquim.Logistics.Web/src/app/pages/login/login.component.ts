import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscriptions = new Subject();

  constructor(private fb: FormBuilder,
    private route: Router,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private authService: AuthService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        null,
        {
          validators:[
            Validators.required
          ]
        }
      ],
      password: [
        null,
        {
          validators:[
            Validators.required
          ]
        }
      ],
    })
  }

  login() {
    var credentials = this.form.value;

    this.loaderService.show();
    this.authService.login(credentials)
      .then(res => {
        this.loaderService.hide();
        if(res?.user) {
          this.authService.profile(res.user?.uid)
            .pipe(takeUntil(this.subscriptions))
            .subscribe(res=> {
              if(res?.role == 'logistica'){
                this.route.navigate(['/auth/shipment-scheduling/admon']);
              } else {
                this.route.navigate(['/auth/shipment-scheduling/view']);
              }
            }, error => {
              this.authService.logout();
              console.log("Error => ", error);
              this.loaderService.hide();
              this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
            })
        }
      }).catch(error=>{
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

}
