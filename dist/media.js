export const CONFIRMATION_SOUND_URL='./assets/urna-confirma.mp3';

// The real confirmation recording is decoded once and unlocked by a quiz gesture.
export class ConfirmationSound {
  constructor({AudioCtor=globalThis.Audio,AudioContextCtor=globalThis.AudioContext??globalThis.webkitAudioContext,fetcher=globalThis.fetch}={}){
    this.enabled=true;this.AudioContextCtor=AudioContextCtor;this.fetcher=fetcher;this.context=null;this.bufferPromise=null;this.source=null;this.token=0;
    try{this.media=AudioCtor?new AudioCtor(CONFIRMATION_SOUND_URL):null;if(this.media)this.media.preload='auto';}catch{this.media=null;}
  }
  unlock(){
    if(!this.enabled)return;
    try{
      this.context??=this.AudioContextCtor?new this.AudioContextCtor():null;
      this.context?.resume()?.catch(()=>{});
      if(this.context&&!this.bufferPromise){
        this.bufferPromise=this.fetcher.call(globalThis,CONFIRMATION_SOUND_URL).then(r=>{if(!r.ok)throw Error('Audio unavailable');return r.arrayBuffer();}).then(bytes=>this.context.decodeAudioData(bytes)).catch(()=>null);
      }
    }catch{this.context=null;}
  }
  // Short keypad tone for the simulated typing; silent until the context was unlocked by a gesture.
  beep(frequency=880,duration=.07){
    if(!this.enabled||!this.context||this.context.state!=='running')return;
    try{const osc=this.context.createOscillator(),gain=this.context.createGain();osc.type='square';osc.frequency.value=frequency;gain.gain.value=.035;osc.connect(gain);gain.connect(this.context.destination);osc.start();osc.stop(this.context.currentTime+duration);}catch{}
  }
  setEnabled(value){this.enabled=value;if(!value)this.stop();}
  stop(){this.token++;try{this.source?.stop();}catch{}this.source=null;try{this.media?.pause();}catch{}}
  async play(){
    if(!this.enabled)return true;
    this.stop();const token=this.token;this.unlock();
    try{
      const buffer=await this.bufferPromise;
      if(token!==this.token||!this.enabled)return true;
      if(buffer&&this.context){
        await this.context.resume();if(this.context.state!=='running')throw Error('Audio blocked');
        if(token!==this.token||!this.enabled)return true;
        const source=this.context.createBufferSource();source.buffer=buffer;source.connect(this.context.destination);source.start();this.source=source;return true;
      }
    }catch{}
    try{
      if(token!==this.token||!this.enabled)return true;
      if(!this.media)return false;this.media.currentTime=0;this.media.muted=false;await this.media.play();return true;
    }catch{return false;}
  }
}
