import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../api/client/properties/property.service';
import {BrowserModule} from "@angular/platform-browser";
import {LoginComponent} from "../login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import * as firebase from "firebase";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import swal from "sweetalert2";


@Component({
  selector: 'app-propdetail',
  templateUrl: './propdetail.component.html',
  styleUrls: ['./propdetail.component.css']
})
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFirestoreModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [
    LoginComponent
  ],
  bootstrap: [LoginComponent]
})
export class PropdetailComponent implements OnInit {

  propId: any;
  // issues: any;
  propDetail: any = [];
  searchUnit: string = '';

  /**
   * Request issue for report or delete based on value
   * @param propId
   * @param number
   * @param value
   */
  public requestIssue(propId, number, value) {
    firebase.database().ref('issues/' + propId + '/' + number).set({
      number: number,
      value: value
    });
  }

  // Complexity of this function is very slow :(
  // getIssues(number){
  //       this.db.list('/issues/' + this.propId).valueChanges()
  //         .subscribe(eventSnapshots=>{
  //           eventSnapshots.map(event=>{
  //             console.log(event['number']+event['value']);
  //             if(event["number"]===number) {
  //               return true;
  //             }
  //           });
  //         });
  //   return false;
  // }
  constructor(route: ActivatedRoute, propertyService: PropertyService, private db: AngularFireDatabase) {

    this.propId = route.snapshot.params['id'];
    let issue:  any = [];
    this.db.list('/issues/' + this.propId).valueChanges()
      .subscribe(eventSnapshots=>{
        eventSnapshots.map(event=> {
          issue.push(event);
        });
      });

    const dbRefObject = firebase.database().ref().child('/issues/' + this.propId);
    dbRefObject.on('value', snap => console.log(snap.val()));

    propertyService.queryProperties({_id: this.propId}, {limit: 1, offset: 0})
      .subscribe(property => {
        this.propDetail = property;
      });

  }

  ngOnInit() {
    swal({
      title: 'Info!',
      text: 'Please check your console for real-time time issue changes',
      type: 'warning',
      confirmButtonText: 'Cool'
    });
  }


}
