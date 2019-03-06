import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fs from 'fs';
import * as path from 'path';
import { ipcRenderer, remote, ipcMain } from 'electron';
import IEvent from '../../interfaces/IEvent';

const download = require('image-downloader');


@Injectable()
export class ElectronService {
  private loadEvent$: EventEmitter<void> = null;
  private loadBackup$: EventEmitter<IEvent[]> = null;

  setNormalMenu() {
    ipcRenderer.send("setNormalMenu");
  }

  setLoginMenu() {
    ipcRenderer.send("setLoginMenu");
  }

  createBackUp(events: IEvent[]): Observable<boolean> {
    console.log("triggered create backup");
    return new Observable((observer) => {
      ipcRenderer.on("createBackUp", (event, folder) => {

        const currDate = new Date().getTime();
        console.log(events);

        this.saveImages(events, currDate).then((eventos: IEvent[]) => {
          const file = path.join(folder[0], "backup-" + currDate.toString()) + ".bkp";
          console.log("saving data to file");
          console.log(file);
          fs.writeFile(file, JSON.stringify(eventos), (err) => {
            console.log(eventos);

            if (!err) {
              observer.next(true);
              observer.complete();
            } else {
              console.error(err);
              observer.error(err);
              observer.complete();
            }
          });
        });
      });
    });
  }

  loadBackUp(): EventEmitter<IEvent[]> {

    if (!this.loadBackup$) {
      this.loadBackup$ = new EventEmitter<IEvent[]>();
    }

    ipcRenderer.on('loadBackUp', (event, file) => {
      console.log("triggered load backup");
      fs.readFile(file[0], (error, data: any) => {
        if (!error) {
          this.loadBackup$.emit(JSON.parse(data));
        }
      });
    });

    return this.loadBackup$;
  }

  reloadEvents(): EventEmitter<void> {
    if (!this.loadEvent$) {
      this.loadEvent$ = new EventEmitter<void>();
    }

    ipcRenderer.on('loadEvents', event => {
      this.loadEvent$.emit();
    });

    return this.loadEvent$;
  }

  private createRemainingFolders(date: number, anotherpath: string) {
    const folder = path.join(remote.app.getAppPath(), 'backup', anotherpath, date.toString());
    const folders = folder.split(path.sep);
    let fullpathconcatenation = "";
    folders.forEach(fold => {
      // console.log(fullpathconcatenation);
      fullpathconcatenation += (fold + path.sep);
      if (!fs.existsSync(fullpathconcatenation)) {
        fs.mkdirSync(fullpathconcatenation);
      }
    });
    return folder;
  }

  private saveImages(events: IEvent[], date: number): Promise<IEvent[]> {

    return new Promise((resolve, reject) => {
      const downloadImage: Promise<any>[] = [];
      const downloadAvatar: Promise<any>[] = [];


      events.forEach((event, index) => {

        if (event.image.includes("://") || event.creator.avatar.includes("://")) {


          const folder = this.createRemainingFolders(date, event.creator.name);

          const creatorOptions = {
            url: event.creator.avatar,
            dest: folder,
          };

          const eventOptions = {
            url: event.image,
            dest: folder,
          };


          downloadAvatar.push(download.image(creatorOptions).then(({ filename, image }) => {
            event.creator.avatar = filename;
          }).catch((err) => {
            console.error(err);
            reject(false);
          }));


          downloadImage.push(download.image(eventOptions).then(({ filename, image }) => {
            event.image = filename;
          }).catch((err) => {
            console.error(err);
            reject(false);
          }));


          Promise.all(downloadImage).then(() => {
            Promise.all(downloadAvatar).then(() => {
              resolve(events);
            });
          });
        } else {
          resolve(events);
        }
      });
    });
  }
}
