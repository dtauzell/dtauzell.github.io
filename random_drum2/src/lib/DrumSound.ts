import * as Tone from 'tone';
import type { StringMappingType } from 'typescript';

export class DrumSound {
  private player: Tone.Player;
  private isLoaded: boolean = false;
  private id: string;
  private name: string;
  private volume: number;
  private quantization: number;
  private minimumVolume: number;
  private onPlayCallback?: () => void;
  private quarterNoteProbability: number;
  private eighthNoteProbability: number;
  private sixteenthNoteProbability: number;

  constructor(id: string, name: string, sampleUrl: string, volume: number = 0, quarterNoteProbability: number = 0.5, eighthNoteProbability: number = 0.5, sixteenthNoteProbability: number = 0.5) {
    // Create a new Tone.Player with the drum sample
    this.id = id;
    this.name = name;
    this.volume = volume;
    this.quantization = 16;
    this.minimumVolume = -50;
    this.quarterNoteProbability = quarterNoteProbability;
    this.eighthNoteProbability = eighthNoteProbability;
    this.sixteenthNoteProbability = sixteenthNoteProbability;
    this.player = new Tone.Player({
      url: sampleUrl,
      volume: this.volume,
      autostart: false,
      loop: false,
      onload: () => {
        this.isLoaded = true;
        console.log(`Drum sample loaded: ${sampleUrl}`);
      }
    }).toDestination();

  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getQuantization(): number {
    return this.quantization;
  }

  public getQuarterNoteProbability(): number {
    return this.quarterNoteProbability;
  }

  public setQuarterNoteProbability(probability: number): void {
    this.quarterNoteProbability = probability;
  }

  public getEighthNoteProbability(): number {
    return this.eighthNoteProbability;
  }

  public setEighthNoteProbability(probability: number): void {
    this.eighthNoteProbability = probability;
  }

  public getSixteenthNoteProbability(): number {
    return this.sixteenthNoteProbability;
  }

  public setSixteenthNoteProbability(probability: number): void {
    this.sixteenthNoteProbability = probability;
  }

  public getMinimumVolume(): number {
    return this.minimumVolume;
  }

  public setMinimumVolume(minimumVolume: number): void {
    this.minimumVolume = minimumVolume;
  }

  public setOnPlayCallback(callback: () => void): void {
    this.onPlayCallback = callback;
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
      // Trigger the callback if set
      if (this.onPlayCallback) {
        this.onPlayCallback();
      }
      
      // Start the player at the specified time (or immediately)
      this.player.start(time);
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