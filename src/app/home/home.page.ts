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
    const idToken = liff.getIDToken();
    this.idToken = idToken;
    liff.getProfile().then(profile => {
      console.log(profile);
      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl;
      this.statusMessage = profile.statusMessage;
      this.userId = profile.userId;
    }).catch(err => console.error(err));
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
      console.error(err);
    });
  }

  onLine() {
    const url = encodeURI("https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1661509225&redirect_uri=http://localhost:8100&state=12345abcde&scope=notify");
    this.http.get(url).subscribe(res => {
      console.log(res);
    }, err=> {
      console.log(err);
    });
  }
}
