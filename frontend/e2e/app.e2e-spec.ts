import { AppPage } from './app.po';
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "../src/app/app.component";
import {LoginComponent} from "../src/app/login/login.component";
import {TestBed} from "@angular/core/testing";
import {RegisterComponent} from "../src/app/register/register.component";

describe('easypm App', () => {
  let page: AppPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [],
      providers: []
    }),
      page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Easy Property Management!');
  });
});
