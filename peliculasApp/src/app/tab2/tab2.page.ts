import { Pelicula } from './../interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avengers', 'Capitana Marvel', 'Shazam', 'El señor de los anillos', 'La vida es bella', 'Logan', 'Thor', 'Aquaman', 'Dumbo'];

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController) {}

  buscar ( event) {
    const valor: string = event.detail.value; 

    if ( valor.length === 0 ){

      this.buscando = false;
      this.peliculas = [];
      return;

    }

    this.buscando = true;
    this.moviesService.buscarPeliculas( valor )
    .subscribe( resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
    });

  }

  async detalle ( id: string ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();

  }

  

}


