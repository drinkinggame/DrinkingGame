import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}

@Injectable()
export class BeerService {

    starting$: Observable<any>;
    connectionState$: Observable<ConnectionState>;
    error$: Observable<string>;

    messageSubject = new Subject<any>();
    startingSubject = new Subject<any>();
    private hubConnection: any;
    private client: any;
    private server: any;
    window: any = (<any>window);

    constructor() {
        this.start();
    }

    drink() {
        this.server.drink();
    }

    reset() {
        this.server.reset();
    }

    start(): void {
        if (this.window.$.signalR && this.window.$.signalR.BeerHub && this.window.$.signalR.BeerHub.connection) {
            
            this.hubConnection = this.window.$.signalR.BeerHub.connection;
            this.hubConnection.url = `/signalr`;
            this.client = this.window.$.connection.BeerHub.client;
            this.server = this.window.$.connection.BeerHub.server;
            this.client.broadcastMessage = (msg) => {
                 this.messageSubject.next(msg);
            };
            this.client.sendMessage = (msg) => {
                alert(msg);
            };

            this.hubConnection.start()
                .done(() => {
                    this.startingSubject.next();
                })
                .fail((error: any) => {
                    this.startingSubject.error(error);
                });
        }
    }
}