///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {PropertyService} from "../api/client/properties/property.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  ) {this.createForm(); }

  ngOnInit() {
  }

  createForm() {
    this.addPropertyForm = this.fb.group({
      name: [null, Validators.required ],
      address: [null,Validators.required],

    });
  }
  createProperty(value) {
    this.propertyService.createProperty(value);
  }

}
