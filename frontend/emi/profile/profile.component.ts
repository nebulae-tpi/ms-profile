import { environment as ENV } from './../../../../environments/environment';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent implements OnInit {

  userDetails: KeycloakProfile = {};
  enviroment = ENV;

    constructor(private keycloakService: KeycloakService,
      private translationLoader: FuseTranslationLoaderService) {
        this.translationLoader.loadTranslations(english, spanish);

    }

    async ngOnInit() {
        this.userDetails = await this.keycloakService.loadUserProfile();
    }

    goToEditKeycloakAccount(){
      window.open(
        this.enviroment.keycloak.url + '/realms/' + this.enviroment.keycloak.realm + '/account/',
        '_blank'
      );
    }
}
