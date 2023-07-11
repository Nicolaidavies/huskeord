import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import FuzzySearch from 'fuzzy-search';

export interface Definition {
  id: number;
  title: string;
  description: string;
  fullText: string[];
}

export interface Searcher<T> {
  search(s: string): T[];
}

@Injectable({
  providedIn: 'root'
})
export class DefinitionsService {
  public definitions$ = new BehaviorSubject<Definition[]>([]);

  private definitions: Definition[] = [
    {
      id: 1,
      title: 'FALKUSE',
      description: 'Klar til kamp',
      fullText: [
        '<b>F</b>unktionering',
        '<b>A</b>mmunition',
        '<b>L</b>ad gevær',
        '<b>K</b>ampvisir',
        '<b>U</b>drustning',
        '<b>S</b>løring',
        '<b>E</b>kstra udstyr',
      ]
    },
    {
      id: 2,
      title: 'RAOFORM',
      description: 'Måludpegning',
      fullText: [
        '<b>R</b>etning',
        '<b>A</b>fstand',
        '<b>O</b>bjekt',
        'I <b>FOR</b>hold til',
        '<b>M</b>ål',
      ]
    },
    {
      id: 3,
      title: 'VAMUK',
      description: 'Genordning',
      fullText: [
        '<b>V</b>åben',
        '<b>A</b>mmunition',
        '<b>M</b>anden',
        '<b>U</b>drustning',
        '<b>K</b>larmelding',
      ]
    },
    {
      id: 4,
      title: 'FADSUM',
      description: 'Status melding, typisk efter kamp',
      fullText: [
        '<b>F</b>anger',
        '<b>A</b>mmunition',
        '<b>D</b>øde',
        '<b>S</b>årede',
        '<b>U</b>drustning',
        '<b>M</b>ateriel',
      ]
    },
    {
      id: 5,
      title: 'VOVS',
      description: 'Ildoverfaldsmåde',
      fullText: [
        '<b>V</b>elovervejet',
        '<b>O</b>verraskende',
        '<b>V</b>oldsomt',
        '<b>S</b>amtidigt',
      ]
    },
    {
      id: 6,
      title: 'FSDOT',
      description: 'Prioriteret liste til enkeltmandens stillingsindtagelse',
      fullText: [
        '<b>F</b>rit skud',
        '<b>S</b>kjul og sløring',
        '<b>D</b>ækning',
        '<b>O</b>bservationsmuligheder',
        '<b>T</b>il- og afgangsveje',
      ]
    },
    {
      id: 7,
      title: 'KANÆVEJFOSKI',
      description: 'Delings stillingsskifte',
      fullText: [
        '<b>K</b>ommando til ildens ophør',
        '<b>A</b>vertissement',
        '<b>NÆ</b>ste stilling',
        '<b>VEJ</b>en dertil',
        '<b>FO</b>rmation',
        '<b>S</b>tøtte',
        '<b>K</b>larmelding',
        '<b>I</b>værksættelse',
      ]
    },
    {
      id: 8,
      title: 'HVITNA',
      description: 'Enkeltmandens fokuspunkter i nærsikring',
      fullText: [
        '<b>H</b>øjrebegrænsninger',
        '<b>V</b>enstrebegrænsninger',
        '<b>I</b>ldåbningslinje (SILD: seneste ildåbningslinje)',
        '<b>T</b>il- og afgangsveje',
        '<b>NA</b>boer',
      ]
    },
    {
      id: 9,
      title: 'AMAIFOKI',
      description: 'Samlet ildoverfald',
      fullText: [
        '<b>A</b>vertissement (advarsel)',
        '<b>M</b>ål',
        '<b>A</b>fstand',
        '<b>I</b>ldfordeling',
        '<b>FO</b>rmation',
        '<b>K</b>larmeldinger',
        '<b>I</b>værksttelse (ved kampstillinger)',
      ]
    },
    {
      id: 10,
      title: 'NÆSOKIK',
      description: 'Gruppeførerens huskeord',
      fullText: [
        '<b>NÆ</b>rsikring',
        '<b>S</b>ituationsmelding',
        '<b>O</b>pbygningskraft (genopbygningskraft)',
        '<b>K</b>oordination',
        '<b>I</b>nformation',
        '<b>K</b>larmelding',
      ]
    },
    {
      id: 11,
      title: 'KANÆFOSKI',
      description: 'Gruppens stillingsskifte',
      fullText: [
        '<b>K</b>ommando til ildens ophør',
        '<b>A</b>vertissement',
        '<b>NÆ</b>ste stilling',
        '<b>FO</b>rmation',
        '<b>S</b>tøtte',
        '<b>K</b>larmelding',
        '<b>I</b>værksættelse',
      ]
    },
    {
      id: 12,
      title: 'SÅSA',
      description: 'Skydeteknik',
      fullText: [
        '<b>S</b>kydestilling',
        '<b>Å</b>ndedræt',
        '<b>S</b>igtebillede',
        '<b>A</b>ftræk',
      ]
    },
    {
      id: 13,
      title: 'GIK – KIG',
      description: 'GIK anvendes i AKP i dagslys, KIG anvendes i AKP i mørke',
      fullText: [
        '<b>G</b>enkendelse',
        '<b>I</b>dentifikation',
        '<b>K</b>endeord',
      ]
    },
    {
      id: 14,
      title: 'MIFSREK',
      description: 'Gruppens/delingens storm',
      fullText: [
        '<b>M</b>ål',
        '<b>I</b>ndbrud',
        '<b>F</b>Formation',
        '<b>S</b>tøtte',
        '<b>RE</b>organisering',
        '<b>K</b>larmeldinger',
      ]
    },
    {
      id: 15,
      title: 'AVUBBE',
      description: 'Håndtering af krigsfanger',
      fullText: [
        '<b>A</b>fvæbne',
        '<b>V</b>isitere',
        '<b>U</b>dspørge',
        '<b>B</b>evogte',
        '<b>B</b>eskytte',
        '<b>E</b>vakuere',
      ]
    },
    {
      id: 16,
      title: 'NOSKA',
      description: 'Gruppeførerens vurdering af terræn',
      fullText: [
        '<b>N</b>øgleområder',
        '<b>O</b>bservations- og ildafgivelsesområder',
        '<b>S</b>kjul, sløring og dækning',
        '<b>K</b>øretøjs- og personelhindringer',
        '<b>A</b>dgangsveje for køretøj',
      ]
    },
    {
      id: 17,
      title: 'OPTISIMU',
      description: 'Gruppeførerens overvejelser',
      fullText: [
        '<b>OP</b>gave',
        '<b>TI</b>d',
        '<b>SI</b>tuation',
        '<b>MU</b>ligheder',
      ]
    },
    {
      id: 18,
      title: 'WHATS',
      description: 'Melding for pansrede køretøjer (NATO standard)',
      fullText: [
        '<b>W</b>heels (Hjul)',
        '<b>H</b>ull (Skrog)',
        '<b>A</b>rmament (bevæbning)',
        '<b>T</b>urret (Tårn)',
        '<b>S</b>pecial features (Særlige kendetegn)',
      ]
    },
    {
      id: 19,
      title: 'SCRIM',
      description: 'Melding for civile køretøjer (NATO standard)',
      fullText: [
        '<b>S</b>hape (form/type: pick-up, minibus mm.)',
        '<b>C</b>olor',
        '<b>R</b>egistration',
        '<b>I</b>dentification mark (særlige kendetegn, f.eks. firmalogo)',
        '<b>M</b>odel',
      ]
    },
    {
      id: 20,
      title: 'LARS',
      description: 'Melding for trukket artilleri, morterer og raketkastere',
      fullText: [
        '<b>L</b>avet (pjecens undervogn, f.eks. 1-akslet med lave ben)',
        '<b>A</b>rmering (bevæbning, f.eks. kort kanon med mundingsbremse)',
        '<b>R</b>ekylsystem (f.eks. over og under kanon)',
        '<b>S</b>kjold (beskyttelsesskjold på pjecen)',
      ]
    },
    {
      id: 21,
      title: 'KROSUS',
      description: 'Melding for helikoptere',
      fullText: [
        '<b>KR</b>oppen',
        '<b>RO</b>torer',
        '<b>S</b>tabilisatorer',
        '<b>U</b>nderstel',
        '<b>S</b>ærlige kendetegn',
      ]
    },
    {
      id: 22,
      title: 'A-H',
      description: 'Personbeskrivelse (NATO standard)',
      fullText: [
        '<b>A</b>ge',
        '<b>B</b>uild (kropsbygning)',
        '<b>C</b>olour (hudfarve)',
        '<b>D</b>istinguishing marks',
        '<b>E</b>levation (højde)',
        '<b>F</b>ace',
        '<b>G</b>ait (gang, haltende, oprejst)',
        '<b>H</b>air',
      ]
    },
    {
      id: 23,
      title: 'SMASH',
      description: 'Postinstruks',
      fullText: [
        '<b>S</b>e/lytte',
        '<b>M</b>elde',
        '<b>A</b>larmere',
        '<b>S</b>lås',
        '<b>H</b>olde forbindelse',
      ]
    },
    {
      id: 24,
      title: 'RAM',
      description: 'Måludpegning, se også RAOFORM',
      fullText: [
        '<b>R</b>etning',
        '<b>A</b>fstand',
        '<b>M</b>ål',
      ]
    },
    {
      id: 25,
      title: 'MAFOI',
      description: 'Samlet ildoverfald, se også AMAIFOKI',
      fullText: [
        '<b>M</b>ål',
        '<b>A</b>fstand',
        '<b>FO</b>rmation',
        '<b>I</b>ldmåde',
      ]
    },
    {
       id: 26,
       title: 'BASKON',
       description: 'Skyttens sammenstød med fjenden',
       fullText: [
        '<b>B</b>eskyd',
        '<b>A</b>fsøg',
        '<b>S</b>ikre',
        '<b>K</b>ontrollere',
        '<b>O</b>rientering',
        '<b>N</b>y stilling',
       ]
    },
    {
       id: 27,
       title: 'ORBBK',
       description: 'Fører værktøj',
       fullText: [
        '<b>O</b>verveje',
        '<b>R</b>ECCE',
        '<b>B</b>eslutte',
        '<b>B</b>efale',
        '<b>K</b>ontrollere',
       ]
    }
  ];
  private storageKey = 'ORDER';
  private searcher: Searcher<Definition>;
  private order: number[];

