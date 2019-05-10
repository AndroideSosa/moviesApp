import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalComponentsService {

  constructor(private loadingCtrl: LoadingController ) { }

   //Función para presentar loading
   async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading'
    });
    await loading.present();
  }

  //Función para ocultar loading
  dismissLoading(){
    this.loadingCtrl.dismiss();
  }

}

