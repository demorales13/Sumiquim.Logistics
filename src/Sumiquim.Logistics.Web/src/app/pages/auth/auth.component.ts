import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  collapse!: boolean;

  constructor() {
    this.onResize();
  }

  ngOnInit(): void {
  }

  onCollapseEvent(): void {
    this.collapse = !this.collapse;
  }

  @HostListener("window:resize", [])
  private onResize() {
    var innerWidth = window.innerWidth;
    if(innerWidth < 500) {
      this.collapse = true;
    }
  }

}
