import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from './../../interfaces/interfaces';
import { LoadingController, ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

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
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(  private moviesService: MoviesService,
                private dataLocal: DataLocalService,
                private modalCtrl: ModalController,
                private loadingCtrl: LoadingController ) { }

   async ngOnInit() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading'
    });
    await loading.present();

   this.dataLocal.existePelicula( this.id )
   .then( existe => this.estrella = (existe) ? 'star': 'star-outline'  );
   

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

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella =  (existe) ? 'star': 'star-outline';
  }

}
