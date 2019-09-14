import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title : 'Home',
      url : '/menu/home'
    },
    {
      title : 'Team',
      url : '/menu/team'
    }
  ];

  selectetPath = '';

  constructor(private router : Router) {
    this.router.events.subscribe((event : RouterEvent)=>{
      this.selectetPath = event.url;
    });
   }

  ngOnInit() {
  }



}
