import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'frontend-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
