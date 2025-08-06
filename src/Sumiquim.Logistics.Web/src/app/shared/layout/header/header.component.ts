import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() collapse!: boolean;
  @Output() collapseEvent = new EventEmitter<void>();

  constructor(
    private route: Router,
    public authService: AuthService) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout().then(res=>{
      this.route.navigate(['/login']);
    })
  }

  onContainerClick(): void {
    this.collapseEvent.emit();
  }

}
