import { Component, OnInit } from '@angular/core';

import { Property, PropertyService } from './api/client/properties/property.service';
import {AuthService} from "./core/auth.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Easy Property Management';
  properties: Property[] = [];
  user = firebase.auth();

  constructor(
    private propertyService: PropertyService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location
  ) { }

  logout(){
    this.authService.doLogout()
      .then(() => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
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
