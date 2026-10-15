import assert from 'node:assert/strict';
import { PROPOSALS } from '../src/data/catalog.ts';
import { AREAS } from '../src/lib/engine.ts';
import { BASE, launch } from './support.mjs';
const browser=await launch();
const page=await browser.newPage({reducedMotion:'reduce'});
try{
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:900});await page.goto(BASE);
    await page.getByRole('button',{name:'Descobrir minha afinidade',exact:true}).click();await page.locator('.quiz-paper').waitFor();await page.evaluate(()=>document.fonts.ready);
    const report=await page.evaluate(([PROPOSALS,AREAS])=>{
      const card=document.querySelector('.quiz-paper'),copy=card.querySelector('.proposal-copy');
      const baseline=[...document.querySelectorAll('.quiz-wrap .choice')].map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};});
      const errors=[];let scrollable=0;
      for(const p of PROPOSALS){
        card.querySelector('h2').textContent=p.texto;card.querySelector('.proposal-context').textContent=p.contexto;card.querySelector('.topic').lastChild.textContent=AREAS[p.area];
        if(copy.scrollHeight>copy.clientHeight)scrollable++;
        const positions=[...document.querySelectorAll('.quiz-wrap .choice')].map(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};});
        if(positions.some((r,i)=>Object.keys(r).some(k=>Math.abs(r[k]-baseline[i][k])>.5)))errors.push(p.id);
      }
      return{errors,scrollable,overflow:document.documentElement.scrollWidth>innerWidth,count:PROPOSALS.length,height:card.getBoundingClientRect().height};
    },[PROPOSALS,AREAS]);
    assert.deepEqual(report.errors,[],`Buttons moved at ${width}px`);assert.equal(report.overflow,false);assert.equal(report.count,50);assert.ok(report.height>=350);console.log(`Stable controls for all 50 proposals at ${width}px; ${report.scrollable} scroll internally.`);
    await page.locator('.proposal-copy').focus();const index=await page.evaluate(()=>JSON.parse(localStorage.getItem('voteai:session:1')).index);await page.keyboard.press('ArrowDown');assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('voteai:session:1')).index),index);
    await page.evaluate(()=>localStorage.clear());
  }
}finally{await browser.close();}
