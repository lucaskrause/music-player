import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
    name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
    transform(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const mm = minutes.toString().padStart(2, '0');
        const ss = remainingSeconds.toString().padStart(2, '0');

        if (hours > 0) {
            const hh = hours.toString().padStart(2, '0');
            return `${hh}:${mm}:${ss}`;
        }

        return `${mm}:${ss}`;
    }
}
