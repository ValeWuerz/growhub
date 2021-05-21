import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
import { Photo } from '../photo';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PlantModel } from '../tab1/plant.model';

const { Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: Photo[] = [];
  base: string
  loadedPlant: PlantModel={}
  constructor(private dbService: NgxIndexedDBService) { }

  public async addNewToGallery(plant) {
    // Take a photo
    this.loadedPlant=plant;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });
  
    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
  }
  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    this.loadedPlant.bilder.push(base64Data)
    this.dbService.add('plants',{
      ...this.loadedPlant
      
        })
   /*  const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
   */
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  this.base=await this.convertBlobToBase64(blob) as string
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
