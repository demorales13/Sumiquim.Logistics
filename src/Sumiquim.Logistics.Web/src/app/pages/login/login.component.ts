import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES } from '@app/data/roles.const';
import { IUser } from '@app/models/backend';
import { AuthService } from '@app/services/auth.service';
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
    private notificationService: NotificationService,
    private authService: AuthService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        'jlroman@sumiquim.com',
        {
          validators: [
            Validators.required
          ]
        }
      ],
      password: [
        'Sumiquim123*',
        {
          validators: [
            Validators.required
          ]
        }
      ],
    })
  }

  login() {
    const credentials = this.form.value;

    this.authService.login(credentials)
      .pipe(takeUntil(this.subscriptions))
      .subscribe({
        next: (response) => {
          const user = response.data as IUser;
          if (user.role === ROLES.PLANNER) {
            this.route.navigate(['/auth/shipment-scheduling/admon']);
          } else {
            this.route.navigate(['/auth/shipment-scheduling/view']);
          }
        },
        error: (error) => {
          console.error("Error => ", error);
          this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
        }
      });
  }

}
