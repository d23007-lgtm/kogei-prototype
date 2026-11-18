const IDEALS = [
  {id:'impression',title:'印象に残る形にしたい',short:'印象に残る形',hints:['輪郭の強弱で、形の印象をつくる','異なる形を組み合わせてみる','一部分に特徴を集めてみる']},
  {id:'useful',title:'美しさと使いやすさを両立したい',short:'美しさと使いやすさ',hints:['使う動作から形を考えてみる','縁の形に役割を持たせる','支える部分の形を工夫する']},
  {id:'texture',title:'素材の質感を引き立たせたい',short:'素材の質感',hints:['素材の模様や流れを生かす','仕上げの違いを使い分ける','色や表情の対比を考える']},
  {id:'light',title:'軽やかな印象にしたい',short:'軽やかな印象',hints:['隙間をつくって空間を見せる','広がる輪郭を試してみる','色の面積や配置を工夫する']}
];
const PRESETS = [
  {id:'bowl',name:'茶碗',kind:'bowl'}, {id:'katakuchi',name:'片口',kind:'spout'}, {id:'shallow',name:'浅鉢',kind:'shallow'},
  {id:'tray',name:'丸盆',kind:'tray'}, {id:'basket',name:'籠',kind:'basket'}, {id:'cube',name:'立方体',kind:'cube'}, {id:'cylinder',name:'円柱',kind:'cylinder'}
];
const MATERIALS = [
  {id:'white',name:'焼き締め（白）',color:'#D8CFC0',dark:'#938575',inner:'#8A7A68',description:'落ち着いた明るい土の色'},
  {id:'red',name:'焼き締め（赤）',color:'#AA432E',dark:'#2B0800',inner:'#4D1D12',description:'赤みのある土の色'},
  {id:'celadon',name:'青磁釉',color:'#9ABBB1',dark:'#557C73',inner:'#456A61',description:'青みを含んだ淡い緑'},
  {id:'iron',name:'鉄釉',color:'#4A342A',dark:'#1D1715',inner:'#211713',description:'深く落ち着いた茶色'},
  {id:'beech',name:'ブナ',color:'#D4B48A',dark:'#8C6846',inner:'#B08A5E',description:'明るい木の色'},
  {id:'cedar',name:'スギ',color:'#B98254',dark:'#714329',inner:'#8D5C38',description:'赤みのある木の色'},
  {id:'black-lacquer',name:'黒漆',color:'#282423',dark:'#080808',inner:'#161313',description:'光を抑えた黒'},
  {id:'vermilion-lacquer',name:'朱漆',color:'#C8442C',dark:'#7D1D13',inner:'#8C271B',description:'鮮やかな朱色'},
  {id:'wipe-lacquer',name:'拭き漆',color:'#98613D',dark:'#4B2D1E',inner:'#64412C',description:'木目が見える漆仕上げ'},
  {id:'bamboo',name:'竹編み',color:'#C7B17C',dark:'#82734D',inner:'#9D8B5C',description:'編み目を感じる黄褐色'},
  {id:'glass',name:'硝子',color:'#9ABFC0',dark:'#5A8588',inner:'#D5E6E5',description:'透け感のある青緑'}
];
const CRAFT_IDEAS = {
  impression:[['輪郭に強弱をつける','張り出しやくびれをつくり、形の変化から特徴を生み出す。'],['異なる形を組み合わせる','曲線と直線、丸と角など、異なる形状を一つの造形にまとめる。'],['一部分を強調する','口元・縁・脚など、特定の部分に特徴を集中させる。']],
  useful:[['使う動作から形を考える','持つ・注ぐ・置くなど、使用時の動作を形状に反映する。'],['縁の形に役割を持たせる','縁の高さや角度を、見た目だけでなく使い方にも結びつける。'],['支える部分を工夫する','底や脚の形を調整し、安定性と造形の特徴を両立させる。']],
  texture:[['素材の模様や流れを生かす','木目や繊維の方向を観察し、形や加工の方向を合わせる。'],['仕上げの違いを使い分ける','磨き方や塗り方を変え、光沢や手触りの違いを表現に取り入れる。'],['素材の色や表情を対比させる','異なる色味や質感の素材を隣り合わせ、互いの特徴を際立たせる。']],
  light:[['隙間をつくる','素材を詰め切らず、空間が見える構造にする。'],['広い輪郭をつくる','上部に向かって広がる形や、薄く開いた縁を用いる。'],['色の重さを調整する','色の面積や配置を工夫し、形の密度や広がりの感じ方を変える。']]
};
// Museum and collection records below are factual references; the design insight is an interpretation for this prototype.
const REFERENCES = [
  {title:'朱漆三面鏡',maker:'黒田辰秋',date:'1934年',material:'漆工',insight:'朱色の面と鏡の構成に注目し、「一部分を強調する」見方を考える参考に。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=153181',source:'独立行政法人国立美術館・所蔵作品検索'},
  {title:'欅拭漆飾棚',maker:'黒田辰秋',date:'1970年',material:'欅・漆',insight:'木目を生かす拭漆の仕上げに注目し、素材の表情と仕上げの関係を考える参考に。',url:'https://www.museum.toyota.aichi.jp/collection/kuroda-tatsuaki',source:'豊田市美術館 コレクション'},
  {title:'鹿模様湯呑',maker:'絵付：浅井忠',date:'1907年頃',material:'陶器',insight:'器の形だけでなく、表面の図柄が印象をどう変えるか考える参考に。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=153821',source:'京都国立近代美術館・所蔵作品検索'}
];
let state = {ideal:null,preset:'bowl',material:'red',height:50,width:50,contour:50,selectedIdeas:[],memo:'',startedAt:null,remaining:90,saveAfter:'finish'};
let timerInterval=null;
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function showScreen(id){$$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});if(id!=='workScreen')stopTimer();}
function getIdeal(){return IDEALS.find(x=>x.id===state.ideal)||IDEALS[0]}
function getPreset(){return PRESETS.find(x=>x.id===state.preset)||PRESETS[0]}
function getMaterial(){return MATERIALS.find(x=>x.id===state.material)||MATERIALS[1]}
function renderIdeals(){ $('#idealGrid').innerHTML=IDEALS.map((x,i)=>`<button class="ideal-card ${state.ideal===x.id?'selected':''}" data-ideal="${x.id}"><span class="ideal-number">IDEAL / 0${i+1}</span><span class="ideal-title">${x.title}</span><span class="ideal-arrow">↗</span></button>`).join('');$$('[data-ideal]').forEach(b=>b.addEventListener('click',()=>{state.ideal=b.dataset.ideal;renderIdeals();$('#chooseIdealButton').disabled=false;}));$('#chooseIdealButton').disabled=!state.ideal;}
function miniShape(kind){const paths={bowl:'<path d="M15 22 Q50 33 85 22 L76 65 Q70 77 50 78 Q30 77 24 65Z" fill="#AA432E"/><ellipse cx="50" cy="22" rx="35" ry="10" fill="#CF4E35"/><ellipse cx="50" cy="23" rx="25" ry="6" fill="#2B0800"/>',spout:'<path d="M20 25 Q45 36 74 25 L66 64 Q60 75 44 75 Q28 73 26 60Z" fill="#AA432E"/><path d="M69 29 Q88 14 88 25 Q86 35 72 40" fill="#CF4E35"/><ellipse cx="47" cy="25" rx="27" ry="9" fill="#CF4E35"/><ellipse cx="47" cy="26" rx="19" ry="5" fill="#2B0800"/>',shallow:'<path d="M13 35 Q50 48 87 35 L79 58 Q71 72 50 72 Q29 72 21 58Z" fill="#AA432E"/><ellipse cx="50" cy="35" rx="37" ry="12" fill="#CF4E35"/><ellipse cx="50" cy="36" rx="27" ry="7" fill="#2B0800"/>',tray:'<path d="M10 35 Q50 48 90 35 L84 58 Q50 71 16 58Z" fill="#AA432E"/><ellipse cx="50" cy="35" rx="40" ry="12" fill="#CF4E35"/><ellipse cx="50" cy="36" rx="30" ry="7" fill="#2B0800"/>',basket:'<path d="M20 30 Q50 41 80 30 L73 64 Q50 75 27 64Z" fill="#C7B17C" stroke="#82734D" stroke-width="2"/><ellipse cx="50" cy="30" rx="30" ry="10" fill="#DCCB9E" stroke="#82734D" stroke-width="2"/><path d="M26 42 L74 58 M34 31 L32 66 M50 32 L50 70 M66 31 L68 66 M24 52 L76 43" stroke="#82734D" stroke-width="2"/>',cube:'<path d="M20 28 L50 14 L82 29 L50 44Z" fill="#CF4E35"/><path d="M20 28 L50 44 L50 78 L20 61Z" fill="#AA432E"/><path d="M50 44 L82 29 L82 62 L50 78Z" fill="#7D2B1B"/>',cylinder:'<path d="M23 25 L23 68 Q50 82 77 68 L77 25Z" fill="#AA432E"/><ellipse cx="50" cy="25" rx="27" ry="9" fill="#CF4E35"/><ellipse cx="50" cy="26" rx="19" ry="5" fill="#2B0800"/>'};return `<svg viewBox="0 0 100 90" aria-hidden="true">${paths[kind]||paths.bowl}</svg>`}
function renderPresets(){$('#presetGrid').innerHTML=PRESETS.map(p=>`<button class="preset-card ${state.preset===p.id?'selected':''}" data-preset="${p.id}">${miniShape(p.kind)}<span>${p.name}</span></button>`).join('');$$('[data-preset]').forEach(b=>b.addEventListener('click',()=>{state.preset=b.dataset.preset;renderPresets();updatePreview();}));}
function renderMaterials(){$('#materialList').innerHTML=MATERIALS.map(m=>`<button class="material-card ${state.material===m.id?'selected':''}" data-material="${m.id}"><span class="swatch" style="--swatch:${m.color}"></span><span>${m.name}</span></button>`).join('');$$('[data-material]').forEach(b=>b.addEventListener('click',()=>{state.material=b.dataset.material;renderMaterials();updatePreview();}));}
function vesselPath(p,h,w,c){
  // 各スライダーの変化がプレビュー上で十分に見えるようにする。
  const H=Number(h), W=Number(w), C=Number(c);
  const width=62+(W-25)*1.65;
  let top=100, depth=66+(H-25)*2.1;
  if(p==='shallow'||p==='tray'){top=136;depth=25+(H-25)*1.15;}
  const bottom=Math.min(302,top+depth);
  const cx=210, left=cx-width, right=cx+width;
  const ry=Math.max(12,width*.25);
  if(p==='cylinder'){
    const taper=(C-50)*.32;
    return {body:`M${left} ${top} L${left+taper} ${bottom-12} Q${cx} ${bottom+9} ${right-taper} ${bottom-12} L${right} ${top} Z`,rimY:top,rx:width,ry,insideRx:width*.78};
  }
  if(p==='cube'){
    const skew=(C-50)*.36;
    return {body:`M${left} ${top+12} L${cx-width*.18} ${top-16} L${right} ${top+12} L${right-8+skew} ${bottom-8} L${cx} ${bottom+7} L${left+8-skew} ${bottom-8} Z`,rimY:top+12,rx:width,ry,insideRx:width*.72};
  }
  // C=0 はすぼまった形、C=100 は外側に張り出した形。
  const flare=(C-50)*.90;
  const midWidth=Math.max(24,width*.76+flare);
  const footWidth=Math.max(18,width*(p==='tray'?.73:.54)-flare*.35);
  const midY=top+depth*.58;
  const body=`M${left} ${top} C${left+8} ${top+depth*.20} ${cx-midWidth} ${midY-depth*.13} ${cx-midWidth} ${midY} C${cx-midWidth} ${bottom-12} ${cx-footWidth} ${bottom} ${cx} ${bottom} C${cx+footWidth} ${bottom} ${cx+midWidth} ${bottom-12} ${cx+midWidth} ${midY} C${cx+midWidth} ${midY-depth*.13} ${right-8} ${top+depth*.20} ${right} ${top} Z`;
  return {body,rimY:top,rx:width,ry,insideRx:width*.79};
}
const textureStatus={};
let textureRequest=0;
function loadMaterialTexture(id){
  const overlay=$('#vesselTextureOverlay');
  const image=$('#materialTextureImage');
  if(!overlay||!image)return;
  const request=++textureRequest;
  overlay.style.display='none';
  const extensions=['jpg','jpeg','png','webp'];
  let index=0;
  function tryNext(){
    if(request!==textureRequest)return;
    if(index>=extensions.length){console.warn('素材画像が見つかりません:',id);return;}
    const src=new URL(`assets/materials/${id}.${extensions[index++]}`,document.baseURI).href;
    const probe=new Image();
    probe.onload=()=>{
      if(request!==textureRequest)return;
      image.setAttribute('href',src);
      image.setAttributeNS('http://www.w3.org/1999/xlink','href',src);
      overlay.style.display='';
    };
    probe.onerror=tryNext;
    probe.src=src;
  }
  tryNext();
}
function updatePreview(){const m=getMaterial(),p=getPreset(),g=vesselPath(p.kind,Number(state.height),Number(state.width),Number(state.contour));const body=$('#vesselBody'),rim=$('#vesselRim'),inside=$('#vesselInside'),shine=$('#vesselShine'),innerLight=$('#vesselInnerLight');body.setAttribute('d',g.body); const texture = document.querySelector('#vesselTextureOverlay'); if (texture) { texture.setAttribute('d',g.body); } body.setAttribute('fill',m.color);rim.setAttribute('cx','210');rim.setAttribute('cy',g.rimY);rim.setAttribute('rx',g.rx);rim.setAttribute('ry',g.ry);rim.setAttribute('fill',m.color);inside.setAttribute('cx','210');inside.setAttribute('cy',g.rimY+2);inside.setAttribute('rx',g.insideRx);inside.setAttribute('ry',g.ry*.64);inside.setAttribute('fill',m.dark);shine.setAttribute('d',`M${210-g.rx*.82} ${g.rimY+g.ry*.55} Q${210-g.rx*.65} ${g.rimY+g.ry} ${210-g.rx*.55} ${g.rimY+g.ry+40} L${210-g.rx*.42} ${g.rimY+Math.max(30,Number(state.height)*1.4)} Q${210-g.rx*.5} ${g.rimY+Math.max(30,Number(state.height)*1.4)+9} ${210-g.rx*.61} ${g.rimY+Math.max(30,Number(state.height)*1.4)} Z`);shine.setAttribute('opacity',m.id==='black-lacquer'?'.18':'.65');innerLight.setAttribute('d',`M${210-g.insideRx} ${g.rimY+2} Q210 ${g.rimY+g.ry*1.5} ${210+g.insideRx} ${g.rimY+2}`);$('#shapeCaption').textContent=`${p.name} / ${m.name}`;$('#heightValue').value=state.height;$('#widthValue').value=state.width;$('#contourValue').value=state.contour;$('#heightRange').value=state.height;$('#widthRange').value=state.width;$('#contourRange').value=state.contour;$('#currentIdeal').textContent=getIdeal().title;$('#timerValue').textContent=state.remaining;$('#vesselStage').style.background=m.id==='glass'?'radial-gradient(ellipse at 50% 48%,#f5ffff 0%,#dbe9e8 100%)':'';}
function renderIdeas(){const ideas=CRAFT_IDEAS[state.ideal]||CRAFT_IDEAS.impression;$('#craftIdeas').innerHTML=ideas.map(([title,desc],i)=>`<article class="craft-idea ${state.selectedIdeas.includes(title)?'selected':''}"><button class="idea-select" data-select-idea="${title}">${state.selectedIdeas.includes(title)?'✓ 選択中':'+ 選ぶ'}</button><h3>${title}</h3><p>${desc}</p></article>`).join('');$$('[data-select-idea]').forEach(b=>b.addEventListener('click',()=>{const title=b.dataset.selectIdea;state.selectedIdeas=state.selectedIdeas.includes(title)?state.selectedIdeas.filter(x=>x!==title):[...state.selectedIdeas,title];renderIdeas();}));$('#referenceList').innerHTML=REFERENCES.map(r=>`<article class="reference-card"><span class="eyebrow">${r.material}</span><h4>${r.title}<br><span style="font-weight:500;color:#766861">${r.maker} / ${r.date}</span></h4><p>${r.insight}<br><span style="color:#938983">※見方の提案は本プロトタイプによる解釈です。</span></p><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.source} ↗</a></article>`).join('');$('#resultSummary').textContent=`${getPreset().name} / ${getMaterial().name}`;$('#resultGoal').textContent=getIdeal().title;$('#resultThumb').innerHTML=miniShape(getPreset().kind);}
function renderReflection(){const options=(CRAFT_IDEAS[state.ideal]||CRAFT_IDEAS.impression).map(x=>x[0]);$('#reflectionChoices').innerHTML=options.map(x=>`<label class="reflection-choice"><input type="checkbox" value="${x}" ${state.selectedIdeas.includes(x)?'checked':''}><span>${x}</span></label>`).join('');$$('#reflectionChoices input').forEach(ch=>ch.addEventListener('change',()=>{state.selectedIdeas= $$('#reflectionChoices input:checked').map(x=>x.value);}));$('#memoInput').value=state.memo||'';}
function readSaved(){try{return JSON.parse(localStorage.getItem('kogei-ideas-library')||'[]')}catch(e){return []}}
function writeSaved(list){localStorage.setItem('kogei-ideas-library',JSON.stringify(list));updateSavedCount();}
function updateSavedCount(){$('#savedCount').textContent=readSaved().length}
function renderLibrary(){const list=readSaved();if(!list.length){$('#libraryList').innerHTML='<div class="empty-state">まだ保存されたアイデアはありません。<br>制作を体験して、気になった工夫を保存してみましょう。</div>';return;}$('#libraryList').innerHTML=list.slice().reverse().map(entry=>`<article class="library-entry"><div class="library-entry-head"><span class="eyebrow">SAVED IDEA</span><button class="delete-entry" data-delete="${entry.id}">削除 ×</button></div><h3>${entry.idealTitle}</h3><div class="entry-meta">${entry.preset} / ${entry.material}　・　${entry.date}</div><div class="entry-ideas"><strong>参考になった工夫</strong><br>${entry.ideas.length?entry.ideas.map(escapeHtml).join('、'):'未選択'}</div>${entry.memo?`<p class="entry-memo"><strong>メモ</strong><br>${escapeHtml(entry.memo)}</p>`:''}</article>`).join('');$$('[data-delete]').forEach(b=>b.addEventListener('click',()=>{writeSaved(readSaved().filter(x=>x.id!==b.dataset.delete));renderLibrary();}));}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function startTimer(){stopTimer();state.remaining=90;state.startedAt=Date.now();updatePreview();timerInterval=setInterval(()=>{const elapsed=Math.floor((Date.now()-state.startedAt)/1000);state.remaining=Math.max(0,90-elapsed);$('#timerValue').textContent=state.remaining;$('#workScreen').classList.toggle('urgent',state.remaining<=30);const hintIndex=Math.floor(elapsed/18)%getIdeal().hints.length;$('#hintText').textContent=getIdeal().hints[hintIndex];if(state.remaining<=0){stopTimer();$('#finishButton').textContent='制作を終える →';}},250);}
function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null;}}
function beginCreation(){state.preset='bowl';state.material='red';state.height=50;state.width=50;state.contour=50;state.selectedIdeas=[];state.memo='';state.remaining=90;renderPresets();renderMaterials();updatePreview();$$('.tab').forEach(t=>t.classList.toggle('active',t.dataset.tab==='preset'));$$('.tab-panel').forEach(p=>p.classList.toggle('active',p.id==='presetPanel'));showScreen('workScreen');startTimer();}
function finishMaking(){stopTimer();$('#workScreen').classList.remove('urgent');renderIdeas();showScreen('ideasScreen');}
function saveSession(){state.memo=$('#memoInput').value.trim();const entry={id:Date.now().toString(36),date:new Date().toLocaleDateString('ja-JP'),ideal:state.ideal,idealTitle:getIdeal().title,preset:getPreset().name,material:getMaterial().name,ideas:[...state.selectedIdeas],memo:state.memo};const list=readSaved();list.push(entry);writeSaved(list);showScreen('finishScreen');}
// Screen navigation and controls
$('#startButton').addEventListener('click',()=>{state.ideal=null;renderIdeals();showScreen('idealScreen')});$('#chooseIdealButton').addEventListener('click',()=>{if(state.ideal)beginCreation()});$('#changeIdealButton').addEventListener('click',()=>{stopTimer();renderIdeals();showScreen('idealScreen')});$('#resetButton').addEventListener('click',()=>{if(confirm('形と素材を初期状態に戻しますか？')){state.preset='bowl';state.material='red';state.height=50;state.width=50;state.contour=50;renderPresets();renderMaterials();updatePreview();}});$$('.tab').forEach(t=>t.addEventListener('click',()=>{$$('.tab').forEach(x=>x.classList.toggle('active',x===t));$$('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===`${t.dataset.tab}Panel`));}));[['heightRange','height'],['widthRange','width'],['contourRange','contour']].forEach(([id,key])=>$('#'+id).addEventListener('input',e=>{state[key]=Number(e.target.value);$('#'+key+'Value').value=state[key];updatePreview();}));$('#finishButton').addEventListener('click',finishMaking);$('#redoButton').addEventListener('click',beginCreation);$('#reflectionButton').addEventListener('click',()=>{renderReflection();showScreen('reflectionScreen')});$('#saveButton').addEventListener('click',saveSession);$('#finishHomeButton').addEventListener('click',()=>showScreen('titleScreen'));$('#finishLibraryButton').addEventListener('click',()=>{renderLibrary();showScreen('libraryScreen')});$('#libraryButton').addEventListener('click',()=>{renderLibrary();showScreen('libraryScreen')});$('#titleLibraryButton').addEventListener('click',()=>{renderLibrary();showScreen('libraryScreen')});$('#libraryStartButton').addEventListener('click',()=>{state.ideal=null;renderIdeals();showScreen('idealScreen')});$('#homeButton').addEventListener('click',()=>showScreen('titleScreen'));$$('[data-go]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.go)));
renderIdeals();renderPresets();renderMaterials();updatePreview();updateSavedCount();
