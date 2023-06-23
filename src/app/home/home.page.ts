import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import liff from '@line/liff';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = 'angular-line-login';
  idToken: any = '';
  displayName = '';
  pictureUrl:any = '';
  statusMessage:any = '';
  userId = '';
  isLoggedin: boolean = false;

  constructor(public http: HttpClient) {

  }

  ngOnInit(): void {
    this.initLine();
  }

  initLine(): void {
    liff.init({ liffId: '1661511591-nd6qWJxq' }, () => {
      if (liff.isLoggedIn()) {
        this.isLoggedin = true;
        this.runApp();
      }
    }, err => {
      console.error(err);
    });
  }

  runApp(): void {
    liff.init({ liffId: '1661511591-nd6qWJxq' }, () => {
      const idToken = liff.getIDToken();
      this.idToken = idToken;
      console.log("Access token is ->" + liff.getAccessToken());
      alert("Access token is ->" + liff.getAccessToken());
      liff.getProfile().then(profile => {
        console.log(profile);
        this.displayName = profile.displayName;
        this.pictureUrl = profile.pictureUrl;
        this.statusMessage = profile.statusMessage;
        this.userId = profile.userId;
      }).catch(err => {
        console.log("err " + err);
        alert("err " + err);
      });
    });
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
  
  login() {
    liff.init({ liffId: '1661511591-nd6qWJxq' }, () => {
      if (liff.isLoggedIn()) {
        this.isLoggedin = true;
        this.runApp();
      } else {
        this.isLoggedin = false;
        liff.login();
      }
    }, err => {
      console.log("init err " + err);
      alert("init err" + err);
    });
  }
}
