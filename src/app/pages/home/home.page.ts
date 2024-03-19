import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController

  segment = 'chats';
  open_new_chat = false;
  users=[
    {id:1,name:'Murtuza',photo:"https://i.pravatar.cc/385"},
    {id:2,name:'Asim',photo:"https://i.pravatar.cc/385"}, 
    {id:3,name:'Afhan',photo:"https://i.pravatar.cc/385"}, 
    {id:4,name:'Madani',photo:"https://i.pravatar.cc/385"},

  ]
  chatRooms=[
    {id:1,name:'Murtuza',photo:"https://i.pravatar.cc/385"},
    {id:2,name:'Asim',photo:"https://i.pravatar.cc/385"}, 
    {id:3,name:'Afhan',photo:"https://i.pravatar.cc/385"}, 
    {id:4,name:'Madani',photo:"https://i.pravatar.cc/385"},

  ]

  constructor( private router:Router) {}

  ngOnInit() {}

  logout() {
    this.popover.dismiss();
  }
  onsegmentchange($event: any) {
    console.log(event);
  }

  newChat() {
    this.open_new_chat = true;
  }
  onWILLdissmiss($event:any){


  }
  dismiss(){
    this.modal.dismiss();
    this.open_new_chat = false;

  }
  startchat(item:any){
    
  }
  getchat(item){
    this.router.navigate(['/','home','chats',item?.id])

  }
}
