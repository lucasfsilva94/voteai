import test from 'node:test';
import assert from 'node:assert/strict';
import {ConfirmationSound,CONFIRMATION_SOUND_URL} from '../dist/media.js';

test('confirmation uses the requested MP3 and sound starts enabled',()=>{
  const urls=[];class Media{constructor(url){urls.push(url);}pause(){}play(){return Promise.resolve();}}
  const sound=new ConfirmationSound({AudioCtor:Media,AudioContextCtor:null});assert.equal(sound.enabled,true);assert.deepEqual(urls,[CONFIRMATION_SOUND_URL]);
});
test('quiz gesture unlocks and playback uses decoded real audio, not oscillators',async()=>{
  let starts=0,fetches=0;class Context{state='running';destination={};resume(){return Promise.resolve();}decodeAudioData(){return Promise.resolve('recording');}createBufferSource(){return{connect(){},start(){starts++;},stop(){}};}}
  const sound=new ConfirmationSound({AudioCtor:null,AudioContextCtor:Context,fetcher:async url=>{assert.equal(url,CONFIRMATION_SOUND_URL);fetches++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(1)};}});
  sound.unlock();assert.equal(await sound.play(),true);assert.equal(starts,1);assert.equal(fetches,1);assert.equal(await sound.play(),true);assert.equal(fetches,1);
});
test('disabled preference is respected and blocked playback returns a fallback signal',async()=>{
  class Blocked{pause(){}play(){return Promise.reject(Error('blocked'));}}
  const sound=new ConfirmationSound({AudioCtor:Blocked,AudioContextCtor:null});assert.equal(await sound.play(),false);sound.setEnabled(false);assert.equal(await sound.play(),true);
});
test('a failed decode falls back to media playback; unavailable media never throws',async()=>{
  let plays=0;class Media{pause(){}play(){plays++;return Promise.resolve();}}class Context{resume(){return Promise.resolve();}decodeAudioData(){throw Error('decode');}}
  const sound=new ConfirmationSound({AudioCtor:Media,AudioContextCtor:Context,fetcher:async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(1)})});assert.equal(await sound.play(),true);assert.equal(plays,1);
  assert.equal(await new ConfirmationSound({AudioCtor:null,AudioContextCtor:null}).play(),false);
});

test('fetch is called with its browser global receiver',async()=>{
  class Context{state='running';resume(){return Promise.resolve();}decodeAudioData(){return Promise.resolve('recording');}createBufferSource(){return{connect(){},start(){},stop(){}};}}
  const sound=new ConfirmationSound({AudioCtor:null,AudioContextCtor:Context,fetcher:async function(){assert.equal(this,globalThis);return{ok:true,arrayBuffer:async()=>new ArrayBuffer(1)};}});assert.equal(await sound.play(),true);
});
