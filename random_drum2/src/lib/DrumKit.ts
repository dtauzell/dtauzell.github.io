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
DrumKitA.addSound(new DrumSound("kick", "Kick", "/samples/kick.wav", 0));
DrumKitA.addSound(new DrumSound("hihat", "Hi-Hat", "/samples/hihat.wav", 0));
DrumKitA.addSound(new DrumSound("snare", "Snare", "/samples/snare.wav", 0));
DrumKitA.addSound(new DrumSound("tom", "Tom", "/samples/tom.wav", 0));



