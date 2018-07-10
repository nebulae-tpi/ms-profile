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
  userRoles: string[] = [];

    constructor(private keycloakService: KeycloakService,
      private translationLoader: FuseTranslationLoaderService) {
        this.translationLoader.loadTranslations(english, spanish);

    }

    async ngOnInit() {
        this.userDetails = await this.keycloakService.loadUserProfile();
        this.userRoles = this.keycloakService.getUserRoles(true);
    }


    async copyTokenToClipBoard() {
      const element = document.createElement('textarea');
      element.id = 'jwtBody';
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.opacity = '0';
      element.value = await this.keycloakService.getToken();
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(document.getElementById('jwtBody'));
    }
}
