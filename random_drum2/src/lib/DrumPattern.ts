import { DrumSound } from '@/lib/DrumSound';

export class DrumPattern {
    private drumSound: DrumSound;
    private hits: String[] = [];

    constructor(drumSound: DrumSound) {
        this.drumSound = drumSound;
    }

    addHit(hitSpec: String) {
        this.hits.push(hitSpec);
    }

    getDrum(): DrumSound {
        return this.drumSound;
    }

    getHits(): String[] {
        return this.hits;
    }
    
}




