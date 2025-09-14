import { DrumPattern } from '@/lib/DrumPattern';
import { DrumKit } from '@/lib/DrumKit';

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
                let hitProbability = 0;

                if (beat % 4 === 0) {
                    hitProbability = sound.getQuarterNoteProbability();
                } else if (beat % 2 === 0) {
                    hitProbability = sound.getEighthNoteProbability();
                } else {
                    hitProbability = sound.getSixteenthNoteProbability();
                }

                // Add some randomness to avoid completely predictable patterns
                hitProbability += (Math.random() - 0.5) * 0.2;
                hitProbability = Math.max(0, Math.min(1, hitProbability)); // Clamp between 0 and 1

                // Determine if we should add a hit at this beat
                if (Math.random() < hitProbability) {
                    // Create a hit specification with beat position and velocity
                    const velocity = 0.5 + Math.random() * 0.5; // Random velocity between 0.5 and 1.0
                    const spec = timeSpec(measure, beat, quantization);

                    console.log(`measure ${measure}, beat: ${beat}, spec: ${spec}`)

                    pattern.addHit(spec);
                }
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