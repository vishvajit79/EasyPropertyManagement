///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {PropertyService} from "../api/client/properties/property.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})

export class AddPropertyComponent implements OnInit {
  addPropertyForm: FormGroup;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private fb: FormBuilder
  ) { this.createForm();}

  ngOnInit() {
    this.createForm();
    this.addPropertyForm = this.fb.group({
      name: '',
      address: '',
      units: this.fb.array([ this.createItem()])
    });
    this.deleteItem(0);
  }

  createForm() {
    this.addPropertyForm = this.fb.group({
      name: [null, Validators.required],
      address: [null,Validators.required],
      units: this.fb.array([{
        number: [],
        floor: [],
        rent: []
      }], Validators.required)
    });
  }
  createProperty(value) {
    console.log(value);
    this.propertyService.createProperty(value);
  }

  createItem(): FormGroup {
    return this.fb.group({
      number: '',
      floor: '',
      rent: ''
    });
  }

  get units(): FormArray {
    return this.addPropertyForm.get('units') as FormArray;
  };

  addItem(): void {
    this.units.push(this.createItem());
  }

  deleteItem(id): void {
    this.units.removeAt(id)
  }

}
