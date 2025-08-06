import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailService } from './services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sumiquim';
}
