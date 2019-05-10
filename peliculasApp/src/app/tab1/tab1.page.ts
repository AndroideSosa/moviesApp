import { Pelicula, RespuestaMDB } from './../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor( private moviesService: MoviesService,private loadingCtrl: LoadingController ){

  }

  ngOnInit(){ 
    this.moviesService.getFeature().
    subscribe( resp => {
      this.peliculasRecientes = resp.results;
    });
    this.getPopulares(); 
  }

  cargarMas(){
    this.getPopulares();

  }

   async getPopulares() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.moviesService.getPopulares()
    .subscribe(resp => {
      this.loadingCtrl.dismiss();
      const arrTemp = [ ...this.populares, ...resp.results];
      this.populares = arrTemp;
    })
  }

}
