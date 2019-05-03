import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';

@NgModule({
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
