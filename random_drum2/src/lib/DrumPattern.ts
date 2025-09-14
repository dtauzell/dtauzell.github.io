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

    getHitsAsArray(): number[] {
        const pattern = Array(64).fill(0);
        this.hits.forEach(hit => {
            const parts = hit.split(':');
            const measure = parseInt(parts[0]);
            const quarter = parseInt(parts[1]);
            const sixteenth = parseInt(parts[2]);
            const index = measure * 16 + quarter * 4 + sixteenth;
            if (index < 64) {
                pattern[index] = 1;
            }
        });
        return pattern;
    }
    
    toString(): string {
        const drumName = this.drumSound.getName();
        const hitCount = this.hits.length;
        const hitsStr = this.hits.join(', ');
        return `${drumName} Pattern (${hitCount} hits): [${hitsStr}]`;
    }
    
}




