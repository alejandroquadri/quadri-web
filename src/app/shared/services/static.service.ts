import { Injectable } from '@angular/core';
import { tap, startWith } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { ApiService } from './api.service';

// The state saved from the server render
const DATA_KEY = makeStateKey<any>('quadri');

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  data: any;
  data$: any;

  logo = './assets/icons/LogoQuadriFondoBlanco.png';

  constructor(
    private api: ApiService,
    private state: TransferState
  ) { }

  // getStaticData() {
  //   this.data$ = this.api.getObject('quadri');
  //   return new Promise( (resolve, reject) => {
  //     this.data$.subscribe( data => {
  //       this.data = data;
  //       console.log('static data available');
  //       resolve(this.data);
  //     });
  //   });
  // }

  getStaticData() {
    return new Promise( (resolve, reject) => {
      const exists = this.state.get(DATA_KEY, {} as any);
      this.data$ = this.api.getObject('quadri')
      .pipe(
        tap(obj => {
          this.state.set(DATA_KEY, obj);
        }),
        startWith(exists)
        )
        .subscribe( data => {
        this.data = data;
        if (!(Object.keys(this.data).length === 0 && this.data.constructor === Object)) {
          resolve();
        }
      });
    });
  }

}
