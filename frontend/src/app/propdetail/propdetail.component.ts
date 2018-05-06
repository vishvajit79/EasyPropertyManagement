import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Property, PropertyService } from '../api/client/properties/property.service';
import {BrowserModule} from "@angular/platform-browser";
import {LoginComponent} from "../login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-propdetail',
  templateUrl: './propdetail.component.html',
  styleUrls: ['./propdetail.component.css']
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
export class PropdetailComponent implements OnInit {

  propId: any;
  propDetail: any;
  searchUnit: string = '';

  constructor(route: ActivatedRoute, propertyService: PropertyService) {
    this.propId = route.snapshot.params['id'];

    propertyService.queryProperties({_id: this.propId}, {limit: 1, offset: 0})
      .subscribe(property => {
        this.propDetail = property;
      });

  }

  ngOnInit() {
  }



}
