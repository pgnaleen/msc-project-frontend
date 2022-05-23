import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    template: ''
})
export abstract class BaseDrawerComponent {

    @Output()
    public dismiss: EventEmitter<boolean> = new EventEmitter<boolean>();

    public abstract reset(): void;
}
