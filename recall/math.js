(function(root){
'use strict';
class InputError extends Error {}
const aliases={ln:'log',arcsin:'asin',arccos:'acos',arctan:'atan',arccot:'acot',arcsec:'asec',arccsc:'acsc',arsinh:'asinh',arcsinh:'asinh',arcosh:'acosh',arccosh:'acosh',artanh:'atanh',arctanh:'atanh'};
const functions=['sin','cos','tan','cot','sec','csc','asin','acos','atan','acot','asec','acsc','sinh','cosh','tanh','asinh','acosh','atanh','sqrt','abs','exp','log',...Object.keys(aliases)].sort((a,b)=>b.length-a.length);
const num=v=>({t:'num',v:String(v)}),sym=v=>({t:'sym',v}),op=(v,a,b)=>({t:'op',v,a,b}),fn=(v,a)=>({t:'fn',v,a});
function prepare(raw){
 if(typeof raw!=='string'||!raw.trim())throw new InputError('请填写完整表达式，或跳过本题。');
 if(raw.length>300)throw new InputError('表达式最多 300 字符，请先化简。');
 let s=raw.trim().replace(/−|–/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/π/g,'pi').replace(/²/g,'^2').replace(/³/g,'^3').replace(/′/g,"'");
 for(const [l,r]of [['$$','$$'],['$','$'],['\\(','\\)'],['\\[','\\]']])if(s.startsWith(l)&&s.endsWith(r)){s=s.slice(l.length,-r.length);break}
 s=s.replace(/\\(?:left|right)\b/g,'').replace(/\\(?:,|;|!|quad\b|qquad\b| )/g,' ')
  .replace(/\\(?:operatorname|mathrm)\{([A-Za-z]+)\}/g,'$1')
  .replace(/\\(?:lvert|rvert|vert)\b/g,'|').replace(/\\(?:cdot|times)\b/g,'*')
  .replace(/\\(?:dfrac|tfrac)\b/g,'\\frac').replace(/\\pi\b/g,'pi')
  .replace(/f\s*(?:'|\^\{\\prime\}|\\prime)\s*\(\s*x\s*\)/g,'D');
 s=s.replace(/\\?(sin|cos|tan|cot|sec|csc)\s*\^\s*(?:\{\s*-1\s*\}|-1)(?=\s*(?:\(|\{|x))/g,(_,f)=>'arc'+f+' ');
 if(s.includes('='))throw new InputError('只填写等号右侧的完整表达式，不要重复等号或题目。');
 return s;
}
class Parser{
 constructor(raw,allowed){
  this.ts=[];this.i=0;this.depth=0;this.bars=0;this.allowed=allowed;
  let s=prepare(raw),i=0;
  while(i<s.length){
   if(/\s/.test(s[i])){i++;continue}
   const tail=s.slice(i);
   let m=tail.match(/^(?:\d+(?:\.\d+)?|\.\d+)/);
   if(m){if(m[0].length>18)throw new InputError('数字过长，请使用精确分数。');this.ts.push(m[0]);i+=m[0].length;continue}
   if(tail.startsWith('\\frac')){this.ts.push('frac');i+=5;continue}
   let escape=s[i]==='\\'?1:0,found=functions.find(f=>s.startsWith(f,i+escape));
   if(found){this.ts.push(aliases[found]||found);i+=found.length+escape;continue}
   if(tail.startsWith('pi')){this.ts.push('pi');i+=2;continue}
   if(/[A-Za-z+\-*/^(){}|]/.test(s[i])){this.ts.push(s[i++]);continue}
   throw new InputError('无法识别此写法。支持普通数学表达式和 LaTeX 分式、根式及常用函数。');
  }
  if(this.ts.length>120)throw new InputError('表达式过长，请先化简。');
 }
 peek(){return this.ts[this.i]}
 take(){return this.ts[this.i++]}
 parse(){const a=this.expr();if(this.peek()!==undefined)throw new InputError('请检查括号或函数的写法。');return a}
 expr(){
  if(++this.depth>16)throw new InputError('括号层数过多。');
  let a=this.term();while(['+','-'].includes(this.peek())){const t=this.take();a=op(t,a,this.term())}
  this.depth--;return a;
 }
 starts(){const t=this.peek();return t&&(t==='('||t==='{'||t==='frac'||(t==='|'&&!this.bars)||/^[A-Za-z0-9.]/.test(t))}
 term(){let a=this.unary();for(;;){const t=this.peek();if(t==='*'||t==='/'){this.take();a=op(t,a,this.unary())}else if(this.starts())a=op('*',a,this.unary());else return a}}
 unary(){if(this.peek()==='+'){this.take();return this.unary()}if(this.peek()==='-'){this.take();return op('*',num(-1),this.unary())}return this.power()}
 exponent(){
  let sign=1;if(['+','-'].includes(this.peek()))sign=this.take()==='-'?-1:1;
  const a=this.atom();if(a.t==='num'&&Math.abs(Number(a.v))>40)throw new InputError('指数过大，请使用课件范围内的公式。');
  return sign===-1?op('*',num(-1),a):a;
 }
 power(){let a=this.atom();if(this.peek()==='^'){this.take();a=op('^',a,this.exponent())}return a}
 atom(){
  if(++this.depth>16)throw new InputError('表达式嵌套过深。');
  const a=this.atomInner();this.depth--;return a;
 }
 atomInner(){
  const t=this.take();
  if(t==='('||t==='{'){const a=this.expr();if(this.take()!==(t==='('?')':'}'))throw new InputError('括号未配对。');return a}
  if(t==='|'){this.bars++;const a=this.expr();this.bars--;if(this.take()!=='|')throw new InputError('绝对值符号未配对。');return fn('abs',a)}
  if(t==='frac'){const a=this.atom(),b=this.atom();return op('/',a,b)}
  if(t&&/^(?:\d|\.)/.test(t))return num(t);
  if(functions.includes(t)||Object.values(aliases).includes(t)){
   let power=null;if(this.peek()==='^'){this.take();power=this.exponent()}
   const argument=['(','{','|'].includes(this.peek())?this.atom():this.unary();
   const a=fn(t,argument);return power?op('^',a,power):a;
  }
  if(t==='F'||t==='G'){
   if(this.peek()==='('){this.take();if(this.take()!=='x'||this.take()!==')')throw new InputError('请使用题目给定的 F(x) 或 G(x)。')}
  }
  if(t==='e'||t==='pi'||(t&&this.allowed.includes(t)))return sym(t);
  throw new InputError('含不支持的变量或函数。请使用题目中的变量，以及 sin、ln、sqrt、abs 等常用函数。');
 }
}
function canonical(a){
 if(a.t==='num'||a.t==='sym')return a.v;
 if(a.t==='op')return '('+canonical(a.a)+a.v+canonical(a.b)+')';
 const x=canonical(a.a),e='(e^('+x+'))',inv='(e^(-('+x+')))';
 // Normalize familiar equivalent forms before exact symbolic comparison.
 switch(a.v){
  case 'exp':return e;
  case 'tan':return '(sin('+x+')/cos('+x+'))';
  case 'cot':return '(cos('+x+')/sin('+x+'))';
  case 'sec':return '(1/cos('+x+'))';
  case 'csc':return '(1/sin('+x+'))';
  case 'sinh':return '(('+e+'-'+inv+')/2)';
  case 'cosh':return '(('+e+'+'+inv+')/2)';
  case 'tanh':return '(('+e+'-'+inv+')/('+e+'+'+inv+'))';
  case 'asinh':return 'log(('+x+')+sqrt(('+x+')^2+1))';
  case 'acosh':return 'log(('+x+')+sqrt(('+x+')^2-1))';
  case 'atanh':return '(log((1+('+x+'))/(1-('+x+')))/2)';
  default:return a.v+'('+x+')';
 }
}
function evaluate(a,x){
 if(a.t==='num')return Number(a.v);
 if(a.t==='sym')return ({x,n:2,a:2,b:3,c:2,C:0,D:3,F:4,G:5,e:Math.E,pi:Math.PI})[a.v];
 const v=evaluate(a.a,x);
 if(a.t==='op'){const b=evaluate(a.b,x);return ({'+':()=>v+b,'-':()=>v-b,'*':()=>v*b,'/':()=>v/b,'^':()=>Math.pow(v,b)})[a.v]()}
 const funcs={sin:Math.sin,cos:Math.cos,tan:Math.tan,cot:t=>1/Math.tan(t),sec:t=>1/Math.cos(t),csc:t=>1/Math.sin(t),
 asin:Math.asin,acos:Math.acos,atan:Math.atan,acot:t=>Math.PI/2-Math.atan(t),asec:t=>Math.acos(1/t),acsc:t=>Math.asin(1/t),
 sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,asinh:Math.asinh,acosh:Math.acosh,atanh:Math.atanh,sqrt:Math.sqrt,abs:Math.abs,exp:Math.exp,log:Math.log};
 return funcs[a.v](v);
}
function derivative(a){
 const zero=v=>v.t==='num'&&Number(v.v)===0;
 const plus=(a,b)=>zero(a)?b:zero(b)?a:op('+',a,b);
 const times=(a,b)=>zero(a)||zero(b)?num(0):op('*',a,b);
 const negative=a=>times(num(-1),a);
 if(a.t==='num')return num(0);
 if(a.t==='sym')return num(a.v==='x'?1:0);
 const u=a.a,du=derivative(u);
 if(a.t==='op'){
  const v=a.b,dv=derivative(v);
  switch(a.v){
   case '+':return plus(du,dv);
   case '-':return plus(du,negative(dv));
   case '*':return plus(times(du,v),times(u,dv));
   case '/':return op('/',plus(times(du,v),negative(times(u,dv))),op('^',v,num(2)));
   case '^':
    if(zero(dv))return times(times(v,op('^',u,op('-',v,num(1)))),du);
    if(zero(du))return times(times(a,fn('log',u)),dv);
    return times(a,plus(times(dv,fn('log',u)),op('/',times(v,du),u)));
  }
 }
 if(zero(du))return num(0);
 const square=op('^',u,num(2)),reciprocal=v=>op('/',num(1),v);
 const rules={
  sin:()=>fn('cos',u),cos:()=>negative(fn('sin',u)),tan:()=>op('^',fn('sec',u),num(2)),
  cot:()=>negative(op('^',fn('csc',u),num(2))),sec:()=>times(fn('sec',u),fn('tan',u)),csc:()=>negative(times(fn('csc',u),fn('cot',u))),
  asin:()=>reciprocal(fn('sqrt',op('-',num(1),square))),acos:()=>negative(reciprocal(fn('sqrt',op('-',num(1),square)))),
  atan:()=>reciprocal(op('+',num(1),square)),acot:()=>negative(reciprocal(op('+',num(1),square))),
  asec:()=>reciprocal(times(fn('abs',u),fn('sqrt',op('-',square,num(1))))),acsc:()=>negative(reciprocal(times(fn('abs',u),fn('sqrt',op('-',square,num(1)))))),
  sinh:()=>fn('cosh',u),cosh:()=>fn('sinh',u),tanh:()=>reciprocal(op('^',fn('cosh',u),num(2))),
  asinh:()=>reciprocal(fn('sqrt',op('+',square,num(1)))),acosh:()=>reciprocal(fn('sqrt',op('-',square,num(1)))),atanh:()=>reciprocal(op('-',num(1),square)),
  exp:()=>fn('exp',u),log:()=>reciprocal(u),sqrt:()=>reciprocal(times(num(2),fn('sqrt',u))),abs:()=>op('/',u,fn('abs',u))
 };
 return times(rules[a.v](),du);
}
function grade(raw,q,nerdamer){
 const a=new Parser(raw,q.variables).parse(),b=new Parser(q.expected,q.variables).parse();
 const excluded={'hyperbolic-01':'sinh','hyperbolic-02':'cosh','hyperbolic-03':'tanh','hyperbolic-04':'asinh','hyperbolic-05':'acosh','hyperbolic-06':'atanh'}[q.id];
 function has(node,name){return node&&(node.t==='fn'&&node.v===name||has(node.a,name)||has(node.b,name))}
 if(excluded&&has(a,excluded))throw new InputError('请展开题目中的函数，填写它的定义式，不要直接重复左侧函数。');
 // Domain samples only reject undefined expressions; never award points by numerical sampling.
 if(q.samples.some(x=>!Number.isFinite(evaluate(a,x))))return {correct:false,reason:'该表达式在题目要求的部分实数范围内无定义。'};
 const actual=canonical(a),expected=canonical(b);
 try{
  let difference;
  if(q.mode==='primitive')difference=nerdamer(canonical(derivative(a))).subtract(nerdamer(canonical(derivative(b))));
  else difference=nerdamer(actual).subtract(nerdamer(expected));
  const simplified=nerdamer('simplify('+difference.toString()+')');
  let correct=difference.toString()==='0'||simplified.toString()==='0'||
   (q.topic==='antiderivative'&&q.mode==='expression'&&simplified.variables().every(v=>['C','c'].includes(v)));
  if(!correct&&q.id==='hyperbolic-06'){
   const alternate=canonical(new Parser('(ln(1+x)-ln(1-x))/2',q.variables).parse());
   correct=nerdamer('simplify(('+actual+')-('+alternate+'))').toString()==='0';
  }
  nerdamer.clear('all');
  return {correct,reason:correct?'':'与参考表达式未判定为等价，请在结算时对照复查。'};
 }catch{nerdamer.clear('all');throw new InputError('暂时无法判断这个写法，请化简后重试；本题尚未提交。')}
}
function latex(a){
 if(a.t==='num')return a.v;
 if(a.t==='sym')return ({pi:'\\pi',D:"f'(x)",F:'F(x)',G:'G(x)'})[a.v]||a.v;
 if(a.t==='op'){const l=latex(a.a),r=latex(a.b);if(a.v==='/')return '\\frac{'+l+'}{'+r+'}';if(a.v==='^')return '{\\left('+l+'\\right)}^{'+r+'}';return '\\left('+l+(a.v==='*'?'\\cdot ':a.v)+r+'\\right)'}
 const v=latex(a.a);if(a.v==='sqrt')return '\\sqrt{'+v+'}';if(a.v==='abs')return '\\left|'+v+'\\right|';
 const names={log:'\\ln',asin:'\\arcsin',acos:'\\arccos',atan:'\\arctan',acot:'\\operatorname{arccot}',asec:'\\operatorname{arcsec}',acsc:'\\operatorname{arccsc}',asinh:'\\operatorname{arsinh}',acosh:'\\operatorname{arcosh}',atanh:'\\operatorname{artanh}'};
 return (names[a.v]||'\\'+a.v)+'\\left('+v+'\\right)';
}
const api={Parser,canonical,grade,toLatex:(raw,vars)=>latex(new Parser(raw,vars).parse()),InputError};
if(typeof module!=='undefined')module.exports=api;else root.RecallMath=api;
})(typeof self!=='undefined'?self:globalThis);