  constructor() {
    this.order = this.getOrder();
    this.addNewDefinitionsToOrder();
    this.definitions$.next(this.getOrderedDefinitions());

    this.searcher = new FuzzySearch(this.definitions, ['title', 'description', 'fullText'], {
      caseSensitive: false,
    });
  }

  public search(searchText: string) {
    if (!searchText) {
      this.definitions$.next(this.getOrderedDefinitions());
      return;
    }

    const result = this.searcher.search(searchText);
    this.definitions$.next(result);
  }

  public changeOrder(from: number, to: number) {
    this.order.splice(to, 0, this.order.splice(from, 1)[0]);
    this.setOrder(this.order);
    this.definitions$.next(this.getOrderedDefinitions());
  }

  private getOrderedDefinitions(): Definition[] {
    return this.order.map(i => this.definitions.find(d => d.id === i));
  }

  private getOrder(): number[] {
    const saved = localStorage.getItem(this.storageKey);
    const defaultOrder = this.definitions.map(d => d.id);
    try {
      const parsed = JSON.parse(saved) as number[];
      if (!parsed) {
        return defaultOrder;
      }
      return parsed;
    } catch (e) {
     return defaultOrder;
    }
  }

  private setOrder(order: number[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(order));
  }

  // If we decide to add more definitions later, we'll add their ids to the order
  private addNewDefinitionsToOrder() {
    const missingDefinitions = this.definitions.filter(d => !this.order.includes(d.id));
    missingDefinitions.forEach(d => this.order.push(d.id));
    this.setOrder(this.order);
  }
}
