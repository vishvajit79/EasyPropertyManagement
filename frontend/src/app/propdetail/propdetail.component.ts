import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Property, PropertyService } from '../api/client/properties/property.service';


@Component({
  selector: 'app-propdetail',
  templateUrl: './propdetail.component.html',
  styleUrls: ['./propdetail.component.css']
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
        console.log(this.propDetail);
      });

  }

  ngOnInit() {
  }



}
