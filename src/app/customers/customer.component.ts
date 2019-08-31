import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

import { debounceTime } from "rxjs/operators";

import { Customer } from "./customer";

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      sendCatalog: true,
      phone: [""],
      notification: "email",
      rating: [null, ratingRange]
    });
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: "Jack",
      lastName: "Harkness",
      email: "jack@torchwood.com"
    });
    // const addressGroup = this.fb.group({
    //   addressType: 'work',
    //   street1: 'Mermaid Quay',
    //   street2: '',
    //   city: 'Cardiff Bay',
    //   state: 'CA',
    //   zip: ''
    // });
    // this.customerForm.setControl('addresses', this.fb.array([addressGroup]));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get("phone");
    if (notifyVia === "text") {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  save() {
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
  }
}
