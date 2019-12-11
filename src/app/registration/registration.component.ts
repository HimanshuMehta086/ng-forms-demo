import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*')
        ]
      ],
      dateOfBirth: [''],
      password: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }

  get username() {
    return this.form.controls['username'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get phonenumber() {
    return this.form.controls['phonenumber'];
  }

  get dateOfBirth() {
    return this.form.controls['dateOfBirth'];
  }

  get password() {
    return this.form.controls['password'];
  }

  onSubmit() {
    console.log('Form Posted', this.form.value);
  }
}
