import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from 'src/app/components/frontpage/frontpage.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: FrontpageComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
