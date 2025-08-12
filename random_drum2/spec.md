This application implements a drum machine that creates random patterns.

Supports Multiple drum machines

- synthesizer baseddrum machine
- sample based drum machine

Drum Types

- Kick
- Snare
- HiHat
- Tom

##UI
The user interface will have two buttons: Play and Generate
The Play button will play or pause the current pattern
The generate button will generate a new pattern and then start playing it

There will be a dropdown that lets you select the drum machine type being used.

There will be the following for each Drum Type:

1. volume control that controls the relative volume
2. mute button that will turn a drum on/off
3. drop down that lets you select the quatization:
   - quarter note
   - eight note
   - sixteenth note

## Random Pattern Algorithm

Generating a new random pattern will use the following pattern:

1. Randomly choose the number of measures: 1, 2 or 4
2. For each Drum Type
   - Randomly choose number of hits for each measure
     1-4 if quantizaitom is quarter note
     1-8 if quantization is eight note
     1-16 if quantization is sixteenth note
   - randomly choose hits for the number of beats chosen
