import assert from 'node:assert/strict';
import { BASE, launch } from './support.mjs';
const browser=await launch();
try{
  const page=await browser.newPage({viewport:{width:1440,height:1080},reducedMotion:'no-preference'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(BASE);await page.waitForTimeout(300);assert.equal(await page.locator('#explainer-video').evaluate(v=>v.paused),true);await page.locator('#explainer-video').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#explainer-video').currentTime>.1);
  const metadata=await page.locator('#explainer-video').evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,muted:v.muted,loop:v.loop}));assert.ok(Math.abs(metadata.duration-19.7)<.1);assert.equal(metadata.width,1280);assert.equal(metadata.height,720);assert.equal(metadata.muted,true);assert.equal(metadata.loop,true);
  await page.getByRole('button',{name:'Pausar vídeo explicativo',exact:true}).click();assert.equal(await page.locator('#explainer-video').evaluate(v=>v.paused),true);
  await page.getByRole('button',{name:'Reproduzir vídeo explicativo',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('#explainer-video').paused);
  await page.locator('#explainer-video').evaluate(v=>v.currentTime=v.duration-.2);await page.waitForFunction(()=>document.querySelector('#explainer-video').currentTime<1);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('#explainer-video').paused);
  await page.locator('#explainer-video').scrollIntoViewIfNeeded();await page.waitForFunction(()=>!document.querySelector('#explainer-video').paused);assert.equal(await page.locator('.video-controls').count(),0);
  for(const width of [1440,390]){await page.setViewportSize({width,height:1080});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(1300);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:'test-results/screenshots/landing-motion-'+width+'.png',fullPage:true});}

  await page.getByRole('button',{name:'Descobrir minha afinidade',exact:true}).click();await page.getByText('Proposta 1 de 25').waitFor();assert.equal(await page.locator('#explainer-video').count(),0);assert.deepEqual(errors,[]);
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(BASE);await reduced.locator('#explainer-video').scrollIntoViewIfNeeded();await reduced.waitForFunction(()=>document.querySelector('#explainer-video').readyState>=2);assert.equal(await reduced.locator('#explainer-video').evaluate(v=>v.paused),true);assert.ok(await reduced.locator('#explainer-video').getAttribute('poster'));await reduced.getByRole('button',{name:'Reproduzir vídeo explicativo',exact:true}).click();await reduced.waitForFunction(()=>!document.querySelector('#explainer-video').paused);await reduced.close();
  console.log('Real MP4 metadata, silent autoplay, pause, resume, replay, exit cleanup and reduced-motion poster passed.');
}finally{await browser.close();}
