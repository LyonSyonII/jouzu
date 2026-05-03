import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly PrimeIcons = PrimeIcons;
  protected count = 0

  protected increase() {
    this.count += 1;
  }
}
