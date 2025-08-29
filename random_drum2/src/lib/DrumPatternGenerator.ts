import { DrumPattern } from '@/lib/DrumPattern';
import { DrumKit } from '@/lib/DrumKit';

export function generatePattern(kit: DrumKit, measures: number = 4): DrumPattern[] {
    const quantization = 16; // 16th notes per measure
    const patterns: DrumPattern[] = [];
    const sounds = kit.getSounds();

    // Generate a pattern for each drum sound
    sounds.forEach(sound => {
        console.log(`Create pattern for sound: ${sound.getName()}`)
        const pattern = new DrumPattern(sound);

        for (let measure = 0; measure < measures; measure++) {
            // Generate random hits for this drum
            for (let beat = 0; beat < quantization; beat++) {
                // Different drums have different probability patterns for more musical results
                let hitProbability = 0.1; // Base probability for random hits

                // Adjust probabilities based on drum type for more musical patterns
                const drumName = sound.getName().toLowerCase();

                if (drumName.includes('kick')) {
                    // Kick drum: emphasize downbeats and common kick patterns
                    if (beat % 4 === 0) hitProbability = 0.8; // Strong on quarter notes
                    else if (beat % 8 === 0) hitProbability = 0.6; // Medium on 8th notes
                    else hitProbability = 0.15; // Lower on other beats
                } else if (drumName.includes('snare')) {
                    // Snare drum: emphasize backbeats
                    if (beat % 8 === 4) hitProbability = 0.9; // Strong on backbeats
                    else if (beat % 4 === 2) hitProbability = 0.7; // Medium on 2 and 4
                    else hitProbability = 0.2; // Lower on other beats
                } else if (drumName.includes('hihat')) {
                    // Hi-hat: more consistent pattern with some variation
                    if (beat % 2 === 0) hitProbability = 0.7; // Strong on 8th notes
                    else hitProbability = 0.4; // Medium on 16th notes
                } else if (drumName.includes('tom')) {
                    // Tom: occasional fills and accents
                    if (beat % 16 === 0) hitProbability = 0.6; // Medium on downbeats
                    else hitProbability = 0.1; // Lower on other beats
                }

                // Add some randomness to avoid completely predictable patterns
                hitProbability += (Math.random() - 0.5) * 0.2;
                hitProbability = Math.max(0, Math.min(1, hitProbability)); // Clamp between 0 and 1

                // Determine if we should add a hit at this beat
                if (Math.random() < hitProbability) {
                    // Create a hit specification with beat position and velocity
                    const velocity = 0.5 + Math.random() * 0.5; // Random velocity between 0.5 and 1.0
                    const quarterNote = Math.floor(beat/4);
                    const sixteenthNote = beat == 0 ? 0 : Math.floor(quantization % beat);
                    const hitSpec = `${measure}:${quarterNote}:${sixteenthNote}`;

                    console.log(`measure ${measure}, beat: ${beat}, spec: ${hitSpec}`)

                    pattern.addHit(hitSpec);
                }
            }
        }


        patterns.push(pattern);
    });

    return patterns;
}




