import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1080},reducedMotion:'no-preference'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{
  window.__realSoundStarts=0;window.__realSoundDuration=0;
  const original=AudioContext.prototype.createBufferSource;
  AudioContext.prototype.createBufferSource=function(){const source=original.call(this);const start=source.start.bind(source);source.start=(...args)=>{window.__realSoundStarts++;window.__realSoundDuration=source.buffer?.duration||0;return start(...args);};return source;};
});
async function finalQuestion(){
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(async()=>{const {createOrder}=await import('./engine.js');const {PROPOSALS}=await import('./catalog.js');const order=createOrder(PROPOSALS);localStorage.setItem('voteai:session:1',JSON.stringify({version:1,order,answers:Object.fromEntries(order.slice(0,24).map(id=>[id,'important'])),index:24,revealed:false}));});
  await page.goto('http://127.0.0.1:5173/#teste');await page.reload();await page.getByText('Proposta 25 de 25').waitFor();
}
try{
  await finalQuestion();const at=Date.now();await page.getByRole('button',{name:'Concordo',exact:true}).click();
  await page.getByText('Comparando propostas e prioridades…').waitFor();assert.ok(await page.locator('.machine-counting').count());
  assert.equal(await page.getByRole('button',{name:'Som ativado'}).getAttribute('aria-pressed'),'true');
  await page.evaluate(()=>document.fonts.ready);await fs.mkdir('test-results/screenshots',{recursive:true});
  await page.screenshot({path:'test-results/screenshots/urn-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/screenshots/urn-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Ver minhas respostas',exact:true}).waitFor();assert.ok(Date.now()-at>=2200);await page.waitForFunction(()=>window.__realSoundStarts===1);
  assert.ok(await page.evaluate(()=>window.__realSoundDuration>.5));assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('voteai:session:1')).revealed),true);
  await finalQuestion();await page.getByRole('button',{name:'Som ativado'}).click();await page.getByRole('button',{name:'Concordo',exact:true}).click();await page.getByRole('button',{name:'Pular animação'}).click();await page.getByRole('button',{name:'Ver minhas respostas',exact:true}).waitFor();assert.equal(await page.evaluate(()=>window.__realSoundStarts),0);
  const blocked=await browser.newPage({reducedMotion:'reduce'});
  await blocked.addInitScript(()=>{Object.defineProperty(window,'AudioContext',{value:undefined});Object.defineProperty(window,'webkitAudioContext',{value:undefined});HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('blocked','NotAllowedError'));});
  await blocked.goto('http://127.0.0.1:5173/');await blocked.evaluate(async()=>{const {createOrder}=await import('./engine.js');const {PROPOSALS}=await import('./catalog.js');const order=createOrder(PROPOSALS);localStorage.setItem('voteai:session:1',JSON.stringify({version:1,order,answers:Object.fromEntries(order.map(id=>[id,'agree'])),index:25,revealed:false}));});
  await blocked.goto('http://127.0.0.1:5173/#urna');await blocked.reload();await blocked.getByRole('button',{name:'Ver minhas respostas',exact:true}).waitFor();await blocked.getByRole('button',{name:'Ouvir confirmação',exact:true}).waitFor();
  await blocked.evaluate(()=>{Object.defineProperty(navigator,'share',{value:async()=>{throw Error('unavailable')}});Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw Error('unavailable')}}});});await blocked.getByRole('button',{name:'Compartilhar',exact:true}).click();await blocked.locator('#share-fallback textarea').waitFor();await blocked.close();assert.deepEqual(errors,[]);
  console.log('Automatic reveal, real decoded MP3, sound enabled, mute, skip, audio block fallback and sharing fallback passed.');
}finally{await browser.close();}
