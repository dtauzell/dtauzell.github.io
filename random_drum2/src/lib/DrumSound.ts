import * as Tone from 'tone';
import { markRaw } from 'vue';

export class DrumSound {
  private player: Tone.Player;
  private isLoaded: boolean = false;

  constructor(sampleUrl: string, volume: number = 0) {
    // Create a new Tone.Player with the drum sample
    this.player = new Tone.Player({
      url: sampleUrl,
      volume: 0,
      autostart: false,
      loop: false,
      onload: () => {
        this.isLoaded = true;
        console.log(`Drum sample loaded: ${sampleUrl}`);
      }
    }).toDestination();

    markRaw(this.player);

  }


  /**
   * Plays the drum sample once
   * @param time - Optional time to schedule the hit (default is immediate)
   */
  public hit(time?: Tone.Unit.Time): void {
    if (!this.isLoaded) {
      console.warn('Drum sample not yet loaded');
      return;
    }

    try {
      // Start the player at the specified time (or immediately)
      this.player.start(0);
    } catch (error) {
      console.error('Error playing drum sample:', error);
    }
  }

  /**
   * Set the volume of the drum
   * @param volume - Volume in decibels (-Infinity to 0)
   */
  public setVolume(volume: number): void {
    this.player.volume.value = volume;
  }

  /**
   * Get the current volume of the drum
   * @returns Current volume in decibels
   */
  public getVolume(): number {
    return this.player.volume.value;
  }

  /**
   * Check if the drum sample is loaded and ready to play
   * @returns True if loaded, false otherwise
   */
  public isReady(): boolean {
    return this.isLoaded;
  }

  /**
   * Connect the drum to a specific audio node instead of destination
   * @param destination - Audio node to connect to
   */
  public connect(destination: Tone.InputNode): void {
    this.player.disconnect();
    this.player.connect(destination);
  }

  /**
   * Dispose of the player and free up resources
   */
  public dispose(): void {
    this.player.dispose();
  }
}