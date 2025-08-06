import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched } from '@app/shared/utils';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  usefulLifeform!: FormGroup;
  poundsform!: FormGroup;
  poundsResult!: number;
  usefulLifeResult!: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usefulLifeform = this.fb.group({
      manufacturingDate: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      expirationDate: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      receiptDate: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });

    this.poundsform = this.fb.group({
      pounds: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ]
    });
  }

  daysDiff(from: number, to: number): number{
    let dfrom = new Date(from);
    let dto = new Date(to);

    let days = Math.floor((dfrom.getTime() - dto.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  getMonthsBetween(date1: number, date2: number, roundUpFractionalMonths?: boolean): number {
    //Months will be calculated between start and end dates.
    //Make sure start date is less than end date.
    //But remember if the difference should be negative.
    var startDate = new Date(date1);
    var endDate = new Date(date2);
    var inverse = false;
    if (date1 > date2) {
      startDate = new Date(date2);
      endDate = new Date(date1);
      inverse = true;
    }

    //Calculate the differences between the start and end dates
    var yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    var monthsDifference = endDate.getMonth() - startDate.getMonth();
    var daysDifference = endDate.getDate() - startDate.getDate();

    var monthCorrection = 0;
    //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
    //The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
    if (roundUpFractionalMonths === true && daysDifference > 0) {
      monthCorrection = 1;
    }
    //If the day difference between the 2 months is negative, the last month is not a whole month.
    else if (roundUpFractionalMonths !== true && daysDifference < 0) {
      monthCorrection = -1;
    }

    return (inverse ? -1 : 1) * (yearsDifference * 12 + monthsDifference + monthCorrection);
  };

  onUsefulLifeSubmit(): void {

    if(this.usefulLifeform.invalid) {
      markFormGroupTouched(this.usefulLifeform);
      return;
    }

    var totalLife = this.daysDiff(this.usefulLifeform.value.expirationDate as number,
      this.usefulLifeform.value.manufacturingDate as number);

    var useLife = this.daysDiff(this.usefulLifeform.value.expirationDate as number,
      this.usefulLifeform.value.receiptDate as number);

    var life = useLife * 100 / totalLife;

    var useMonthLife = this.getMonthsBetween(
      this.usefulLifeform.value.receiptDate as number,
      this.usefulLifeform.value.expirationDate as number, 
      false);

    this.usefulLifeResult = {
      totalLife,
      useLife,
      life,
      useMonthLife
    }
  }

  onPoundsSubmit(): void {
    if(this.poundsform.invalid) {
      markFormGroupTouched(this.poundsform);
      return;
    }
    this.poundsResult = this.poundsform.value.pounds * 0.453592;
  }

}
