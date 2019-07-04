import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { componentFactoryName } from '../../../../node_modules/@angular/compiler';
import { StaticService, SeoService } from '../../shared';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  id: any;
  application: any;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    // lo de abajo es para poder tomar el id de la requestAnimationFrame, sin salir del componentFactoryName.
    // Esto es en caso que la app lo permitiera
    // this.application = this.route.paramMap
    // .pipe(
    //   switchMap(((params: ParamMap) => params.get('id')))
    // )
    // this.application
    // .subscribe( id => {
    //   console.log(id);
    // });

    // esto de abajo es mucho mas simple. Pregunta una sola vez cuando se entra en el componente
    this.id = this.whichApp(this.route.snapshot.paramMap.getAll('id')[0]);
    this.application = this.staticData.data.apps[this.id];
    this.products = this.staticData.data.products.collections;

    const metaTags = {
      title: `${ this.application.titulo } | Terrazzo Quadri`,
      // tslint:disable-next-line:max-line-length
      description: this.application.texto,
      image: this.application.presentacion,
      slug: `/aplicaciones/${this.id}`,
    };

    this.seoService.generateTags(metaTags);
  }

  routeTo(prod) {
    this.router.navigate([`/productos/${prod}`]);
  }

  whichApp(route): String {
    let app;
    switch (route) {
      case 'pisos-exteriores':
        app = 'pisosExt';
        break;

      case 'pisos-interiores':
        app = 'pisosInt';
        break;

      default:
        app = route;
        break;
    }
    return app;
  }

}
