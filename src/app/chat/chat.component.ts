import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User, UserInfo } from 'firebase';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(
          ':enter',
          [
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({opacity: 1, transform: 'translateY(0px)'})
              )
            )
          ],
          {optional: true}
        )
      ])
    ])
  ]
})
export class ChatComponent implements AfterViewInit {
  newMessageBody: string;
  messages$: Observable<Message[]>;
  user?: User;

  private messageCollection: AngularFirestoreCollection<Message>;

  constructor(db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.messageCollection = db.collection<Message>('messages', ref => ref.orderBy('datePosted'));
    this.messages$ = this.messageCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        return {id: action.payload.doc.id, ...action.payload.doc.data()};
      })),
      map(messages => messages.slice(-15))
    );

    this.messages$.subscribe(() => this.scrollToBottom());

    afAuth.user.pipe(first()).subscribe(user => this.user = user);
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth'}));
  }

  trackById(index: number, message: Message): string {
    return message.id;
  }

  send(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.newMessageBody) {
      return;
    }

    this.messageCollection.add({
      user: this.user.toJSON() as UserInfo,
      body: this.newMessageBody,
      datePosted: new Date().getTime()
    });

    this.newMessageBody = '';
  }
}
