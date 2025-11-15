import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | null = null;
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/chatHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started');
        this.connectionStatusSubject.next(true);
      })
      .catch(err => {
        console.error('Error while starting SignalR connection: ' + err);
        this.connectionStatusSubject.next(false);
      });
  }

  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        console.log('SignalR connection stopped');
        this.connectionStatusSubject.next(false);
      });
    }
  }

  on(methodName: string, callback: (...args: any[]) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on(methodName, callback);
    }
  }

  off(methodName: string): void {
    if (this.hubConnection) {
      this.hubConnection.off(methodName);
    }
  }

  invoke(methodName: string, ...args: any[]): Promise<any> {
    if (this.hubConnection) {
      return this.hubConnection.invoke(methodName, ...args);
    }
    return Promise.reject('No connection');
  }
}