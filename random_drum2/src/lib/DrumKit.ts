import { DrumSound } from '@/lib/DrumSound';

export class DrumKit {
    private sounds: DrumSound[] = [];

    addSound(sound: DrumSound): void {
        this.sounds.push(sound);
    }

    listSounds(): void {
        console.log("DrumKit contains:");
        this.sounds.forEach((s, index) => {
            console.log(`${index + 1}: ${s.getName}`);
        });
    }

    getSounds(): DrumSound[] {
        return this.sounds;
    }
}

export const DrumKitA = new DrumKit();
DrumKitA.addSound(new DrumSound("kick", "Kick", "/samples/kick.wav", 0, 0.5, 0.25, 0.17));
DrumKitA.addSound(new DrumSound("hihat", "Hi-Hat", "/samples/hihat.wav", 0, 0.14, 0.35, 0.72));
DrumKitA.addSound(new DrumSound("snare", "Snare", "/samples/snare.wav", 0, 0.3, 0.35, 0.1));
DrumKitA.addSound(new DrumSound("tom", "Tom", "/samples/tom.wav", 0, 0.15, 0.25, 0.05));



