import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClient } from '@app/models/backend';
import { ControlItem } from '@app/models/frontend';
import { ClientService } from '@app/services/client.service';
import { ItemService } from '@app/services/item.service';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { markFormGroupTouched } from '@app/shared/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPendingOrder } from '../../../../../../models/backend/pending-order/index';
import { PendingOrderService } from '../../../../../../services/pending.service';

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
    @Inject(MAT_DIALOG_DATA) public data: IPendingOrder,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private pendingOrderService: PendingOrderService,
    private itemService: ItemService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.getClients();
    this.getItems();
    this.initForm();
  }

  initForm():void{
    this.form = this.fb.group({
      id: [
        null
      ],
      item: [
        null,
        {
          updateOn: 'blur',
          validators:[
            Validators.required
          ]
        }
      ],
      quantity: [
        null,
        {
          updateOn: 'blur',
          validators:[
            Validators.required
          ]
        }
      ],
      client: [
        null,
        {
          updateOn: 'blur',
          validators:[
            Validators.required
          ]
        }
      ],
      notes: [
        null,
        {
          updateOn: 'blur'
        }
      ]
    })

    var formValues: any = { ...this.data };
    formValues.client = this.data?.client?.id;
    formValues.item = this.data?.item?.id;
    this.form.patchValue(formValues);
  }

  getClients(): void {
    this.loaderService.show();
    this.clientService.get()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.loaderService.hide();
        this.clients = res.map(x => {
            var control: ControlItem = {
              value: x.id as string,
              label: x.name as string
            };
            return control;
          }
        )
      }, error => {
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  getItems():void {
    this.itemService.get()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.loaderService.hide();
        this.items = res.map(x => {
            var control: ControlItem = {
              value: x.id as string,
              label: x.name as string
            };
            return control;
          }
        )
      }, error => {
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  onSubmit():void {

    if(this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    var res: any = this.form.value;

    var pendingOrder: IPendingOrder = { ...res };
    pendingOrder.client = this.extractData(res.client, this.clients);
    pendingOrder.item = this.extractData(res.item, this.items);

    this.loaderService.show();
    this.pendingOrderService.save(pendingOrder)
      .then(res => {
        this.loaderService.hide();
        this.notificationService.toast("La información se almacenó exitosamente", "success");
        this.dialogRef.close(res);
      }).catch(error=>{
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  extractData(id: string, list: any[]): IClient | null {
    var item = list.find(x=>x.value == id);

    if(!item) {
      return null;
    }

    return {
      id: item?.value as string,
      name: item?.label
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
