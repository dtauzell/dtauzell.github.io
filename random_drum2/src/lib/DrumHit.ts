import { DrumSound } from '@/lib/DrumSound';
import { NoteType } from '@/lib/NoteType';


export class DrumHit {
    constructor(public time: string, public sound: DrumSound, public noteType: NoteType, public randomValue: number) {

    }

    isHit(): boolean {
        let hitProbability = 0;
        if (this.noteType == NoteType.QUARTER) {
            hitProbability = this.sound.getQuarterNoteProbability();
        } else if (this.noteType == NoteType.EIGHTH) {
            hitProbability = this.sound.getEighthNoteProbability();
        } else {
            hitProbability = this.sound.getSixteenthNoteProbability();
        }
        return this.randomValue < hitProbability;
    }

    toString(): string {
        return `DrumHit(time: ${this.time}, noteType: ${this.noteType}, randomValue: ${this.randomValue})`;
    }

}