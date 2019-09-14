import { Injectable } from '@angular/core';
import { tap, startWith, map } from 'rxjs/operators';
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
  logoNegro = './assets/icons/LogoQuadriNegro.png';

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
      this.data$ = this.api.getObject('quadriNew')
      .pipe(
        tap(obj => {
          console.log(obj);
          this.state.set(DATA_KEY, obj);
        }),
        startWith(exists),
      )
      .subscribe( data => {
        this.data = data;
        // lo de abajo es para chequear si el objeto esta vacio
        if (!(Object.keys(this.data).length === 0 && this.data.constructor === Object)) {
          resolve();
        }
      });
    });
  }

  // getStaticData() {
  //   const exists = this.state.get(DATA_KEY, {} as any);
  //   return this.data$ = this.api.getObject('quadriNew')
  //   .pipe(
  //     tap(obj => {
  //       console.log(obj);
  //       this.data = obj;
  //       this.state.set(DATA_KEY, obj);
  //     }),
  //     startWith(exists),
  //     map( obj => {
  //       console.log('en map', obj);
  //       // lo de abajo es para chequear si el objeto esta vacio
  //       if (!(Object.keys(obj).length === 0 && obj.constructor === Object)) {
  //         console.log('no esta vacio, return ', obj);
  //         return obj;
  //       }
  //     })
  //   );
  // }

}
