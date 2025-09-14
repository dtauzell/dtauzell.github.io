import { DrumPattern } from '@/lib/DrumPattern';
import { DrumKit } from '@/lib/DrumKit';
import { DrumHit } from '@/lib/DrumHit';
import { NoteType } from './NoteType';

export function generatePattern(kit: DrumKit, measures: number = 4): DrumPattern[] {
    const patterns: DrumPattern[] = [];
    const sounds = kit.getSounds();

    // Generate a pattern for each drum sound
    sounds.forEach(sound => {
        console.log(`Create pattern for sound: ${sound.getName()}`)
        const pattern = new DrumPattern(sound);
        const quantization = sound.getQuantization();
        

        for (let measure = 0; measure < measures; measure++) {
            // Generate random hits for this drum
            for (let beat = 0; beat < quantization; beat++) {
                let noteType = NoteType.SIXTEENTH;
                let hitProbability = 0;

                if (beat % 4 === 0) {
                    noteType = NoteType.QUARTER;
                } else if (beat % 2 === 0) {
                    noteType = NoteType.EIGHTH;
                } else {
                    noteType = NoteType.SIXTEENTH;
                }

                const spec = timeSpec(measure, beat, quantization);
                pattern.addHit(new DrumHit(spec, sound, noteType, Math.random()));
            }
        }


        patterns.push(pattern);
    });

    return patterns;
}

function timeSpec(measure: number, beat: number, quantization: number) {
    const qn = quarterNote(beat, quantization);
    const sn = sixteenthNote(beat, quantization);

    return `${measure}:${qn}:${sn}`
}

function quarterNote(beat: number, quantization: number): number {
    switch (quantization) {
        case 4:
            return beat;
        case 8:
            return Math.floor(beat / 2);
        case 16:
            return Math.floor(beat / 4);
        default:
            return 0;
    }
}

function sixteenthNote(beat: number, quantization: number): number {
    switch (quantization) {
        case 4:
            return 0;
        case 8:
            return (beat % 2) * 2;
        case 16:
            return beat % 4;
        default:
            return 0;
    }
}