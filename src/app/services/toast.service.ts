import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  loading: any;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async openToast(header: string = null, message: string, color: string = 'dark', duration: number = 2000) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      duration: duration,
      color: color
    });

    toast.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message
    });

    await this.loading.present();
  }

  async closeLoading(){
    this.loadingController.dismiss();
  }
}
