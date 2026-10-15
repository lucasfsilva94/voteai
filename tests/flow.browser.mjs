import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { DEMO_NOTES } from '../src/data/content.ts';
import { BASE as base, launch } from './support.mjs';
const browser=await launch();
const errors=[];
const context=await browser.newContext({viewport:{width:1440,height:1080},reducedMotion:'reduce'});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const screenshots='test-results/screenshots';await fs.mkdir(screenshots,{recursive:true});
async function capture(name){if(process.env.VOTEAI_CAPTURE==='0')return;await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${screenshots}/${name}.png`,fullPage:true});}
async function noOverflow(){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${page.viewportSize().width}px`);}
const path=()=>new URL(page.url()).pathname;
try{
  // Routes: every page answers by its own path, old "#" links redirect, and pages that need a test send you home.
  for(const route of ['','teste','urna','resultado','fontes']){const response=await page.request.get(base+route);assert.equal(response.status(),200,`/${route} must be served`);}
  await page.goto(base+'#fontes');await page.getByRole('heading',{name:/Você pode conferir/}).waitFor();assert.equal(path(),'/voteai/fontes');
  await page.goto(base+'resultado');await page.getByRole('heading',{name:/Vote nas ideias/}).waitFor();assert.equal(path(),'/voteai/');
  await page.goto(base+'fontes');await page.getByRole('link',{name:'Perguntas',exact:true}).click();await page.waitForFunction(()=>{const s=document.querySelector('#perguntas');return !!s&&Math.abs(s.getBoundingClientRect().top)<120});assert.equal(new URL(page.url()).hash,'#perguntas');
  await page.getByRole('link',{name:'Como funciona',exact:true}).click();await page.waitForFunction(()=>{const s=document.querySelector('#como-funciona');return !!s&&Math.abs(s.getBoundingClientRect().top)<120});

  await page.goto(base);await page.getByRole('heading',{name:/Vote nas ideias/}).waitFor();await capture('desktop');await noOverflow();
  await page.setViewportSize({width:390,height:844});await capture('mobile');await noOverflow();
  await page.getByRole('button',{name:'Concordo',exact:true}).click();await page.getByText('Proposta 2 de 25').waitFor();assert.equal(path(),'/voteai/teste');
  const previewSession=await page.evaluate(()=>JSON.parse(localStorage.getItem('voteai:session:1')));const demoId=DEMO_NOTES[0].id;assert.equal(previewSession.answers[demoId],'agree');assert.equal(previewSession.index,1);
  await page.reload();await page.getByText('Proposta 2 de 25').waitFor();
  await page.getByRole('button',{name:'Voltar',exact:true}).click();await page.getByText('Proposta 1 de 25').waitFor();
  await page.getByRole('button',{name:/Importante/}).click();await page.getByText('Proposta 2 de 25').waitFor();
  assert.equal(await page.evaluate(id=>JSON.parse(localStorage.getItem('voteai:session:1')).answers[id],demoId),'important');
  assert.equal(await page.locator('#proposal-card').evaluate(el=>getComputedStyle(el).touchAction),'pan-y');
  await page.locator('#proposal-card').dispatchEvent('pointerdown',{pointerType:'touch',clientX:100,clientY:200});
  await page.locator('#proposal-card').dispatchEvent('pointerup',{pointerType:'touch',clientX:105,clientY:60});
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('voteai:session:1')).index),1,'Vertical scrolling must not answer');
  await capture('quiz-mobile');await noOverflow();
  await page.setViewportSize({width:1440,height:1080});await capture('quiz-desktop');
  // Candidate attribution and sources must not occur in quiz DOM.
  assert.equal(await page.locator('main').getByText('Lula',{exact:true}).count(),0);
  assert.equal(await page.locator('main').getByText('Flávio Bolsonaro',{exact:true}).count(),0);
  assert.equal(await page.locator('main a[href*=".pdf"]').count(),0);
  for(let i=1;i<25;i++){await page.getByRole('button',{name:'Concordo',exact:true}).click();if(i<24)await page.getByText(`Proposta ${i+2} de 25`).waitFor();}
  await page.getByRole('heading',{name:/Nas ideias|um empate/}).waitFor();assert.equal(path(),'/voteai/resultado');await capture('result-desktop');await noOverflow();
  await page.setViewportSize({width:390,height:844});await capture('result-mobile');await noOverflow();
  assert.equal(await page.locator('.candidate-B').first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(228, 20, 44)');
  assert.equal(await page.locator('.candidate-A').first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(0, 79, 159)');
  await page.getByRole('button',{name:'Ver minhas respostas',exact:true}).click();assert.equal(await page.locator('#review-section details').count(),25);
  await page.locator('#review-section details summary').first().click();assert.ok(await page.locator('#review-section details').first().locator('a[href*="#page="]').count()>0);
  await page.reload();await page.getByRole('heading',{name:/Nas ideias|um empate/}).waitFor();
  await page.goto(base+'#urna');await page.getByRole('heading',{name:/Nas ideias|um empate/}).waitFor();assert.equal(path(),'/voteai/resultado','A revealed test skips the urn');
  await page.getByRole('link',{name:'Fontes e critérios',exact:true}).click();await page.getByRole('heading',{name:/Você pode conferir/}).waitFor();assert.equal(await page.locator('#source-list details').count(),50);
  await page.locator('#source-search').fill('termo que não existe xyz');await page.getByRole('heading',{name:'Nenhuma proposta encontrada.'}).waitFor();
  await page.locator('#source-search').fill('');await page.locator('#source-filter').selectOption('economia');assert.equal(await page.locator('#source-list details').count(),8);
  await page.locator('#source-search').focus();assert.equal(await page.locator('.search-box').evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
  await page.setViewportSize({width:390,height:844});await capture('sources-mobile');await noOverflow();
  await page.getByRole('button',{name:'Apagar minhas respostas deste aparelho'}).click();assert.equal(await page.evaluate(()=>localStorage.getItem('voteai:session:1')),null);
  await page.goto(base+'#inicio');assert.equal(path(),'/voteai/');await page.getByRole('button',{name:'Descobrir minha afinidade',exact:true}).click();
  for(let i=0;i<25;i++){await page.getByRole('button',{name:'Não sei',exact:true}).click();if(i<24)await page.getByText(`Proposta ${i+2} de 25`).waitFor();}
  await page.getByRole('heading',{name:/precisamos/}).waitFor();assert.ok(await page.getByText('SEM DADOS',{exact:true}).count());
  // Storage blocked by browser policy: continue through actual UI.
  const blocked=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError');}});});
  const bp=await blocked.newPage();bp.on('pageerror',e=>errors.push(e.message));await bp.goto(base);await bp.getByRole('button',{name:'Descobrir minha afinidade',exact:true}).click();await bp.getByRole('button',{name:'Concordo',exact:true}).click();await bp.getByText('Proposta 2 de 25').waitFor();await blocked.close();
  assert.deepEqual(errors,[]);console.log('Browser checks passed: routes and old links, section anchors, desktop/mobile, full flow, corrections, reload, blind attribution, sources/search, deletion, all-skip, blocked storage.');
}finally{await browser.close();}
