import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
name:string="chat";
message:string;
isLoading=false;
currentUserId=1;
//chats: Observable<any[]>;
chat = [
  {id:1,sender:1,message:'hi  there!'},
  {id:2, sender:0, message:"Hey! How are you?"},
   {id:3, sender:1, message:"I'm doing well."}
]
  constructor() { }

  ngOnInit() {
  }

  sendMessage(){}

}
