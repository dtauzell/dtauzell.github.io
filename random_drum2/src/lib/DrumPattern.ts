import { DrumSound } from '@/lib/DrumSound';
import type { DrumHit } from './DrumHit';

export class DrumPattern {
    private drumSound: DrumSound;
    private hits: DrumHit[] = [];

    constructor(drumSound: DrumSound) {
        this.drumSound = drumSound;
    }

    addHit(hitSpec: DrumHit) {
        this.hits.push(hitSpec);
    }

    getDrum(): DrumSound {
        return this.drumSound;
    }

    getHits(): DrumHit[] {
        return this.hits;
    }

    getHitsAsArray(): number[] {
        const pattern = Array(64).fill(0);
        this.hits.forEach(hit => {
            const parts = hit.time.split(':');
            const measure = parseInt(parts[0]);
            const quarter = parseInt(parts[1]);
            const sixteenth = parseInt(parts[2]);
            const index = measure * 16 + quarter * 4 + sixteenth;
            if (index < 64 && hit.isHit()) {
                pattern[index] = 1;
            }
        });
        return pattern;
    }
    
    toString(): string {
        const drumName = this.drumSound.getName();
        const hitCount = this.hits.length;
        const hitsStr = this.hits.map(hit => hit.time).join(', ');
        return `${drumName} Pattern (${hitCount} hits): [${hitsStr}]`;
    }
    
}




