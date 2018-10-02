import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { fuseAnimations } from '../../../../../core/animations';
import { locale as english } from '../../i18n/en';
import { locale as spanish } from '../../i18n/es';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit {
  userRoles: string[];
  userDetails: KeycloakProfile = {};
  about: any;

  constructor(
    private profileService: ProfileService,
    private translationLoader: FuseTranslationLoaderService,
    private keycloakService: KeycloakService
  ) {
    this.translationLoader.loadTranslations(english, spanish);
    this.profileService.aboutOnChanged.subscribe(about => {
      this.about = about;
    });
  }

  async ngOnInit() {
    this.userDetails = await this.keycloakService.loadUserProfile();
    this.userRoles = this.keycloakService.getUserRoles();
  }
}
