import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent implements OnInit {

    userDetails: KeycloakProfile;

    constructor(private keycloakService: KeycloakService) {

    }

    async ngOnInit() {
        this.userDetails = await this.keycloakService.loadUserProfile();
    }
}
