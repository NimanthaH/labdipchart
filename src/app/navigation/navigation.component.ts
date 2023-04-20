import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  navbarTitile:string = "Labdip Chart";
  menuList = [
    {
      "text": "Labdip Chart",
      "icon": "reorder",
      "routerLink": "/labdipChart"
    },
    {
      "text": "Thread Shade",
      "icon": "reorder",
      "routerLink": "/threadShade"
    },
    {
      "text": "Settings",
      "icon": "settings",
      "routerLink": "/settings"
    },
]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLightTheme : boolean = false;
  themeName? : string | null;
  
  constructor(private breakpointObserver: BreakpointObserver,
    public loaderService:LoaderService) {}

  navbarSelect(title:any){
    this.navbarTitile = title;    
  }


  ngOnInit(){
    this.isLightTheme = localStorage.getItem('theme') === "Light" ? true :false;
    this.themeName = localStorage.getItem('theme') === "Light" ? "Dark" : "Light";
  }

  storeThemeSelection(){
    localStorage.setItem('theme', this.isLightTheme ? "Light" : "Dark");
    this.themeName = localStorage.getItem('theme') === "Light" ? "Dark" : "Light";
  }

}
