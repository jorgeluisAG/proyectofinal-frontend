import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderService} from './loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    public loading: boolean = false;
    public message: string | undefined;

    constructor(
        private loaderService: LoaderService
    ) { }

    private loadingSubscription: Subscription | undefined;

    ngOnInit() {
        this.loadingSubscription = this.loaderService.loadingStatus.subscribe(
            (next: any) => {
                this.loading = next.loader;
                this.message = next.message || 'Estamos verificando tu usuario...';
            });
    };

    ngOnDestroy() {
        // @ts-ignore
        this.loadingSubscription.unsubscribe();
    };

}
