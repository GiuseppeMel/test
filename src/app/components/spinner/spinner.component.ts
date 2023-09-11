import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoader$: BehaviorSubject<boolean>;

  constructor(
    private _spinnerService: SpinnerService
  ) {
    this.isLoader$ = this._spinnerService.isLoading$
  }
}
