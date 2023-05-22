import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination()

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease('C4', '8n')
