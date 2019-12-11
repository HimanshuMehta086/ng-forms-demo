import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
  ValidationErrors,
  FormGroup
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { ValidationService } from '../validation.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css']
})
export class RformComponent implements OnInit, OnDestroy {
  form: FormGroup;
  validName = 'Default';
  createSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ) {
    this.form = this.formBuilder.group({
      on: ['', Validators.required],
      name: ['', [Validators.required], this.asyncNameValidator.bind(this)],
      items: new FormArray([])
    });
  }

  get items(): FormArray {
    return this.form.controls['items'] as FormArray;
  }

  addItem() {
    this.items.push(
      this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['default']
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  ngOnInit() {}

  get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  onSubmitHandler() {
    console.log('Form posted', this.form.value);
  }

  asyncNameValidator(
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> {
    let val = control.value;

    return of(val).pipe(
      mergeMap(v => this.validationService.validate(val)),

      map(v => {
        if (v['valid']) {
          return null;
        } else {
          return { async_error: true };
        }
      })
    );

    // promise implementation: should resolve in either case!

    // if (this.validName === val) {
    //   return Promise.resolve(null); //  null for passing validation
    // } else {
    //   return Promise.resolve({ async_error: true });
    // }
  }

  ngOnDestroy(): void {
    this.createSubscription.unsubscribe();
  }
}
