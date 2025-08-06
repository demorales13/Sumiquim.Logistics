import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { NAVIGATION_MENU } from './data/navigation-menu.const';
import { INavigationMenu } from './interfaces/navigation-menu.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() collapse!: boolean;
  menu: INavigationMenu[] = NAVIGATION_MENU;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
