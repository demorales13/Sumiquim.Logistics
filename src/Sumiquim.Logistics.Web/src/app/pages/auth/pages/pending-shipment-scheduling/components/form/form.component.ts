import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IShippingScheduling } from '@app/models/backend';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingService } from '@app/services/shipping-scheduling.service';
import { markFormGroupTouched } from '@app/shared/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  items!: ControlItem[];
  clients!: ControlItem[];
  courierCompanies!: ControlItem[];
  subscriptions = new Subject();

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IShippingScheduling,
    private notificationService: NotificationService,
    private shippingSchedulingService: ShippingSchedulingService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      shippingSchedulingId: [
        null
      ],
      batch: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }
      ],
      item: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }
      ],
      quantity: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }
      ],
      client: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }
      ],
      guide: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      carrierCompany: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      notes: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      address: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      city: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      code: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      date: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      purchaseOrder: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      salesAdvisor: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      warehouse: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      location: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      schedulingNotification: [
        null,
        {
          updateOn: 'blur'
        }
      ],
      shipmentNotification: [
        null,
        {
          updateOn: 'blur'
        }
      ],
    })

    var formValues: any = { ...this.data };
    this.form.patchValue(formValues);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    var res: any = this.form.value;

    var shipping: IShippingScheduling = { ...res };

    this.shippingSchedulingService.Update(shipping)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.dialogRef.close(res);
      }, error => {
        console.log("Error => ", error);
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
