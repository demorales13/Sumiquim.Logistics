import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IShippingScheduling } from '@app/models/backend';
import { ControlItem } from '@app/models/frontend';
import { ClientService } from '@app/services/client.service';
import { CourierCompanyService } from '@app/services/courier-company.service';
import { ItemService } from '@app/services/item.service';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingService } from '@app/services/shipping-scheduling.service';
import { markFormGroupTouched } from '@app/shared/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private shippingSchedulingService: ShippingSchedulingService,
    private courierService: CourierCompanyService,
    private itemService: ItemService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [
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

    // if(this.form.invalid) {
    //   markFormGroupTouched(this.form);
    //   return;
    // }

    // var res: any = this.form.value;

    // var shipping: IShippingScheduling = { ...res };

    // console.log("FORM => ", shipping);
    // this.loaderService.show();
    // this.shippingSchedulingService.save(shipping)
    //   .then(res => {
    //     this.loaderService.hide();
    //     this.notificationService.toast("La información se almacenó exitosamente", "success");
    //     this.dialogRef.close(res);
    //   }).catch(error=>{
    //     console.log("Error => ", error);
    //     this.loaderService.hide();
    //     this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
    //   });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
