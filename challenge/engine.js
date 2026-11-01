(function(root){
'use strict';
class InputError extends Error {}
function gcd(a,b){a=a<0n?-a:a;while(b){const t=a%b;a=b;b=t}return a}
function rat(n,d=1n){if(!d)throw new InputError('分母不能为零。');if(d<0n){n=-n;d=-d}const g=gcd(n,d);n/=g;d/=g;if(n.toString(2).length>1024||d.toString(2).length>1024)throw new InputError('表达式过于复杂，请先化简。');return [n,d]}
const R={add:(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),mul:(a,b)=>rat(a[0]*b[0],a[1]*b[1]),div:(a,b)=>rat(a[0]*b[1],a[1]*b[0])};
const one=()=>new Map([[0,[1n,1n]]]);
function clean(p){for(const [k,v]of p){if(k>24)throw new InputError('多项式次数超过测试范围。');if(!v[0])p.delete(k)}return p}
function add(a,b,sign=1n){const p=new Map(a);for(const [k,v]of b)p.set(k,R.add(p.get(k)||[0n,1n],[sign*v[0],v[1]]));return clean(p)}
function mul(a,b){const p=new Map();for(const [i,x]of a)for(const [j,y]of b)p.set(i+j,R.add(p.get(i+j)||[0n,1n],R.mul(x,y)));return clean(p)}
function div(a,b){if(!b.size)throw new InputError('分母不能为零。');if([...b.keys()].some(k=>k!==0))throw new InputError('暂不支持含变量的分母，请先化简并检查定义域。');return clean(new Map([...a].map(([k,v])=>[k,R.div(v,b.get(0))])))}
class Parser{
 constructor(text,variable){
  if(typeof text!=='string'||!text.trim())throw new InputError('请先输入答案，或选择跳过。');
  if(text.length>400)throw new InputError('答案最多 400 字符。');
  this.variable=variable;this.i=0;this.depth=0;this.tokens=[];
  text=text.trim().replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/');
  for(const [l,r]of [['$$','$$'],['$','$'],['\\(','\\)'],['\\[','\\]']])if(text.startsWith(l)&&text.endsWith(r)){text=text.slice(l.length,-r.length).trim();break}
  text=text.replace(/\\(?:left|right)(?![A-Za-z])/g,'').replace(/\\(?:,|;|!|quad\b|qquad\b| )/g,'');
  if(text.includes('=')){const parts=text.split('=');const name=variable==='t'?'f(t)':'g(x)';if(!variable||parts.length!==2||parts[0].replace(/\s/g,'')!==name)throw new InputError('请只输入最终表达式，变量使用 '+(variable||'精确数值')+'。');text=parts[1]}
  const regex=/\s+|\\[A-Za-z]+|[0-9]+(?:\.[0-9]+)?|\.[0-9]+|[A-Za-z]|[+*/^(){}-]/y;
  let pos=0;while(pos<text.length){regex.lastIndex=pos;const m=regex.exec(text);if(!m)throw new InputError('含不支持的字符，请使用分数、括号、整数幂和指定变量。');pos=regex.lastIndex;if(m[0].trim())this.tokens.push(m[0])}
  if(this.tokens.length>180)throw new InputError('表达式过长，请先化简。');
 }
 peek(){return this.tokens[this.i]}
 take(){return this.tokens[this.i++]}
 parse(){const p=this.expr();if(this.peek()!==undefined)throw new InputError('请检查表达式和括号。');return p}
 expr(){if(++this.depth>30)throw new InputError('括号层数过多。');let a=this.term();while(['+','-'].includes(this.peek())){const sign=this.take()==='+'?1n:-1n;a=add(a,this.term(),sign)}this.depth--;return a}
 term(){let a=this.unary();for(;;){const t=this.peek();if(['*','/','\\cdot','\\times'].includes(t)){this.take();const b=this.unary();a=t==='/'?div(a,b):mul(a,b)}else if(t&&(['(','{','\\frac','\\dfrac','\\tfrac'].includes(t)||/^[A-Za-z0-9.]/.test(t))){a=mul(a,this.unary())}else return a}}
 unary(){let sign=1n;while(['+','-'].includes(this.peek()))if(this.take()==='-')sign=-sign;return mul(new Map([[0,[sign,1n]]]),this.power())}
 power(){let a=this.atom();if(this.peek()==='^'){this.take();const b=this.unary();if([...b.keys()].some(k=>k!==0))throw new InputError('指数必须是整数。');const v=b.get(0)||[0n,1n];if(v[1]!==1n||v[0]>24n||v[0]<-24n)throw new InputError('仅支持 -24 到 24 的整数指数。');const n=Number(v[0]);if(!a.size&&n<=0)throw new InputError('不支持零的零次幂或负次幂。');if(n<0)a=div(one(),a);let p=one();for(let j=0;j<Math.abs(n);j++)p=mul(p,a);a=p}return a}
 fractionArg(){const t=this.peek();if(t==='{'||(t&&t.length===1&&(/[0-9]/.test(t)||t===this.variable)))return this.atom();throw new InputError('请写完整分数，例如 \\frac{1}{120}，或 1/120。')}
 atom(){const t=this.take();if(t==='('||t==='{'){const a=this.expr();if(this.take()!==(t==='('?')':'}'))throw new InputError('括号未配对。');return a}
  if(['\\frac','\\dfrac','\\tfrac'].includes(t))return div(this.fractionArg(),this.fractionArg());
  if(t&&/^(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(t)){const parts=t.split('.');return clean(new Map([[0,rat(BigInt(parts.join('')),10n**BigInt(parts[1]?.length||0))]]))}
  if(t&&t===this.variable)return new Map([[1,[1n,1n]]]);
  throw new InputError('暂不支持此写法。此题请填写'+(this.variable?'含 '+this.variable+' 的多项式':'精确分数或整数')+'；不评阅证明、根式或三角表达式。');
 }
}
function grade(text,expected,variable=''){const a=new Parser(text,variable).parse(),b=new Parser(expected,variable).parse();return a.size===b.size&&[...a].every(([k,v])=>b.has(k)&&v[0]===b.get(k)[0]&&v[1]===b.get(k)[1])}
function toLatex(text,variable=''){
 const p=new Parser(text,variable).parse();if(!p.size)return '0';
 let result='';
 for(const [degree,[n,d]]of [...p].sort((a,b)=>b[0]-a[0])){
  const sign=n<0n?'-':result?'+':'',num=n<0n?-n:n;
  const symbol=degree?variable+(degree===1?'':'^{'+degree+'}'):'';
  const numerator=(num===1n&&degree?'':String(num))+symbol;
  result+=sign+(d===1n?numerator:'\\frac{'+numerator+'}{'+d+'}');
 }
 return result;
}
function score(correct,seconds,target){if(!correct)return 0;return 60+Math.round(40*Math.max(0,1-Math.max(0,seconds)/target))}
function draw(bank,rng=Math.random){if(bank.length<5||new Set(bank.map(q=>q.id)).size!==bank.length)throw new Error('题库需要至少五道且 ID 不重复。');const pool=[...bank];for(let i=pool.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}return pool.slice(0,5)}
const api={grade,toLatex,score,draw,InputError};if(typeof module!=='undefined')module.exports=api;else root.QuestEngine=api;
})(typeof window!=='undefined'?window:globalThis);
