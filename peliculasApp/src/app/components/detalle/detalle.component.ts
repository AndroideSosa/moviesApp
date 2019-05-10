import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from './../../interfaces/interfaces';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  constructor(  private moviesService: MoviesService,
                private loadingCtrl: LoadingController ) { }

   async ngOnInit() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.moviesService.getPeliculaDetalle( this.id )
    .subscribe( resp=>{
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp=>{
      this.loadingCtrl.dismiss();
      this.actores = resp.cast;
    });

  }

}
