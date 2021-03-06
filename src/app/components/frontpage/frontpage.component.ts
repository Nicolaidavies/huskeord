import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SettingsComponent} from '../settings/settings.component';
import {Definition, DefinitionsService} from '../../services/definitions.service';
import {BehaviorSubject, Observable} from 'rxjs';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})
export class FrontpageComponent implements OnInit {

  public definitions$: Observable<Definition[]>;

  public searchText$ = new BehaviorSubject('');

  constructor(
    private modalController: ModalController,
    private definitionsService: DefinitionsService,
  ) { }

  ngOnInit() {
    this.definitions$ = this.definitionsService.definitions$;
    this.searchText$.subscribe(s => {
      this.definitionsService.search(s);
    });
  }

  async showSettingsModal() {
    this.resetSearchText();

    const modal = await this.modalController.create({
      component: SettingsComponent,
    });

    await modal.present();
  }

  resetSearchText() {
    // Reset search
    this.definitionsService.search('');
    this.searchText$.next('');
  }

}
