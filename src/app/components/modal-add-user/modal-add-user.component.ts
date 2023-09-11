import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.scss']
})
export class ModalAddUserComponent implements OnInit {

  formUser!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      gender: [null, Validators.required],
      status: [null, Validators.required]
    })
  }

}
