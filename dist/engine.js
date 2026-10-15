export const ANSWERS={agree:{label:'Concordo',weight:1,position:'concorda'},disagree:{label:'Discordo',weight:1,position:'discorda'},important:{label:'Importante',weight:2,position:'concorda'},skip:{label:'Não sei',weight:0,position:null}};
export const CANDIDATES={A:{name:'Flávio Bolsonaro',party:'PL',number:'22',image:'./assets/flavio.jpg'},B:{name:'Lula',party:'PT',number:'13',image:'./assets/lula.jpg'}};
export const AREAS={'economia':'Economia','seguranca':'Segurança','saude-educacao':'Saúde e educação','programas-sociais':'Programas sociais','meio-ambiente':'Meio ambiente','costumes':'Costumes','instituicoes':'Instituições'};
export const SESSION_KEY='voteai:session:1';
export function proposer(p){const a=p.posicoes.A==='concorda',b=p.posicoes.B==='concorda';return a&&b?'both':a?'A':b?'B':'none';}
export function shuffle(items,rng=Math.random){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export function createOrder(proposals,rng=Math.random,firstId=null){
  // Three shared proposals plus eleven exclusive proposals from each candidate.
  const selected=[],counts={A:0,B:0,both:0},quotas={A:11,B:11,both:3};
  const pool=shuffle(proposals.filter(p=>Object.hasOwn(quotas,proposer(p))),rng);
  const add=p=>{selected.push(p);counts[proposer(p)]++;};
  const first=pool.find(p=>p.id===firstId);if(first)add(first);
  for(const area of shuffle(Object.keys(AREAS),rng)){
    if(selected.some(p=>p.area===area))continue;
    const p=pool.find(p=>p.area===area&&!selected.includes(p)&&counts[proposer(p)]<quotas[proposer(p)]);if(p)add(p);
  }
  while(selected.length<25){
    const available=pool.filter(p=>!selected.includes(p)&&counts[proposer(p)]<quotas[proposer(p)]);
    available.sort((a,b)=>selected.filter(p=>p.area===a.area).length-selected.filter(p=>p.area===b.area).length);
    if(!available.length)throw new Error('Catálogo insuficiente para um teste equilibrado.');add(available[0]);
  }
  const ids=shuffle(selected,rng).map(p=>p.id);
  if(firstId){ids.splice(ids.indexOf(firstId),1);ids.unshift(firstId);}return ids;
}
export function calculate(proposals,answers){
  const scores={A:0,B:0};let weight=0,answered=0,skipped=0;const areas={};
  for(const p of proposals){
    const answer=ANSWERS[answers[p.id]];if(!answer)continue;
    if(answer.weight===0){skipped++;continue;}answered++;weight+=answer.weight;
    const area=areas[p.area]??={scores:{A:0,B:0},weight:0};area.weight+=answer.weight;
    const source=proposer(p);
    for(const id of ['A','B']){
      // With no documented opposition, disagreement is allocated to the other candidate
      // by the reference's comparative rule, not presented as an official position.
      const matches=p.posicoes[id]===answer.position||(answer.position==='discorda'&&p.posicoes[id]==='sem-posicao'&&source!=='both'&&source!=='none'&&source!==id);
      if(matches){scores[id]+=answer.weight;area.scores[id]+=answer.weight;}
    }
  }
  const percentages={A:weight?Math.round(scores.A/weight*100):0,B:weight?Math.round(scores.B/weight*100):0};
  const status=!weight?'empty':scores.A===scores.B?'tie':'winner';
  return {scores,weight,percentages,areas,answered,skipped,status,winner:status==='winner'?(scores.A>scores.B?'A':'B'):null};
}
export function validSession(value,proposals){
  if(!value||value.version!==1||!Array.isArray(value.order)||value.order.length!==25||!Number.isInteger(value.index)||value.index<0||value.index>25||typeof value.revealed!=='boolean'||!value.answers||typeof value.answers!=='object'||Array.isArray(value.answers))return false;
  const ids=new Set(proposals.map(p=>p.id));if(new Set(value.order).size!==25||value.order.some(id=>!ids.has(id)))return false;
  if(Object.entries(value.answers).some(([id,answer])=>!value.order.includes(id)||!Object.hasOwn(ANSWERS,answer)))return false;
  if(value.order.slice(0,value.index).some(id=>!Object.hasOwn(value.answers,id)))return false;
  if(value.revealed&&value.index!==25)return false;return true;
}
export function loadSession(storage,proposals){try{const value=JSON.parse(storage.getItem(SESSION_KEY));return validSession(value,proposals)?value:null;}catch{return null;}}
export function saveSession(storage,session){try{storage.setItem(SESSION_KEY,JSON.stringify(session));return true;}catch{return false;}}
