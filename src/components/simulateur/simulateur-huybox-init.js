// Auto-génré à partir du prototype simulateurvolumehuybox.html fourni par le client.
// Logique volontairement en JS classique (non TypeScript) : ce module n'est pas
// type-checké par le build Next.js (voir tsconfig `checkJs`), pour rester au plus
// proche du fichier d'origine et faciliter les futures mises à jour depuis celui-ci.
export function initHuyboxSimulator() {
  "use strict";

  // ---------- Catalogue ----------
  var CATALOG = {
    "Salon": {
      icon:"🛋️",
      items:[
        {id:"canape2", label:"Canapé 2 places", vol:1.0},
        {id:"canape3", label:"Canapé 3 places / d'angle", vol:1.6},
        {id:"fauteuil", label:"Fauteuil", vol:0.5},
        {id:"tablebasse", label:"Table basse", vol:0.3},
        {id:"meubletv", label:"Meuble TV", vol:0.5},
        {id:"biblio", label:"Bibliothèque / étagère", vol:0.9},
        {id:"tablemanger", label:"Table à manger", vol:0.9},
        {id:"chaise", label:"Chaise", vol:0.15},
        {id:"buffet", label:"Buffet / vaisselier", vol:1.3},
        {id:"tapis", label:"Tapis (roulé)", vol:0.2}
      ]
    },
    "Chambre": {
      icon:"🛏️",
      items:[
        {id:"lit1", label:"Lit 1 place (matelas + sommier)", vol:1.0},
        {id:"lit2", label:"Lit 2 places (matelas + sommier)", vol:1.6},
        {id:"armoire2", label:"Armoire 2 portes", vol:1.5},
        {id:"armoire4", label:"Armoire 3-4 portes", vol:2.3},
        {id:"commode", label:"Commode", vol:0.6},
        {id:"chevet", label:"Table de chevet", vol:0.2},
        {id:"bureau", label:"Bureau", vol:0.7},
        {id:"miroir", label:"Miroir sur pied", vol:0.2}
      ]
    },
    "Cuisine & électro": {
      icon:"🍽️",
      items:[
        {id:"frigo", label:"Réfrigérateur", vol:0.8},
        {id:"congel", label:"Congélateur", vol:0.6},
        {id:"lavelinge", label:"Lave-linge", vol:0.6},
        {id:"lavevaisselle", label:"Lave-vaisselle", vol:0.5},
        {id:"four", label:"Four / cuisinière", vol:0.4},
        {id:"microonde", label:"Micro-ondes", vol:0.1},
        {id:"tablecuisine", label:"Table + chaises de cuisine", vol:0.7}
      ]
    },
    "Cartons & rangement": {
      icon:"📦",
      items:[
        {id:"cartonstd", label:"Carton standard (55×35×35 cm)", vol:0.1},
        {id:"cartonlivre", label:"Carton livres (petit, renforcé)", vol:0.06},
        {id:"housse", label:"Housse à vêtements", vol:0.15},
        {id:"valise", label:"Valise", vol:0.15},
        {id:"bac", label:"Caisse / bac de rangement", vol:0.1}
      ]
    },
    "Extérieur & garage": {
      icon:"🚲",
      items:[
        {id:"velo", label:"Vélo", vol:0.3},
        {id:"tondeuse", label:"Tondeuse", vol:0.4},
        {id:"bbq", label:"Barbecue", vol:0.3},
        {id:"salondejardin", label:"Salon de jardin (table + chaises)", vol:1.2},
        {id:"moto", label:"Moto", vol:1.5},
        {id:"pneus", label:"Pneu", vol:0.075},
        {id:"etabli", label:"Établi / outillage", vol:0.6}
      ]
    },
    "Professionnel": {
      icon:"💼",
      items:[
        {id:"archive", label:"Carton d'archives", vol:0.05},
        {id:"bureaupro", label:"Bureau professionnel", vol:0.7},
        {id:"chaisebureau", label:"Chaise de bureau", vol:0.3},
        {id:"caisson", label:"Caisson de rangement", vol:0.3},
        {id:"armoirebureau", label:"Armoire de bureau", vol:1.2},
        {id:"ecran", label:"Écran / matériel informatique", vol:0.15}
      ]
    }
  };

  // Tailles de box réellement disponibles chez Huybox (hauteur sous plafond 2,5 m)
  var BOX_HEIGHT = 2.5;
  var PRICE_PER_M3 = 8; // €/m³/mois
  var BOXES = [
    {vol:8,  m2:8/2.5,  l:2, w:1.6},
    {vol:10, m2:10/2.5, l:2, w:2},
    {vol:15, m2:15/2.5, l:2, w:3}
  ];
  BOXES.forEach(function(b){ b.price = b.vol * PRICE_PER_M3; });

  var MARGIN = 1.15; // marge d'accès / circulation
  var GAUGE_MAX = 20; // m3, échelle visuelle de la jauge

  // Cherche la combinaison de box (parmi 8 / 10 / 15 m³) qui couvre le volume
  // demandé avec le moins de perte de place, puis le moins de box possible.
  function bestCombo(volume){
    if (volume <= 0) return null;
    var best = null;
    for (var n15 = 0; n15 <= 6; n15++){
      for (var n10 = 0; n10 <= 8; n10++){
        for (var n8 = 0; n8 <= 8; n8++){
          var count = n15 + n10 + n8;
          if (count === 0) continue;
          var cap = n15*15 + n10*10 + n8*8;
          if (cap < volume) continue;
          var waste = cap - volume;
          if (!best || waste < best.waste || (waste === best.waste && count < best.count)){
            best = { n15:n15, n10:n10, n8:n8, cap:cap, waste:waste, count:count };
          }
        }
      }
    }
    return best;
  }

  function comboLabel(combo){
    var parts = [];
    [ [combo.n15,15], [combo.n10,10], [combo.n8,8] ].forEach(function(p){
      if (p[0] > 0) parts.push((p[0]>1 ? p[0]+' × ' : '') + 'Box ' + p[1] + ' m³');
    });
    return parts.join(' + ');
  }

  function comboM2(combo){
    var m2 = combo.n15*(15/BOX_HEIGHT) + combo.n10*(10/BOX_HEIGHT) + combo.n8*(8/BOX_HEIGHT);
    return m2;
  }

  function comboPrice(combo){
    return (combo.n15*15 + combo.n10*10 + combo.n8*8) * PRICE_PER_M3;
  }

  // ---------- Scène isométrique "box rempli" ----------
  // Axes isométriques (2:1) partagés par la pièce et les objets, pour que
  // tout reste aligné sur la même grille au sol.
  var ISO = { ax: 29.4487, ay: 17, bx: -29.4487, by: 17, hUnit: 32 };
  var ISO_BACKTOP = { x: 95, y: 12 }; // coin arrière de la pièce, en haut du mur (repère fixe à l'écran)
  var ISO_MAX_STACK = 3; // hauteur max d'une pile d'objets identiques
  var ROOM_HEIGHT_M = BOX_HEIGHT; // plafond du box (2,5 m), sert de limite d'empilement
  var MIN_HEADROOM_M = 0.22; // hauteur libre mini pour poser un petit objet au-dessus d'un meuble
  // Meubles au dessus plat, assez solide pour qu'on pose des cartons/petits appareils dessus.
  var HOST_ARCHETYPES = {wardrobe:1, shelf:1, fridge:1, cube_appliance:1, desk:1, nightstand:1};
  // Petits objets qu'on pose naturellement au-dessus d'un autre (carton sur carton,
  // sèche-linge sur lave-linge, valise sur une armoire...).
  var GUEST_ARCHETYPES = {carton:1, suitcase:1, crate:1, cube_appliance:1, micro:1};

  // Combien d'exemplaires identiques tiennent dans une même pile, et de
  // combien elle monte à chaque exemplaire. Pour les objets "empilables"
  // (chaises...), chaque exemplaire ajouté ne prend qu'un petit supplément
  // de hauteur (nestFh) au lieu de sa hauteur pleine — comme de vraies
  // chaises qui s'emboîtent, plutôt que reposées les unes sur les autres.
  function stackStep(style){
    return style.nestFh != null ? style.nestFh : style.fh;
  }
  function stackCapFor(style){
    var step = stackStep(style);
    var maxByHeight = Math.max(1, Math.floor((ROOM_HEIGHT_M - style.fh) / step) + 1);
    return Math.max(1, Math.min(style.nestFh != null ? 8 : ISO_MAX_STACK, maxByHeight));
  }

  function shade(hex, percent){
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    var adj = function(c){ return Math.max(0, Math.min(255, Math.round(c + (percent/100) * (percent > 0 ? (255 - c) : c)))); };
    r = adj(r); g = adj(g); b = adj(b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // ---------- Petites primitives géométriques isométriques ----------
  function ptsStr(arr){ return arr.map(function(p){ return p.x.toFixed(1)+','+p.y.toFixed(1); }).join(' '); }
  function svgPoly(pts, fill){ return '<polygon points="'+ptsStr(pts)+'" fill="'+fill+'" stroke="#00000022" stroke-width="0.6"></polygon>'; }
  function svgOutlinePoly(pts, stroke, w){ return '<polygon points="'+ptsStr(pts)+'" fill="none" stroke="'+stroke+'" stroke-width="'+(w||1.1)+'"></polygon>'; }
  function svgLine(p1,p2,color,w){ return '<line x1="'+p1.x.toFixed(1)+'" y1="'+p1.y.toFixed(1)+'" x2="'+p2.x.toFixed(1)+'" y2="'+p2.y.toFixed(1)+'" stroke="'+color+'" stroke-width="'+(w||1.2)+'" stroke-linecap="round"></line>'; }
  function svgCircle(p,r,fill,stroke,sw){ return '<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+r+'" fill="'+(fill||'none')+'"'+(stroke?' stroke="'+stroke+'" stroke-width="'+(sw||1)+'"':'')+'></circle>'; }
  function svgEllipse(p,rx,ry,fill,stroke,sw){ return '<ellipse cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" rx="'+rx+'" ry="'+ry+'" fill="'+(fill||'none')+'"'+(stroke?' stroke="'+stroke+'" stroke-width="'+(sw||1)+'"':'')+'></ellipse>'; }
  function lerpPt(p1,p2,t){ return {x:p1.x+(p2.x-p1.x)*t, y:p1.y+(p2.y-p1.y)*t}; }
  function faceCenterOf(p1,p2,p3,p4){ return {x:(p1.x+p2.x+p3.x+p4.x)/4, y:(p1.y+p2.y+p3.y+p4.y)/4}; }

  function cornersAt(origin, a, b, heightPx){
    var P=origin, PA={x:origin.x+a.x,y:origin.y+a.y}, PB={x:origin.x+b.x,y:origin.y+b.y}, PAB={x:origin.x+a.x+b.x,y:origin.y+a.y+b.y};
    return {
      P:P, PA:PA, PB:PB, PAB:PAB,
      Pt:{x:P.x,y:P.y-heightPx}, PAt:{x:PA.x,y:PA.y-heightPx}, PBt:{x:PB.x,y:PB.y-heightPx}, PABt:{x:PAB.x,y:PAB.y-heightPx}
    };
  }
  // Dégradés doux par face (plutôt qu'un aplat) pour donner un vrai volume
  // aux blocs procéduraux — un rendu plus "3D", sans avoir besoin de photo.
  var blockGradSeq = 0;
  function blockFaces(C, colorBase){
    var gid = 'bg' + (blockGradSeq++);
    var cTop1=shade(colorBase,26), cTop2=shade(colorBase,8);
    var cRight1=shade(colorBase,4), cRight2=shade(colorBase,-16);
    var cLeft1=shade(colorBase,-14), cLeft2=shade(colorBase,-34);
    var defs =
      '<linearGradient id="'+gid+'t" x1="20%" y1="0%" x2="85%" y2="100%">' +
        '<stop offset="0%" stop-color="'+cTop1+'"></stop><stop offset="100%" stop-color="'+cTop2+'"></stop>' +
      '</linearGradient>' +
      '<linearGradient id="'+gid+'r" x1="0%" y1="0%" x2="0%" y2="100%">' +
        '<stop offset="0%" stop-color="'+cRight1+'"></stop><stop offset="100%" stop-color="'+cRight2+'"></stop>' +
      '</linearGradient>' +
      '<linearGradient id="'+gid+'l" x1="0%" y1="0%" x2="0%" y2="100%">' +
        '<stop offset="0%" stop-color="'+cLeft1+'"></stop><stop offset="100%" stop-color="'+cLeft2+'"></stop>' +
      '</linearGradient>';
    return '<defs>'+defs+'</defs>' +
           svgPoly([C.Pt,C.PAt,C.PABt,C.PBt], 'url(#'+gid+'t)') +
           svgPoly([C.P,C.PA,C.PAt,C.Pt], 'url(#'+gid+'r)') +
           svgPoly([C.P,C.PB,C.PBt,C.Pt], 'url(#'+gid+'l)');
  }
  // Bloc "posé sur pieds": tige fines du sol jusqu'au dessous d'un bloc surélevé.
  function withLegs(floorOrigin, a, b, legLenPx, blockHeightPx, color, legColor){
    var raised = {x:floorOrigin.x, y:floorOrigin.y-legLenPx};
    var C = cornersAt(raised, a, b, blockHeightPx);
    var legs = svgLine(floorOrigin, C.P, legColor, 1.5) +
               svgLine({x:floorOrigin.x+a.x,y:floorOrigin.y+a.y}, C.PA, legColor, 1.5) +
               svgLine({x:floorOrigin.x+b.x,y:floorOrigin.y+b.y}, C.PB, legColor, 1.5);
    return { svg: legs + blockFaces(C, color), corners:C, raisedOrigin:raised };
  }

  // ---------- Bibliothèque d'archétypes isométriques ----------
  // Chaque archétype dessine un petit objet reconnaissable (meuble, carton,
  // vélo…) à partir d'une origine au sol et des mêmes axes isométriques que
  // la pièce, pour rester visuellement cohérent entre la liste et la scène.
  var ARCHETYPES = {
    block: function(o,a,b,h,c){ return blockFaces(cornersAt(o,a,b,h), c); },

    sofa: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var seamR = svgLine(lerpPt(C.P,C.Pt,0.5), lerpPt(C.PA,C.PAt,0.5), shade(c,-35), 1);
      var seamL = svgLine(lerpPt(C.P,C.Pt,0.5), lerpPt(C.PB,C.PBt,0.5), shade(c,-35), 1);
      return body+seamR+seamL;
    },
    shelf: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var seam = svgLine(lerpPt(C.P,C.Pt,0.45), lerpPt(C.PA,C.PAt,0.45), shade(c,-35), 1);
      var handle = svgCircle(lerpPt(C.P,C.Pt,0.5), 1.4, shade(c,-45));
      return body+seam+handle;
    },
    wardrobe: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var topMid=lerpPt(C.Pt,C.PAt,0.5), botMid=lerpPt(C.P,C.PA,0.5);
      var seam=svgLine(topMid,botMid,shade(c,-40),1.1);
      var midP=lerpPt(C.P,C.Pt,0.45), midPA=lerpPt(C.PA,C.PAt,0.45);
      var handle1=svgCircle(lerpPt(midP,midPA,0.25),1.2,shade(c,-45));
      var handle2=svgCircle(lerpPt(midP,midPA,0.75),1.2,shade(c,-45));
      return body+seam+handle1+handle2;
    },
    fridge: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var seam = svgLine(lerpPt(C.P,C.Pt,0.3), lerpPt(C.PA,C.PAt,0.3), shade(c,-30), 1);
      var hp1=lerpPt(C.PA,C.PAt,0.08), hp2=lerpPt(C.PA,C.PAt,0.24);
      var handle=svgLine(hp1,hp2, shade(c,-55), 1.3);
      return body+seam+handle;
    },
    cube_appliance: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var fc = faceCenterOf(C.P,C.PA,C.PAt,C.Pt);
      return body + svgCircle(fc, 5, 'none', shade(c,-45), 1.3);
    },
    micro: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var fc = faceCenterOf(C.P,C.PA,C.PAt,C.Pt);
      var rect = [{x:fc.x-3.5,y:fc.y-2.5},{x:fc.x+3.5,y:fc.y-2.5},{x:fc.x+3.5,y:fc.y+2.5},{x:fc.x-3.5,y:fc.y+2.5}];
      return body + svgOutlinePoly(rect, shade(c,-45), 1.1);
    },
    carton: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var topC = faceCenterOf(C.Pt,C.PAt,C.PABt,C.PBt);
      var fold = shade(c,-40);
      return body + svgLine(C.Pt,topC,fold,0.9) + svgLine(C.PAt,topC,fold,0.9) +
             svgLine(C.PBt,topC,fold,0.9) + svgLine(C.PABt,topC,fold,0.9);
    },
    suitcase: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var topC = faceCenterOf(C.Pt,C.PAt,C.PABt,C.PBt);
      var hc = shade(c,-45);
      var pts = [{x:topC.x-4,y:topC.y-3},{x:topC.x-2,y:topC.y-6.5},{x:topC.x+2,y:topC.y-6.5},{x:topC.x+4,y:topC.y-3}];
      return body + '<polyline points="'+ptsStr(pts)+'" fill="none" stroke="'+hc+'" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></polyline>';
    },
    garmentbag: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var topC = faceCenterOf(C.Pt,C.PAt,C.PABt,C.PBt);
      return body + svgCircle({x:topC.x,y:topC.y-5}, 3, 'none', shade(c,-40), 1.3);
    },
    crate: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = svgPoly([C.P,C.PA,C.PAt,C.Pt], shade(c,0)) + svgPoly([C.P,C.PB,C.PBt,C.Pt], shade(c,-22));
      var topC = faceCenterOf(C.Pt,C.PAt,C.PABt,C.PBt);
      var inset=0.22;
      var Pt2=lerpPt(C.Pt,topC,inset), PAt2=lerpPt(C.PAt,topC,inset), PABt2=lerpPt(C.PABt,topC,inset), PBt2=lerpPt(C.PBt,topC,inset);
      var rim = svgPoly([C.Pt,C.PAt,PAt2,Pt2], shade(c,12)) + svgPoly([C.Pt,C.PBt,PBt2,Pt2], shade(c,4));
      var inner = svgPoly([Pt2,PAt2,PABt2,PBt2], shade(c,-40));
      return body+rim+inner;
    },
    table: function(o,a,b,h,c){
      var topThick=Math.max(3,h*0.2), legLen=Math.max(2,h-topThick);
      return withLegs(o,a,b,legLen,topThick,c,'#33241a').svg;
    },
    chair: function(o,a,b,h,c){
      var seatThick=Math.max(2.5,h*0.16), legLen=Math.max(2,h-seatThick);
      return withLegs(o,a,b,legLen,seatThick,c,'#2b2b2b').svg;
    },
    nightstand: function(o,a,b,h,c){
      var legLen=Math.max(3,h*0.15), boxH=h-legLen;
      var r = withLegs(o,a,b,legLen,boxH,c,'#241a10');
      var C=r.corners;
      var drawer=svgLine(lerpPt(C.P,C.Pt,0.55), lerpPt(C.PA,C.PAt,0.55), shade(c,-35), 1);
      var knob=svgCircle(lerpPt(lerpPt(C.P,C.PA,0.5),lerpPt(C.Pt,C.PAt,0.5),0.62), 1.1, shade(c,-50));
      return r.svg+drawer+knob;
    },
    desk: function(o,a,b,h,c){
      var topThick=Math.max(3,h*0.2), legLen=Math.max(2,h-topThick);
      var r = withLegs(o,a,b,legLen,topThick,c,'#33241a');
      var dA={x:a.x*0.32,y:a.y*0.32}, dB={x:b.x*0.55,y:b.y*0.55};
      var dOrigin={x:o.x+a.x*0.04,y:o.y+a.y*0.04};
      var Cd=cornersAt(dOrigin, dA, dB, legLen*0.85);
      return blockFaces(Cd, shade(c,-12)) + r.svg;
    },
    panel: function(o,a,b,h,c){
      var standLen=h*0.22, panelH=h-standLen;
      var thinA={x:a.x*0.1,y:a.y*0.1}, thinB={x:b.x*0.85,y:b.y*0.85};
      var raised={x:o.x,y:o.y-standLen};
      var C=cornersAt(raised, thinA, thinB, panelH);
      var stand=svgLine(o, raised, shade(c,-30), 2);
      var base=svgEllipse(o, 6, 2.4, shade(c,-30));
      return base+stand+blockFaces(C,c);
    },
    bike: function(o,a,b,h,c){
      var wheelR=8.5;
      var back={x:o.x+a.x*0.15,y:o.y+a.y*0.15-wheelR};
      var front={x:o.x+a.x*0.85+b.x*0.15,y:o.y+a.y*0.85+b.y*0.15-wheelR};
      var seat={x:back.x,y:back.y-13}, pedal={x:(back.x+front.x)/2,y:(back.y+front.y)/2+4}, handle={x:front.x,y:front.y-15};
      var svg='';
      svg+=svgCircle(back,wheelR,'none','#22262b',2.1)+svgCircle(front,wheelR,'none','#22262b',2.1);
      svg+=svgCircle(back,1.8,'#22262b')+svgCircle(front,1.8,'#22262b');
      svg+=svgLine(back,seat,c,2.2)+svgLine(seat,pedal,c,2.2)+svgLine(pedal,front,c,2.2)+svgLine(pedal,handle,c,2.2)+svgLine(handle,front,c,2.2);
      svg+=svgCircle(seat,1.8,c);
      svg+=svgLine({x:handle.x-4.5,y:handle.y},{x:handle.x+4.5,y:handle.y},c,2.1);
      return svg;
    },
    moto: function(o,a,b,h,c){
      var wheelR=9.5;
      var back={x:o.x+a.x*0.12,y:o.y+a.y*0.12-wheelR};
      var front={x:o.x+a.x*0.85+b.x*0.1,y:o.y+a.y*0.85+b.y*0.1-wheelR};
      var svg='';
      svg+=svgCircle(back,wheelR,'#22262b')+svgCircle(front,wheelR,'#22262b');
      svg+=svgCircle(back,3.2,'#565a5f')+svgCircle(front,3.2,'#565a5f');
      var bodyOrigin={x:(back.x+front.x)/2-9,y:o.y-wheelR*0.55};
      var Cb=cornersAt(bodyOrigin, {x:a.x*0.5,y:a.y*0.5}, {x:b.x*0.32,y:b.y*0.32}, 15);
      svg+=blockFaces(Cb,c);
      var hb={x:front.x,y:front.y-wheelR*0.25}, ht={x:front.x,y:front.y-wheelR*2.1};
      svg+=svgLine(hb,ht,'#2b2b2b',2.1)+svgLine({x:ht.x-5.5,y:ht.y},{x:ht.x+5.5,y:ht.y},'#2b2b2b',2.1);
      return svg;
    },
    mower: function(o,a,b,h,c){
      var Cb=cornersAt(o,a,b,h*0.6);
      var svg=blockFaces(Cb,c);
      [Cb.P,Cb.PA,Cb.PB,Cb.PAB].forEach(function(pt){ svg+=svgCircle({x:pt.x,y:pt.y+1},3.2,'#2b2b2b'); });
      var handleEnd={x:Cb.PBt.x+b.x*0.5,y:Cb.PBt.y+b.y*0.5-16};
      svg+=svgLine(Cb.PBt,handleEnd,'#2b2b2b',2);
      return svg;
    },
    bbq: function(o,a,b,h,c){
      var legLen=h*0.28, bodyH=h-legLen, scale=0.62;
      var a2={x:a.x*scale,y:a.y*scale}, b2={x:b.x*scale,y:b.y*scale};
      var off={x:a.x*(1-scale)/2+b.x*(1-scale)/2, y:a.y*(1-scale)/2+b.y*(1-scale)/2};
      var raised={x:o.x+off.x,y:o.y+off.y-legLen};
      var C=cornersAt(raised,a2,b2,bodyH);
      var floorP={x:raised.x,y:raised.y+legLen};
      var svg=svgLine(floorP,raised,'#2b2b2b',1.6)+blockFaces(C,c);
      var lidC=faceCenterOf(C.Pt,C.PAt,C.PABt,C.PBt);
      svg+=svgEllipse(lidC, 6, 3, shade(c,22));
      return svg;
    },
    tires: function(o,a,b,h,c){
      var center={x:o.x+(a.x+b.x)*0.3,y:o.y+(a.y+b.y)*0.3};
      var svg='';
      for (var i=0;i<3;i++){
        var cy=center.y - i*5.5 - 4;
        svg+=svgEllipse({x:center.x,y:cy}, 10, 4.3, '#1f1f1f', '#000', 0.5);
        svg+=svgEllipse({x:center.x,y:cy}, 5.4, 2.3, '#3a3a3a');
      }
      return svg;
    },
    rug: function(o,a,b,h,c){
      var r=6.5;
      var start={x:o.x-a.x*0.1,y:o.y-r*0.6};
      var end={x:o.x+a.x*1.15,y:o.y-r*0.6};
      var svg=svgEllipse(start, r*0.5, r, shade(c,-20), '#00000022', 0.6);
      svg+='<rect x="'+Math.min(start.x,end.x).toFixed(1)+'" y="'+(start.y-r).toFixed(1)+'" width="'+Math.abs(end.x-start.x).toFixed(1)+'" height="'+(r*2).toFixed(1)+'" fill="'+c+'" stroke="#00000022" stroke-width="0.6"></rect>';
      svg+=svgEllipse(end, r*0.5, r, shade(c,15));
      return svg;
    },
    bed: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var backL = svgLine(C.PBt, {x:C.PBt.x,y:C.PBt.y-9}, shade(c,-45), 2);
      var backR = svgLine(C.PABt, {x:C.PABt.x,y:C.PABt.y-9}, shade(c,-45), 2);
      var top = svgLine({x:C.PBt.x,y:C.PBt.y-9}, {x:C.PABt.x,y:C.PABt.y-9}, shade(c,-45), 2);
      return body+backL+backR+top;
    },
    // Matelas/sommier stocké debout sur la tranche (pratique courante en
    // box de stockage pour gagner de la place au sol) : bloc haut et fin,
    // avec des coutures de matelassage horizontales.
    mattress_edge: function(o,a,b,h,c){
      var C = cornersAt(o,a,b,h);
      var body = blockFaces(C,c);
      var seam = shade(c,-22);
      var lines = '';
      for (var t=0.2; t<0.98; t+=0.22){
        lines += svgLine(lerpPt(C.P,C.Pt,t), lerpPt(C.PA,C.PAt,t), seam, 0.8);
        lines += svgLine(lerpPt(C.P,C.Pt,t), lerpPt(C.PB,C.PBt,t), seam, 0.8);
      }
      var pipeTop = svgLine(C.Pt, C.PAt, shade(c,-30), 1);
      return body+lines+pipeTop;
    }
  };

  // Photos réelles détourées, utilisées à la place du dessin procédural
  // pour les objets où elles sont disponibles (idem liste et scène de remplissage).
  var IMAGE_ASSETS = {
    velo: { href:"/images/item-velo.png", w:794, h:712 },
    frigo: { href:"/images/item-frigo.png", w:407, h:802 },
    roue: { href:"/images/item-pneu.png", w:563, h:715 },
    canape3: { href:"/images/item-canape.png", w:782, h:731 },
    chaise: { href:"/images/item-chaise.png", w:613, h:1041 },
    lavelinge: { href:"/images/item-lavelinge.png", w:682, h:814 },
    table: { href:"/images/item-table.png", w:936, h:867 },
  };

  // Objet du catalogue -> clé dans IMAGE_ASSETS (les objets non listés ici gardent
  // le dessin procédural par archétype).
  var ITEM_IMAGE_KEY = {
    velo:'velo', pneus:'roue',
    frigo:'frigo', congel:'frigo',
    canape2:'canape3', canape3:'canape3', fauteuil:'canape3',
    chaise:'chaise',
    lavelinge:'lavelinge', lavevaisselle:'lavelinge',
    tablebasse:'table', tablemanger:'table', tablecuisine:'table', salondejardin:'table'
  };

  // Dessine une photo réelle (billboard) à la place d'un bloc procédural, avec
  // le même ancrage au sol que les archétypes (bas de l'image = sol de la case).
  function drawImageInstance(origin, aVec, bVec, heightPx, imgKey){
    var asset = IMAGE_ASSETS[imgKey];
    if (!asset) return '';
    var dispH = heightPx;
    var dispW = dispH * (asset.w / asset.h);
    var cx = origin.x + (aVec.x + bVec.x) / 2;
    var floorY = origin.y + (aVec.y + bVec.y) / 2;
    var x = cx - dispW / 2, y = floorY - dispH;
    return '<image href="' + asset.href + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + dispW.toFixed(1) + '" height="' + dispH.toFixed(1) + '" preserveAspectRatio="xMidYMid meet"></image>';
  }

  // Archétype + hauteur (unité visuelle) + couleur de base par objet du
  // catalogue, pour donner à chaque type un dessin isométrique reconnaissable.
  // Dimensions réelles approximatives (mètres), telles que l'objet est posé
  // dans le box : fl = profondeur/longueur au sol (axe A), fw = largeur au
  // sol (axe B), fh = hauteur. Pour les objets stockés "sur la tranche"
  // (matelas), fl/fw sont l'épaisseur et la largeur, et fh est la longueur
  // réelle du matelas debout — onEdge:true fait que chaque exemplaire prend
  // sa propre place au sol au lieu d'être empilé.
  var ITEM_META = {
    canape2:{arc:'sofa',fl:1.6,fw:0.75,fh:0.85,c:'#c96b4a'}, canape3:{arc:'sofa',fl:2.0,fw:0.85,fh:0.85,c:'#c96b4a'}, fauteuil:{arc:'sofa',fl:0.8,fw:0.8,fh:0.85,c:'#cf7c57'},
    tablebasse:{arc:'table',fl:1.1,fw:0.55,fh:0.42,c:'#8a5a34'}, meubletv:{arc:'block',fl:1.2,fw:0.4,fh:0.5,c:'#5c4531'}, biblio:{arc:'block',fl:0.9,fw:0.32,fh:1.8,c:'#5c4531'},
    tablemanger:{arc:'table',fl:1.5,fw:0.9,fh:0.75,c:'#8a5a34'}, chaise:{arc:'chair',fl:0.45,fw:0.45,fh:0.9,nestFh:0.12,c:'#8a5a34'}, buffet:{arc:'block',fl:1.4,fw:0.45,fh:0.9,c:'#5c4531'}, tapis:{arc:'block',fl:1.5,fw:0.28,fh:0.28,c:'#7a8ba0'},
    lit1:{arc:'block',fl:0.22,fw:0.9,fh:1.9,c:'#eef0f2',onEdge:true}, lit2:{arc:'block',fl:0.25,fw:1.4,fh:2.0,c:'#eef0f2',onEdge:true},
    armoire2:{arc:'block',fl:1.0,fw:0.6,fh:1.9,c:'#6b4b32'}, armoire4:{arc:'block',fl:1.6,fw:0.6,fh:2.0,c:'#6b4b32'},
    commode:{arc:'block',fl:0.9,fw:0.45,fh:0.8,c:'#6b4b32'}, chevet:{arc:'block',fl:0.4,fw:0.35,fh:0.55,c:'#8a5a34'}, bureau:{arc:'block',fl:1.2,fw:0.6,fh:0.75,c:'#8a5a34'}, miroir:{arc:'block',fl:0.6,fw:0.06,fh:1.6,c:'#b9c3cc'},
    frigo:{arc:'fridge',fl:0.6,fw:0.65,fh:1.8,c:'#e7ebee'}, congel:{arc:'fridge',fl:0.6,fw:0.65,fh:1.5,c:'#e7ebee'}, lavelinge:{arc:'cube_appliance',fl:0.6,fw:0.6,fh:0.85,c:'#e7ebee'}, lavevaisselle:{arc:'cube_appliance',fl:0.6,fw:0.6,fh:0.82,c:'#e7ebee'},
    four:{arc:'block',fl:0.6,fw:0.6,fh:0.85,c:'#b0b6bc'}, microonde:{arc:'block',fl:0.5,fw:0.4,fh:0.3,c:'#3a3f45'}, tablecuisine:{arc:'table',fl:1.1,fw:0.7,fh:0.75,c:'#8a5a34'},
    cartonstd:{arc:'block',fl:0.55,fw:0.35,fh:0.35,c:'#c8a165'}, cartonlivre:{arc:'block',fl:0.4,fw:0.3,fh:0.3,c:'#c8a165'}, housse:{arc:'block',fl:0.6,fw:0.15,fh:1.3,c:'#9aa7b5'}, valise:{arc:'block',fl:0.7,fw:0.45,fh:0.28,c:'#22334a'}, bac:{arc:'block',fl:0.6,fw:0.4,fh:0.35,c:'#3f5f7a'},
    velo:{arc:'bike',fl:1.7,fw:0.6,fh:1.0,c:'#c8102e'}, tondeuse:{arc:'block',fl:1.3,fw:0.5,fh:1.0,c:'#3f7d3a'}, bbq:{arc:'block',fl:0.6,fw:0.6,fh:1.0,c:'#2e2e2e'}, salondejardin:{arc:'table',fl:1.4,fw:1.4,fh:0.75,c:'#8a5a34'},
    moto:{arc:'block',fl:1.9,fw:0.7,fh:1.1,c:'#e8a33d'}, pneus:{arc:'tires',fl:0.65,fw:0.22,fh:0.65,c:'#2b2b2b'}, etabli:{arc:'block',fl:1.3,fw:0.6,fh:0.9,c:'#6b4b32'},
    archive:{arc:'block',fl:0.35,fw:0.27,fh:0.27,c:'#c8a165'}, bureaupro:{arc:'block',fl:1.3,fw:0.65,fh:0.75,c:'#8a5a34'}, chaisebureau:{arc:'block',fl:0.6,fw:0.6,fh:1.05,nestFh:0.16,c:'#3a3f45'},
    caisson:{arc:'block',fl:0.4,fw:0.5,fh:0.6,c:'#5c4531'}, armoirebureau:{arc:'block',fl:0.9,fw:0.45,fh:1.98,c:'#5c4531'}, ecran:{arc:'block',fl:0.55,fw:0.08,fh:0.4,c:'#22262b'},
    custom:{arc:'carton',fl:0.6,fw:0.5,fh:0.6,c:'#c8a165'}
  };

  var FOOTPRINT_REF_M = 1.0; // échelle de rendu d'un objet (taille réelle en m)
  // Distance réelle entre deux points de pose au sol : nettement plus petite
  // qu'un objet moyen, pour que les objets se touchent/se chevauchent — un
  // rangement tassé façon "box plein", pas des objets isolés sur une grille.
  var PLACEMENT_PITCH_M = 0.5;
  function footprintFactor(meters, minF, maxF){
    return Math.max(minF, Math.min(maxF, meters / FOOTPRINT_REF_M));
  }

  // Choisit, parmi les 6 façons de poser un pavé de dimensions a×b×c, celle
  // qui laisse la plus petite emprise au sol tout en tenant sous le plafond
  // (2,5 m) — ex. un canapé debout sur la tranche, la longueur en hauteur,
  // plutôt qu'à plat, si ça libère de la place. Ne s'applique qu'aux objets
  // dessinés en bloc plat (pas de vraie photo, qui elle reste dans sa pose).
  function bestOrientation(a, b, c){
    var dims = [a, b, c];
    var perms = [[0,1,2],[1,0,2],[0,2,1],[2,0,1],[1,2,0],[2,1,0]];
    var best = null;
    perms.forEach(function(p){
      var fl = dims[p[0]], fw = dims[p[1]], fh = dims[p[2]];
      if (fh > ROOM_HEIGHT_M) return;
      var area = fl * fw;
      if (!best || area < best.area - 0.001){ best = { fl:fl, fw:fw, fh:fh, area:area }; }
    });
    return best || { fl:a, fw:b, fh:c };
  }

  // Icône autonome (utilisée dans la liste d'objets) : même dessin que la
  // scène, à une échelle réduite, avec les proportions réelles de l'objet.
  function buildItemIconSVG(id, sizePx){
    var meta = ITEM_META[id] || ITEM_META.custom;
    var imgKey = ITEM_IMAGE_KEY[id];
    var origin = {x:32, y:42};
    var inner;
    if (imgKey){
      inner = drawImageInstance(origin, {x:13,y:7.5}, {x:-13,y:7.5}, meta.fh*15, imgKey);
    } else {
      var fn = ARCHETYPES[meta.arc] || ARCHETYPES.block;
      var fa = footprintFactor(meta.fl, 0.42, 1.05), fb = footprintFactor(meta.fw, 0.42, 1.05);
      var A = {x:13*fa, y:7.5*fa}, B = {x:-13*fb, y:7.5*fb};
      inner = fn(origin, A, B, meta.fh*15, meta.c);
    }
    return '<svg viewBox="2 4 60 50" width="'+sizePx+'" height="'+sizePx+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+inner+'</svg>';
  }

  function isoCellOrigin(roomOrigin, i, j){
    var p = PLACEMENT_PITCH_M;
    return { x: roomOrigin.x + i*ISO.ax*p + j*ISO.bx*p, y: roomOrigin.y + i*ISO.ay*p + j*ISO.by*p };
  }

  // Remplissage en rangées complètes (du fond vers l'avant, gauche à droite
  // dans chaque rangée) plutôt qu'en diagonale, pour un rangement qui a l'air
  // volontaire — comme de vraies rangées d'objets contre le mur du fond.
  function buildSlotOrder(gridW, gridD){
    var slots = [];
    for (var j = 0; j < gridD; j++){
      for (var i = 0; i < gridW; i++){
        slots.push({i:i, j:j});
      }
    }
    return slots;
  }

  // Construit les murs/sol isométriques pour une pièce de l x w mètres au
  // sol (hauteur toujours ROOM_HEIGHT_M), quelle que soit l'origine du calcul
  // (taille de box réelle, ou pièce agrandie pour tout faire tenir).
  function buildRoomFromDims(l, w){
    var wallHpx = ROOM_HEIGHT_M * ISO.hUnit;
    var origin = { x: ISO_BACKTOP.x, y: ISO_BACKTOP.y + wallHpx };
    var right = { x: origin.x + l*ISO.ax, y: origin.y + l*ISO.ay };
    var left  = { x: origin.x + w*ISO.bx, y: origin.y + w*ISO.by };
    var front = { x: right.x + w*ISO.bx, y: right.y + w*ISO.by };
    var backTop = { x: origin.x, y: origin.y - wallHpx };
    var rightTop = { x: right.x, y: right.y - wallHpx };
    var leftTop = { x: left.x, y: left.y - wallHpx };

    var shell =
      svgPoly([origin,right,rightTop,backTop], '#e4ddd0') +
      svgPoly([origin,left,leftTop,backTop], '#cfc9bd') +
      svgPoly([origin,right,front,left], '#b7b2a8') +
      svgLine({x:origin.x,y:origin.y-2}, {x:right.x,y:right.y-2}, 'rgba(215,12,42,0.55)', 3) +
      svgLine({x:origin.x,y:origin.y-2}, {x:left.x,y:left.y-2}, 'rgba(15,39,63,0.35)', 3);

    var pts = [origin, right, left, front, backTop, rightTop, leftTop];
    var xs = pts.map(function(p){return p.x;}), ys = pts.map(function(p){return p.y;});
    var margin = 10;
    var minX = Math.min.apply(null, xs) - margin, maxX = Math.max.apply(null, xs) + margin;
    var minY = Math.min.apply(null, ys) - margin, maxY = Math.max.apply(null, ys) + margin;

    return {
      shellSVG: shell,
      origin: origin,
      viewBox: minX.toFixed(1)+' '+minY.toFixed(1)+' '+(maxX-minX).toFixed(1)+' '+(maxY-minY).toFixed(1)
    };
  }

  // Choisit la taille de box à représenter (la plus grande de la combinaison
  // recommandée : on part du 8 m³, et on bascule sur le 10, puis le 15 dès
  // que le volume dépasse), et calcule la pièce isométrique à l'échelle
  // réelle de cette taille (longueur/largeur/hauteur en mètres).
  function computeRoomGeometry(combo){
    var boxDims = BOXES[0];
    if (combo){
      if (combo.n15 > 0) boxDims = BOXES[2];
      else if (combo.n10 > 0) boxDims = BOXES[1];
      else boxDims = BOXES[0];
    }
    var geo = buildRoomFromDims(boxDims.l, boxDims.w);
    return {
      shellSVG: geo.shellSVG,
      origin: geo.origin,
      viewBox: geo.viewBox,
      gridW: Math.max(1, Math.round(boxDims.l / PLACEMENT_PITCH_M)),
      gridD: Math.max(1, Math.round(boxDims.w / PLACEMENT_PITCH_M)),
      boxDims: boxDims
    };
  }

  function renderIsoScene(qtyState, customList, combo){
    var itemsG = document.getElementById('isoItems');
    var shellG = document.getElementById('isoRoomShell');
    var roomSvg = document.getElementById('isoRoom');
    var caption = document.getElementById('isoCaption');

    // La pièce dessinée suit la vraie taille de box recommandée : on part
    // du 8 m³, et on bascule sur le 10 puis le 15 m³ dès que ça dépasse.
    var room = computeRoomGeometry(combo);

    var active = [];
    categories.forEach(function(cat){
      CATALOG[cat].items.forEach(function(it){
        var q = qtyState[it.id] || 0;
        if (q > 0){
          var style = ITEM_META[it.id] || ITEM_META.custom;
          var imgKey = ITEM_IMAGE_KEY[it.id];
          if (imgKey){
            // Vraie photo : pose figée, on ne peut pas la faire pivoter.
            style = Object.assign({}, style, { img: imgKey });
          } else {
            // Bloc plat : on choisit la pose qui prend le moins de place au sol.
            var orient = bestOrientation(style.fl, style.fw, style.fh);
            style = Object.assign({}, style, orient);
          }
          active.push({ label: it.label, qty: q, vol: q*it.vol, style: style });
        }
      });
    });
    // Chaque objet "hors catalogue" est dessiné à ses vraies dimensions (bloc
    // isométrique plat), dans la pose qui prend le moins de place au sol.
    customList.forEach(function(ci){
      var orient = bestOrientation(
        ci.l || ITEM_META.custom.fl,
        ci.w || ITEM_META.custom.fw,
        ci.h || ITEM_META.custom.fh
      );
      var style = Object.assign({ arc:'block', c:'#c8a165' }, orient);
      active.push({ label: ci.label, qty: ci.qty || 1, vol: ci.vol, style: style });
    });

    if (active.length === 0){
      shellG.innerHTML = room.shellSVG;
      roomSvg.setAttribute('viewBox', room.viewBox);
      itemsG.innerHTML = '';
      caption.textContent = 'Ajoutez des objets pour visualiser le remplissage de votre box.';
      return;
    }

    active.sort(function(a,b){ return b.vol - a.vol; });

    // ---- Passe 1 : chaque objet reçoit une (ou plusieurs) case(s) — jamais
    // caché derrière un "+N" ou un compteur de non-représentés. Les objets
    // identiques s'empilent jusqu'au plafond (2,5 m) puis prennent une
    // case supplémentaire s'il en reste encore.
    var demand = []; // {style, stackCount, topStack:[]}
    var hostPool = []; // sous-ensemble de "demand", meubles avec de la hauteur libre
    var guestPending = []; // petits objets qui essaieront de se poser sur un meuble

    active.forEach(function(item){
      if (item.style.onEdge){
        for (var u = 0; u < item.qty; u++){ demand.push({ style:item.style, stackCount:1, topStack:[] }); }
        return;
      }
      var isGuest = !!GUEST_ARCHETYPES[item.style.arc];
      if (isGuest){
        guestPending.push({ style:item.style, qty:item.qty });
        return;
      }
      var isHost = !!HOST_ARCHETYPES[item.style.arc];
      var stackCap = stackCapFor(item.style);
      var remaining = item.qty;
      while (remaining > 0){
        var sc = Math.min(stackCap, remaining);
        var entry = { style:item.style, stackCount:sc, topStack:[] };
        demand.push(entry);
        remaining -= sc;
        if (isHost){
          var usedH = item.style.fh + (sc-1)*stackStep(item.style);
          var free = ROOM_HEIGHT_M - usedH;
          if (free >= MIN_HEADROOM_M) hostPool.push({ entry:entry, freeHeight:free });
        }
      }
    });

    // ---- Passe 2 : les petits objets (cartons, sèche-linge...) essaient de
    // se poser sur un meuble qui n'atteint pas le plafond ; ce qui ne rentre
    // nulle part reçoit simplement ses propres cases, comme les autres.
    hostPool.sort(function(a,b){ return b.freeHeight - a.freeHeight; });
    guestPending.forEach(function(g){
      var remainingQty = g.qty;
      for (var i = 0; i < hostPool.length && remainingQty > 0; i++){
        while (hostPool[i].freeHeight >= g.style.fh && remainingQty > 0){
          hostPool[i].entry.topStack.push(g.style);
          hostPool[i].freeHeight -= g.style.fh;
          remainingQty--;
        }
      }
      if (remainingQty > 0){
        var stackCap = stackCapFor(g.style);
        while (remainingQty > 0){
          var sc = Math.min(stackCap, remainingQty);
          demand.push({ style:g.style, stackCount:sc, topStack:[] });
          remainingQty -= sc;
        }
      }
    });

    // ---- La pièce s'agrandit (au-delà de la taille réelle du box choisi si
    // besoin) pour garantir une case à chaque objet. Le volume et le tarif
    // affichés plus haut restent, eux, calculés sur la vraie taille de box.
    var neededSlots = demand.length;
    var natCells = room.gridW * room.gridD;
    var expanded = false;
    if (neededSlots > natCells){
      expanded = true;
      var side = Math.max(room.gridW, room.gridD, Math.ceil(Math.sqrt(neededSlots)));
      var gridW = side, gridD = Math.ceil(neededSlots / side);
      var geo = buildRoomFromDims(gridW*PLACEMENT_PITCH_M, gridD*PLACEMENT_PITCH_M);
      room = { shellSVG:geo.shellSVG, origin:geo.origin, viewBox:geo.viewBox, gridW:gridW, gridD:gridD, boxDims:room.boxDims };
    }
    shellG.innerHTML = room.shellSVG;
    roomSvg.setAttribute('viewBox', room.viewBox);

    var slots = buildSlotOrder(room.gridW, room.gridD);
    demand.forEach(function(d, i){ d.slot = slots[i]; });

    // Ordre de peinture: du fond vers l'avant, pour un chevauchement correct.
    demand.sort(function(a,b){
      var da = a.slot.i + a.slot.j, db = b.slot.i + b.slot.j;
      if (da !== db) return da - db;
      return a.slot.i - b.slot.i;
    });

    var svg = '';
    // Chaque objet entre progressivement dans la scène (du fond vers l'avant,
    // dans l'ordre où ils sont peints), plutôt que d'apparaître d'un coup.
    var ENTER_STAGGER_MS = 45, ENTER_STAGGER_MAX_MS = 900;
    demand.forEach(function(p, idx){
      var cellOrigin = isoCellOrigin(room.origin, p.slot.i, p.slot.j);
      var fa = footprintFactor(p.style.fl, 0.24, 1.4);
      var fb = footprintFactor(p.style.fw, 0.24, 1.4);
      var offA = (1 - fa) / 2, offB = (1 - fb) / 2;
      var origin = { x: cellOrigin.x + offA*ISO.ax + offB*ISO.bx, y: cellOrigin.y + offA*ISO.ay + offB*ISO.by };
      var fn = ARCHETYPES[p.style.arc] || ARCHETYPES.block;
      var aVec = {x:ISO.ax*fa, y:ISO.ay*fa};
      var bVec = {x:ISO.bx*fb, y:ISO.by*fb};

      var itemSvg = '';

      // Ombre de contact au sol, pour ancrer visuellement l'objet.
      var shadowRx = 8 + (fa+fb)*7;
      itemSvg += '<ellipse cx="'+(origin.x+(aVec.x+bVec.x)/2).toFixed(1)+'" cy="'+(origin.y+(aVec.y+bVec.y)/2+2).toFixed(1)+'" rx="'+shadowRx.toFixed(1)+'" ry="'+(shadowRx*0.42).toFixed(1)+'" fill="url(#isoShadow)"></ellipse>';

      var lift = 0;
      for (var s = 0; s < p.stackCount; s++){
        var liftedOrigin = { x: origin.x, y: origin.y - lift*ISO.hUnit };
        if (p.style.img){
          itemSvg += drawImageInstance(liftedOrigin, aVec, bVec, p.style.fh*ISO.hUnit, p.style.img);
        } else {
          itemSvg += fn(liftedOrigin, aVec, bVec, p.style.fh*ISO.hUnit, p.style.c);
        }
        lift += stackStep(p.style);
      }

      // Petits objets posés au-dessus, dans la hauteur libre sous le plafond.
      p.topStack.forEach(function(gStyle){
        var gfa = footprintFactor(gStyle.fl, 0.24, 1.0);
        var gfb = footprintFactor(gStyle.fw, 0.24, 1.0);
        var gOffA = (1-gfa)/2, gOffB = (1-gfb)/2;
        var gOrigin = { x: cellOrigin.x + gOffA*ISO.ax + gOffB*ISO.bx, y: cellOrigin.y + gOffA*ISO.ay + gOffB*ISO.by - lift*ISO.hUnit };
        var gaVec = {x:ISO.ax*gfa, y:ISO.ay*gfa};
        var gbVec = {x:ISO.bx*gfb, y:ISO.by*gfb};
        if (gStyle.img){
          itemSvg += drawImageInstance(gOrigin, gaVec, gbVec, gStyle.fh*ISO.hUnit, gStyle.img);
        } else {
          var gfn = ARCHETYPES[gStyle.arc] || ARCHETYPES.block;
          itemSvg += gfn(gOrigin, gaVec, gbVec, gStyle.fh*ISO.hUnit, gStyle.c);
        }
        lift += stackStep(gStyle);
      });

      var delay = Math.min(idx * ENTER_STAGGER_MS, ENTER_STAGGER_MAX_MS);
      svg += '<g class="iso-enter" style="animation-delay:'+delay+'ms">'+itemSvg+'</g>';
    });

    itemsG.innerHTML = svg;

    var notes = [];
    if (expanded){
      notes.push('Pour tout afficher, l’illustration dépasse ici la taille réelle du box recommandé — le volume et le tarif annoncés ci-dessus restent, eux, calculés sur la vraie taille.');
    }
    if (combo && combo.count > 1){
      notes.push('Rappel : ' + combo.count + ' box au total sont recommandés (voir « Box conseillé » ci-dessus) — cette illustration réunit tous vos objets dans un seul espace pour que vous puissiez tout voir.');
    }
    caption.textContent = notes.length ? notes.join(' ') : 'Aperçu illustratif, à l’échelle indicative.';
  }

  // ---------- State ----------
  var qty = {};          // itemId -> quantity
  var customItems = [];  // {label, vol}
  var categories = Object.keys(CATALOG);
  var activeCat = categories[0];
  var customIdSeq = 0;

  var tabsEl = document.getElementById('tabs');
  var panelEl = document.getElementById('panel');

  function catCount(cat){
    var total = 0;
    CATALOG[cat].items.forEach(function(it){ total += (qty[it.id]||0); });
    return total;
  }

  function renderTabs(){
    tabsEl.innerHTML = '';
    categories.forEach(function(cat){
      var count = catCount(cat);
      var btn = document.createElement('div');
      btn.className = 'tab' + (cat === activeCat ? ' active' : '');
      btn.innerHTML = '<span>'+CATALOG[cat].icon+'</span><span>'+cat+'</span>' +
        '<span class="count'+(count===0?' zero':'')+'">'+count+'</span>';
      btn.addEventListener('click', function(){
        activeCat = cat;
        renderTabs();
        renderPanel();
      });
      tabsEl.appendChild(btn);
    });
  }

  function fmt(n){
    // format avec virgule fr, jusqu'à 2 décimales, sans zéros inutiles
    return (Math.round(n*100)/100).toString().replace('.', ',');
  }

  function renderPanel(){
    panelEl.innerHTML = '';

    var title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = activeCat;
    panelEl.appendChild(title);

    CATALOG[activeCat].items.forEach(function(it){
      var row = document.createElement('div');
      row.className = 'item-row';

      var iconWrap = document.createElement('div');
      iconWrap.className = 'item-icon-wrap';
      iconWrap.innerHTML = buildItemIconSVG(it.id, 34);

      var info = document.createElement('div');
      info.className = 'item-info';
      info.innerHTML = '<span class="item-label">'+it.label+'</span>' +
        '<span class="item-vol">≈ '+fmt(it.vol)+' m³ / unité</span>';

      var stepper = document.createElement('div');
      stepper.className = 'stepper';
      var minus = document.createElement('button');
      minus.className = 'step-btn';
      minus.type = 'button';
      minus.textContent = '−';
      minus.setAttribute('aria-label', 'Retirer un ' + it.label);
      var val = document.createElement('span');
      val.className = 'step-val';
      val.textContent = qty[it.id] || 0;
      var plus = document.createElement('button');
      plus.className = 'step-btn';
      plus.type = 'button';
      plus.textContent = '+';
      plus.setAttribute('aria-label', 'Ajouter un ' + it.label);

      minus.addEventListener('click', function(){
        var c = qty[it.id] || 0;
        if (c > 0){ qty[it.id] = c - 1; val.textContent = qty[it.id]; update(); }
      });
      plus.addEventListener('click', function(){
        qty[it.id] = (qty[it.id] || 0) + 1;
        val.textContent = qty[it.id];
        update();
      });

      stepper.appendChild(minus);
      stepper.appendChild(val);
      stepper.appendChild(plus);

      row.appendChild(iconWrap);
      row.appendChild(info);
      row.appendChild(stepper);
      panelEl.appendChild(row);
    });

    renderCustomBox();
  }

  function renderCustomBox(){
    var box = document.createElement('div');
    box.className = 'custom-box';
    box.innerHTML =
      '<h4>Un objet hors catalogue ?</h4>' +
      '<p>Indiquez ses dimensions (en cm) pour l\'ajouter précisément au calcul.</p>' +
      '<div class="custom-grid">' +
        '<div class="field"><label>Longueur</label><input type="number" min="0" step="1" id="cw-l" placeholder="cm"></div>' +
        '<div class="field"><label>Largeur</label><input type="number" min="0" step="1" id="cw-w" placeholder="cm"></div>' +
        '<div class="field"><label>Hauteur</label><input type="number" min="0" step="1" id="cw-h" placeholder="cm"></div>' +
        '<div class="field"><label>Qté</label><input type="number" min="1" step="1" id="cw-q" value="1"></div>' +
        '<button type="button" class="custom-add" id="cw-add">Ajouter</button>' +
      '</div>' +
      '<div class="custom-list" id="customList"></div>';
    panelEl.appendChild(box);

    document.getElementById('cw-add').addEventListener('click', function(){
      var l = parseFloat(document.getElementById('cw-l').value);
      var w = parseFloat(document.getElementById('cw-w').value);
      var h = parseFloat(document.getElementById('cw-h').value);
      var q = parseInt(document.getElementById('cw-q').value, 10) || 1;
      if (!l || !w || !h){ return; }
      var volUnit = (l * w * h) / 1000000; // cm3 -> m3
      customItems.push({
        id: 'custom-' + (customIdSeq++),
        label: 'Objet ' + l + '×' + w + '×' + h + ' cm ×' + q,
        l: l / 100, w: w / 100, h: h / 100, // m, pour le dessin isométrique
        qty: q,
        vol: volUnit * q
      });
      document.getElementById('cw-l').value = '';
      document.getElementById('cw-w').value = '';
      document.getElementById('cw-h').value = '';
      document.getElementById('cw-q').value = '1';
      renderCustomList();
      update();
    });

    renderCustomList();
  }

  function renderCustomList(){
    var list = document.getElementById('customList');
    if (!list) return;
    list.innerHTML = '';
    customItems.forEach(function(ci){
      var row = document.createElement('div');
      row.className = 'custom-list-item';
      row.innerHTML = '<span>'+ci.label+' — <b>'+fmt(ci.vol)+' m³</b></span>';
      var del = document.createElement('button');
      del.type = 'button';
      del.innerHTML = '✕';
      del.setAttribute('aria-label', 'Retirer cet objet');
      del.addEventListener('click', function(){
        customItems = customItems.filter(function(x){ return x.id !== ci.id; });
        renderCustomList();
        update();
      });
      row.appendChild(del);
      list.appendChild(row);
    });
  }

  function computeTotals(){
    var total = 0;
    var byCat = {};
    categories.forEach(function(cat){
      var catTotal = 0;
      CATALOG[cat].items.forEach(function(it){
        var c = qty[it.id] || 0;
        catTotal += c * it.vol;
      });
      byCat[cat] = catTotal;
      total += catTotal;
    });
    var customTotal = customItems.reduce(function(s, ci){ return s + ci.vol; }, 0);
    total += customTotal;
    return { total: total, byCat: byCat, customTotal: customTotal };
  }

  function renderTiersGrid(combo){
    var grid = document.getElementById('tiersGrid');
    grid.innerHTML = '';
    BOXES.forEach(function(b){
      var count = combo ? combo['n'+b.vol] : 0;
      var el = document.createElement('div');
      el.className = 'tier-card' + (count > 0 ? ' current' : '');
      el.innerHTML = '<div class="t-name">Box '+b.vol+' m³'+(count>1 ? ' <span style="color:var(--red)">×'+count+'</span>' : '')+'</div>' +
        '<div class="t-dims">'+fmt(b.l)+' × '+fmt(b.w)+' m</div>' +
        '<div class="t-m2">≈ '+fmt(b.m2)+' m² au sol</div>' +
        '<div class="t-price">'+fmt(b.price)+' €/mois</div>' +
        '<div class="t-vol">Hauteur '+fmt(BOX_HEIGHT)+' m</div>';
      grid.appendChild(el);
    });
  }

  function update(){
    renderTabs();

    var totals = computeTotals();
    var raw = totals.total;
    var recommended = raw * MARGIN;
    var combo = bestCombo(recommended);

    document.getElementById('volRaw').textContent = fmt(raw);
    var itemCount = Object.keys(qty).reduce(function(s,k){ return s + (qty[k]||0); }, 0) + customItems.length;

    var subtext = document.getElementById('volSubtext');
    if (itemCount === 0){
      subtext.textContent = 'Ajoutez des objets pour commencer';
    } else {
      subtext.textContent = itemCount + ' objet' + (itemCount>1?'s':'') + ' — volume conseillé avec marge : ' + fmt(recommended) + ' m³';
    }

    var pct = Math.min(100, (recommended / GAUGE_MAX) * 100);
    document.getElementById('gaugeFill').style.width = pct + '%';

    var recoName = document.getElementById('recoName');
    var recoM2 = document.getElementById('recoM2');
    var recoPrice = document.getElementById('recoPrice');
    if (itemCount === 0 || !combo){
      recoName.textContent = '—';
      recoM2.textContent = 'Ajoutez des objets pour voir une recommandation';
      recoPrice.innerHTML = '';
    } else {
      recoName.textContent = comboLabel(combo);
      recoM2.textContent = 'Surface indicative ≈ ' + fmt(comboM2(combo)) + ' m² au sol · ' + fmt(recommended) + ' m³ recommandés';
      recoPrice.innerHTML = 'Soit <b>' + fmt(comboPrice(combo)) + ' €</b> / mois <span style="font-weight:600;color:#c7d3e0;">(' + PRICE_PER_M3 + ' €/m³/mois)</span>';
    }

    var breakdown = document.getElementById('breakdown');
    breakdown.innerHTML = '';
    categories.forEach(function(cat){
      var v = totals.byCat[cat];
      if (v > 0){
        var row = document.createElement('div');
        row.className = 'breakdown-row';
        row.innerHTML = '<span>'+CATALOG[cat].icon+' '+cat+'</span><b>'+fmt(v)+' m³</b>';
        breakdown.appendChild(row);
      }
    });
    if (totals.customTotal > 0){
      var row2 = document.createElement('div');
      row2.className = 'breakdown-row';
      row2.innerHTML = '<span>📐 Objets sur mesure</span><b>'+fmt(totals.customTotal)+' m³</b>';
      breakdown.appendChild(row2);
    }

    renderTiersGrid(itemCount === 0 ? null : combo);
    renderIsoScene(qty, customItems, itemCount === 0 ? null : combo);
  }

  document.getElementById('resetBtn').addEventListener('click', function(){
    qty = {};
    customItems = [];
    renderPanel();
    update();
  });

  // ---------- Init ----------
  renderTabs();
  renderPanel();
  update();
}
