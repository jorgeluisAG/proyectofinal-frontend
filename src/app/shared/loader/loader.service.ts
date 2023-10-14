import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private _loading: boolean = false;
    private _message: string | undefined = '';

    loadingStatus: any = new Subject();

    get loading(): boolean {
        return this._loading;
    };

    set loading(value) {
        this._loading = value;
        this.loadingStatus.next({loader: value, message: this._message});
    };

    startLoading(message?: string) {
        this._message = message;
        this.loading = true;
    };

    stopLoading() {
        this.loading = false;
    };
}
