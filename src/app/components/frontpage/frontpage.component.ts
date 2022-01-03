import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SettingsComponent} from '../settings/settings.component';
import {Definition, DefinitionsService} from '../../services/definitions.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import FuzzySearch from 'fuzzy-search';

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
    const searcher = new FuzzySearch(this.definitionsService.definitions, ['title', 'description', 'fullText'], {
      caseSensitive: false,
    });

    this.definitions$ = this.searchText$.pipe(
      map(s => {
        if (!s) {
          return this.definitionsService.definitions;
        }

        return searcher.search(s);
      })
    );
  }

  async showSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });

    await modal.present();
  }

}
