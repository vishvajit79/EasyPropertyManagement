import {Component, NgModule, OnInit} from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Property, PropertyService } from "../api/client/properties/property.service";
import {BrowserModule} from "@angular/platform-browser";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  bootstrap: [LoginComponent]
})
export class UserComponent implements OnInit{
  properties: Property[] = [];
  searchList: String = "";

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {

  }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.queryProperties()
      .subscribe(properties => {
        this.properties = properties;
      });
  }
}
