import{d as Ee,h as Ne,i as ot}from"./chunk-WILJCWZB.js";import{b as Re,c as ze,d as je,e as ie,f as Ae,g as $e,h as Ke,i as He,j as Ge,k as Qe,l as qe,m as Ue,n as it,o as at}from"./chunk-M5ITWJKI.js";import{D as P,E as M,M as te,O as ne,Q as C,R as oe,S as Ve,U as et,V as tt,X as nt,f as De,g as Le}from"./chunk-UTZXLBWD.js";import{a as V,b as N}from"./chunk-QYB4SRQA.js";import{d as We,h as Xe,i as Ye,j as Ze,l as Je}from"./chunk-BL4Y4UAJ.js";import{$ as B,$a as be,Bb as xe,Cb as g,Db as D,Eb as ke,Fb as _e,Gb as Ce,Hb as ye,Ia as y,Ib as ve,J as z,Ja as Q,Jb as Te,K as j,Ka as ge,Kb as Me,L as A,La as he,Lb as we,Ma as q,Mb as X,N as $,Na as m,Nb as Be,Oa as f,Ob as L,P as b,Qb as Ie,Rb as Oe,Sb as Se,U as K,V as H,Vb as Y,W as E,Xa as x,Ya as I,Za as O,_b as _,ab as S,bb as F,cb as c,db as s,ea as G,eb as p,fb as k,gc as h,hc as Z,ib as me,jb as de,ka as u,kb as se,lb as pe,mb as U,ob as w,pb as d,rc as Fe,sb as W,tb as fe,tc as Pe,ub as v,va as l,vb as T,vc as J,wc as ee}from"./chunk-YNFTFE4X.js";var ft=["data-p-icon","minus"],rt=(()=>{class t extends Ve{static \u0275fac=(()=>{let e;return function(n){return(e||(e=u(t)))(n||t)}})();static \u0275cmp=y({type:t,selectors:[["","data-p-icon","minus"]],features:[m],attrs:ft,decls:1,vars:0,consts:[["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(o,n){o&1&&(E(),me(0,"path",0))},encapsulation:2})}return t})();var ct=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`;var ae=(()=>{class t extends Ge{required=_(void 0,{transform:h});invalid=_(void 0,{transform:h});disabled=_(void 0,{transform:h});name=_();_disabled=G(!1);$disabled=Y(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(e){this._disabled.set(e)}writeControlValue(e,o){}writeValue(e){this.writeControlValue(e,this.writeModelValue.bind(this))}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.writeDisabledState(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(n){return(e||(e=u(t)))(n||t)}})();static \u0275dir=ge({type:t,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[m]})}return t})();var _t=["icon"],Ct=["content"],st=t=>({$implicit:t});function yt(t,i){t&1&&pe(0)}function vt(t,i){if(t&1&&k(0,"span",0),t&2){let e=d(3);g(e.cn(e.cx("icon"),e.checked?e.onIcon:e.offIcon,e.iconPos==="left"?e.cx("iconLeft"):e.cx("iconRight"))),c("pBind",e.ptm("icon"))}}function Tt(t,i){if(t&1&&I(0,vt,1,3,"span",2),t&2){let e=d(2);O(e.onIcon||e.offIcon?0:-1)}}function Mt(t,i){t&1&&pe(0)}function wt(t,i){if(t&1&&f(0,Mt,1,0,"ng-container",1),t&2){let e=d(2);c("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",L(2,st,e.checked))}}function Bt(t,i){if(t&1&&(I(0,Tt,1,1)(1,wt,1,4,"ng-container"),s(2,"span",0),D(3),p()),t&2){let e=d();O(e.iconTemplate?1:0),l(2),g(e.cx("label")),c("pBind",e.ptm("label")),l(),ke(e.checked?e.hasOnLabel?e.onLabel:"\xA0":e.hasOffLabel?e.offLabel:"\xA0")}}var It=`
    ${ct}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: dt('togglebutton.invalid.border.color');
    }
`,Ot={root:({instance:t})=>["p-togglebutton p-component",{"p-togglebutton-checked":t.checked,"p-invalid":t.invalid(),"p-disabled":t.$disabled(),"p-togglebutton-sm p-inputfield-sm":t.size==="small","p-togglebutton-lg p-inputfield-lg":t.size==="large","p-togglebutton-fluid":t.fluid()}],content:"p-togglebutton-content",icon:"p-togglebutton-icon",iconLeft:"p-togglebutton-icon-left",iconRight:"p-togglebutton-icon-right",label:"p-togglebutton-label"},lt=(()=>{class t extends te{name="togglebutton";style=It;classes=Ot;static \u0275fac=(()=>{let e;return function(n){return(e||(e=u(t)))(n||t)}})();static \u0275prov=j({token:t,factory:t.\u0275fac})}return t})();var dt=new $("TOGGLEBUTTON_INSTANCE"),St={provide:ie,useExisting:z(()=>re),multi:!0},re=(()=>{class t extends ae{componentName="ToggleButton";$pcToggleButton=b(dt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=b(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onKeyDown(e){switch(e.code){case"Enter":this.toggle(e),e.preventDefault();break;case"Space":this.toggle(e),e.preventDefault();break}}toggle(e){!this.$disabled()&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.writeModelValue(this.checked),this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:e,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;styleClass;inputId;tabindex=0;iconPos="left";autofocus;size;allowEmpty;fluid=_(void 0,{transform:h});onChange=new B;iconTemplate;contentTemplate;templates;checked=!1;onInit(){(this.checked===null||this.checked===void 0)&&(this.checked=!1)}_componentStyle=b(lt);onBlur(){this.onModelTouched()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.offLabel&&this.offLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this._iconTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}writeControlValue(e,o){this.checked=e,o(e),this.cd.markForCheck()}get dataP(){return this.cn({checked:this.active,invalid:this.invalid(),[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=u(t)))(n||t)}})();static \u0275cmp=y({type:t,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(o,n,r){if(o&1&&W(r,_t,4)(r,Ct,4)(r,P,4),o&2){let a;v(a=T())&&(n.iconTemplate=a.first),v(a=T())&&(n.contentTemplate=a.first),v(a=T())&&(n.templates=a)}},hostVars:11,hostBindings:function(o,n){o&1&&w("keydown",function(a){return n.onKeyDown(a)})("click",function(a){return n.toggle(a)}),o&2&&(x("aria-labelledby",n.ariaLabelledBy)("aria-label",n.ariaLabel)("aria-pressed",n.checked?"true":"false")("role","button")("tabindex",n.tabindex!==void 0?n.tabindex:n.$disabled()?-1:0)("data-pc-name","togglebutton")("data-p-checked",n.active)("data-p-disabled",n.$disabled())("data-p",n.dataP),g(n.cn(n.cx("root"),n.styleClass)))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",Z],iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",h],size:"size",allowEmpty:"allowEmpty",fluid:[1,"fluid"]},outputs:{onChange:"onChange"},features:[X([St,lt,{provide:dt,useExisting:t},{provide:ne,useExisting:t}]),q([Re,C]),m],decls:3,vars:9,consts:[[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","pBind"]],template:function(o,n){o&1&&(s(0,"span",0),f(1,yt,1,0,"ng-container",1),I(2,Bt,4,5),p()),o&2&&(g(n.cx("content")),c("pBind",n.ptm("content")),x("data-p",n.dataP),l(),c("ngTemplateOutlet",n.contentTemplate||n._contentTemplate)("ngTemplateOutletContext",L(7,st,n.checked)),l(),O(n.contentTemplate?-1:2))},dependencies:[ee,J,M,oe,C],encapsulation:2,changeDetection:0})}return t})(),pt=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=Q({type:t});static \u0275inj=A({imports:[re,M,M]})}return t})();var ut=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`;var Pt=["icon"],Et=["input"],Dt=(t,i,e)=>({checked:t,class:i,dataP:e});function Lt(t,i){if(t&1&&k(0,"span",8),t&2){let e=d(3);g(e.cx("icon")),c("ngClass",e.checkboxIcon)("pBind",e.ptm("icon")),x("data-p",e.dataP)}}function Vt(t,i){if(t&1&&(E(),k(0,"svg",9)),t&2){let e=d(3);g(e.cx("icon")),c("pBind",e.ptm("icon")),x("data-p",e.dataP)}}function Nt(t,i){if(t&1&&(de(0),f(1,Lt,1,5,"span",6)(2,Vt,1,4,"svg",7),se()),t&2){let e=d(2);l(),c("ngIf",e.checkboxIcon),l(),c("ngIf",!e.checkboxIcon)}}function Rt(t,i){if(t&1&&(E(),k(0,"svg",10)),t&2){let e=d(2);g(e.cx("icon")),c("pBind",e.ptm("icon")),x("data-p",e.dataP)}}function zt(t,i){if(t&1&&(de(0),f(1,Nt,3,2,"ng-container",3)(2,Rt,1,4,"svg",5),se()),t&2){let e=d();l(),c("ngIf",e.checked),l(),c("ngIf",e._indeterminate())}}function jt(t,i){}function At(t,i){t&1&&f(0,jt,0,0,"ng-template")}var $t=`
    ${ut}

    /* For PrimeNG */
    p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
    p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
    p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }
`,Kt={root:({instance:t})=>["p-checkbox p-component",{"p-checkbox-checked p-highlight":t.checked,"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-checkbox-sm p-inputfield-sm":t.size()==="small","p-checkbox-lg p-inputfield-lg":t.size()==="large"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},gt=(()=>{class t extends te{name="checkbox";style=$t;classes=Kt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=u(t)))(n||t)}})();static \u0275prov=j({token:t,factory:t.\u0275fac})}return t})();var ht=new $("CHECKBOX_INSTANCE"),Ht={provide:ie,useExisting:z(()=>ce),multi:!0},ce=(()=>{class t extends ae{componentName="Checkbox";hostName="";value;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;inputStyle;styleClass;inputClass;indeterminate=!1;formControl;checkboxIcon;readonly;autofocus;trueValue=!0;falseValue=!1;variant=_();size=_();onChange=new B;onFocus=new B;onBlur=new B;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.modelValue()===this.trueValue:Le(this.value,this.modelValue())}_indeterminate=G(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;focused=!1;_componentStyle=b(gt);bindDirectiveInstance=b(C,{self:!0});$pcCheckbox=b(ht,{optional:!0,skipSelf:!0})??void 0;$variant=Y(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"icon":this._checkboxIconTemplate=e.template;break;case"checkboxicon":this._checkboxIconTemplate=e.template;break}})}onChanges(e){e.indeterminate&&this._indeterminate.set(e.indeterminate.currentValue)}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}updateModel(e){let o,n=this.injector.get(Ae,null,{optional:!0,self:!0}),r=n&&!this.formControl?n.value:this.modelValue();this.binary?(o=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.writeModelValue(o),this.onModelChange(o)):(this.checked||this._indeterminate()?o=r.filter(a=>!De(a,this.value)):o=r?[...r,this.value]:[this.value],this.onModelChange(o),this.writeModelValue(o),this.formControl&&this.formControl.setValue(o)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:o,originalEvent:e})}handleChange(e){this.readonly||this.updateModel(e)}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeControlValue(e,o){o(e),this.cd.markForCheck()}get dataP(){return this.cn({invalid:this.invalid(),checked:this.checked,disabled:this.$disabled(),filled:this.$variant()==="filled",[this.size()]:this.size()})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=u(t)))(n||t)}})();static \u0275cmp=y({type:t,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(o,n,r){if(o&1&&W(r,Pt,4)(r,P,4),o&2){let a;v(a=T())&&(n.checkboxIconTemplate=a.first),v(a=T())&&(n.templates=a)}},viewQuery:function(o,n){if(o&1&&fe(Et,5),o&2){let r;v(r=T())&&(n.inputViewChild=r.first)}},hostVars:6,hostBindings:function(o,n){o&2&&(x("data-p-highlight",n.checked)("data-p-checked",n.checked)("data-p-disabled",n.$disabled())("data-p",n.dataP),g(n.cn(n.cx("root"),n.styleClass)))},inputs:{hostName:"hostName",value:"value",binary:[2,"binary","binary",h],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",Z],inputId:"inputId",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",h],formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",h],autofocus:[2,"autofocus","autofocus",h],trueValue:"trueValue",falseValue:"falseValue",variant:[1,"variant"],size:[1,"size"]},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[X([Ht,gt,{provide:ht,useExisting:t},{provide:ne,useExisting:t}]),q([C]),m],decls:5,vars:26,consts:[["input",""],["type","checkbox",3,"focus","blur","change","checked","pBind"],[3,"pBind"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","minus",3,"class","pBind",4,"ngIf"],[3,"class","ngClass","pBind",4,"ngIf"],["data-p-icon","check",3,"class","pBind",4,"ngIf"],[3,"ngClass","pBind"],["data-p-icon","check",3,"pBind"],["data-p-icon","minus",3,"pBind"]],template:function(o,n){o&1&&(s(0,"input",1,0),w("focus",function(a){return n.onInputFocus(a)})("blur",function(a){return n.onInputBlur(a)})("change",function(a){return n.handleChange(a)}),p(),s(2,"div",2),f(3,zt,3,2,"ng-container",3)(4,At,1,0,null,4),p()),o&2&&(xe(n.inputStyle),g(n.cn(n.cx("input"),n.inputClass)),c("checked",n.checked)("pBind",n.ptm("input")),x("id",n.inputId)("value",n.value)("name",n.name())("tabindex",n.tabindex)("required",n.required()?"":void 0)("readonly",n.readonly?"":void 0)("disabled",n.$disabled()?"":void 0)("aria-labelledby",n.ariaLabelledBy)("aria-label",n.ariaLabel),l(2),g(n.cx("box")),c("pBind",n.ptm("box")),x("data-p",n.dataP),l(),c("ngIf",!n.checkboxIconTemplate&&!n._checkboxIconTemplate),l(),c("ngTemplateOutlet",n.checkboxIconTemplate||n._checkboxIconTemplate)("ngTemplateOutletContext",Ie(22,Dt,n.checked,n.cx("icon"),n.dataP)))},dependencies:[ee,Fe,Pe,J,M,Ne,rt,oe,C],encapsulation:2,changeDetection:0})}return t})(),bt=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=Q({type:t});static \u0275inj=A({imports:[ce,M,M]})}return t})();var le=class t{transform(i){return Je(i)}static \u0275fac=function(e){return new(e||t)};static \u0275pipe=he({name:"romanize",type:t,pure:!0})};var Qt=t=>({text:"kana",options:t}),qt=()=>({"width.px":40,"height.px":32,fill:"currentColor"}),Ut=(t,i)=>i.name,Wt=(t,i)=>i.icon,Xt=(t,i)=>i.i,Yt=(t,i)=>i.j;function Zt(t,i){if(t&1){let e=U();s(0,"p-togglebutton",8),w("onChange",function(){K(e);let n=d().$implicit,r=d(3);return H(r.toggleCharacter(n.char))}),p()}if(t&2){let e=d().$implicit,o=d(3);c("ariaLabel",e.romaji?e.char+" "+e.romaji:e.char)("onLabel",e.char)("offLabel",e.char)("ngModel",o.isSelected(e.char))("pTooltip",e.romaji??void 0)("tooltipOptions",o.romanizeTooltip)}}function Jt(t,i){t&1&&k(0,"div")}function en(t,i){if(t&1&&I(0,Zt,1,6,"p-togglebutton",7)(1,Jt,1,0,"div"),t&2){let e=i.$implicit;O(e.char?0:1)}}function tn(t,i){if(t&1){let e=U();Te(0),s(1,"p-checkbox",6),w("onChange",function(){let n=K(e).$implicit,r=we(0),a=d(2);return H(a.toggleRow(n.row,r))}),p(),S(2,en,2,1,null,null,Yt)}if(t&2){let e=i.$implicit,o=d(2),n=Me(o.isRowFullySelected(e.row));l(),c("binary",!0)("ngModel",n)("indeterminate",o.isRowPartiallySelected(e.row)&&!n),l(),F(e.row)}}function nn(t,i){if(t&1&&(s(0,"section")(1,"h3",4),Oe(2,"romanize"),D(3),p(),s(4,"fieldset",5),S(5,tn,4,4,null,null,Xt),p()()),t&2){let e=i.$implicit,o=d();l(),c("pTooltip",Se(2,3,e.name))("tooltipOptions",o.romanizeTooltip),l(2),_e(" ",e.name," "),l(2),F(e.rows)}}function on(t,i){if(t&1&&k(0,"svg-icon",11),t&2){let e=d(2).$implicit;c("src","assets/icons/"+e.icon+".svg")("svgStyle",Be(2,qt))}}function an(t,i){if(t&1&&f(0,on,1,3,"ng-template",10),t&2){let e=i.$implicit;c("pTemplate",e)}}function rn(t,i){if(t&1){let e=U();s(0,"p-togglebutton",9),ve("ngModelChange",function(n){let r=K(e).$implicit;return ye(r.signal,n)||(r.signal=n),H(n)}),S(1,an,1,1,null,10,be),p()}if(t&2){let e=i.$implicit,o=d();c("pTooltip",e.tooltip)("tooltipOptions",o.romanizeTooltip),Ce("ngModel",e.signal),l(),F(o.togglebuttonIconStates)}}var ue=class t extends et{themeService=b(it);hiragana=this.enumerateRowsChars(We,Ye,11);katakana=this.enumerateRowsChars(Xe,Ze,11);selectedKana=V(N.selectedKana,new Set);dakutenSelected=V(N.dakutenSelected,!1);handakutenSelected=V(N.handakutenSelected,!1);youonSelected=V(N.youonSelected,!1);romanizeTooltip={tooltipPosition:"top",tooltipStyleClass:"romanize-tooltip"};kanaGroups=[{name:"\u3072\u3089\u304C\u306A",rows:this.hiragana},{name:"\u30AB\u30BF\u30AB\u30CA",rows:this.katakana}];kanaExtraToggles=[{icon:"dakuten",tooltip:"dakuten",signal:this.dakutenSelected},{icon:"handakuten",tooltip:"handakuten",signal:this.handakutenSelected},{icon:"youon",tooltip:"y\u014Don",signal:this.youonSelected}];togglebuttonIconStates=["on","off"];toggleCharacter(i){this.selectedKana.update(e=>{e.has(i)?e.delete(i):e.add(i)})}toggleRow(i,e){this.selectedKana.update(o=>{for(let{char:n}of i)n!==null&&(e?o.delete(n):o.add(n))})}isSelected(i){return this.selectedKana().has(i)}isRowFullySelected(i){return i.every(({char:e})=>e===null||this.selectedKana().has(e))}isRowPartiallySelected(i){return i.some(({char:e})=>e!==null&&this.selectedKana().has(e))}enumerateRowsChars(i,e,o){return Object.values(i).slice(0,o).map((n,r)=>({i:r,row:n.map((a,mt)=>({j:mt,char:a,romaji:a?e[a]:null}))}))}static \u0275fac=(()=>{let i;return function(o){return(i||(i=u(t)))(o||t)}})();static \u0275cmp=y({type:t,selectors:[["x-root"]],features:[m],decls:12,vars:4,consts:[["header","\u304B\u306A\u30FB\u30AB\u30CA","divider","",3,"tooltip"],["id","kana-extra-toggles"],[3,"pTooltip","tooltipOptions","ngModel"],["id","start-button","routerLink","/kana","pTooltip","start",3,"tooltipOptions"],[3,"pTooltip","tooltipOptions"],[1,"char-table"],[3,"onChange","binary","ngModel","indeterminate"],[3,"ariaLabel","onLabel","offLabel","ngModel","pTooltip","tooltipOptions"],[3,"onChange","ariaLabel","onLabel","offLabel","ngModel","pTooltip","tooltipOptions"],[3,"ngModelChange","pTooltip","tooltipOptions","ngModel"],[3,"pTemplate"],[2,"height","32px",3,"src","svgStyle"]],template:function(e,o){e&1&&(s(0,"main"),k(1,"x-nav"),s(2,"div")(3,"x-card",0),S(4,nn,7,5,"section",null,Ut),s(6,"div",1),S(7,rn,3,3,"p-togglebutton",2,Wt),p(),s(9,"p-button",3)(10,"span"),D(11,"\u30B9\u30BF\u30FC\u30C8"),p()()()()()),e&2&&(l(3),c("tooltip",L(2,Qt,o.romanizeTooltip)),l(),F(o.kanaGroups),l(3),F(o.kanaExtraToggles),l(2),c("tooltipOptions",o.romanizeTooltip))},dependencies:[je,ze,P,Ue,pt,re,qe,Qe,bt,ce,He,$e,Ke,nt,tt,ot,Ee,at,le],styles:[".p-tooltip.romanize-tooltip{font-weight:700}[_nghost-%COMP%]   main[_ngcontent-%COMP%]{padding:var(--padding)}[_nghost-%COMP%]   main[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;display:grid;justify-content:center;margin-top:var(--padding)}@media(max-width:599px){[_nghost-%COMP%]   main[_ngcontent-%COMP%]{padding:calc(var(--padding) / 2)}[_nghost-%COMP%]   main[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-top:calc(var(--padding) / 2)}}[_nghost-%COMP%]     x-card>.content{display:grid;grid-template-columns:1fr;gap:0;justify-items:center}[_nghost-%COMP%]     x-card>.content>section{width:max-content;display:grid;justify-items:center}[_nghost-%COMP%]     x-card>.content>section>h3{text-wrap:nowrap;text-align:center}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table{margin-top:var(--padding);display:grid;grid-template-columns:44px repeat(5,3rem);grid-auto-rows:3rem;justify-content:center;align-items:stretch;justify-items:stretch;row-gap:calc(var(--spacing) * 1.5)}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table p-checkbox{align-self:center;justify-self:center}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table p-togglebutton{font-weight:700}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table .p-togglebutton{align-items:center;justify-content:center}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table .p-togglebutton-content{width:2.4rem;height:2.4rem;flex:0 0 2.4rem}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table p-togglebutton:has(+p-togglebutton){border-start-end-radius:0;border-end-end-radius:0}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table p-togglebutton+p-togglebutton{border-start-start-radius:0;border-end-start-radius:0}[_nghost-%COMP%]     x-card>.content>#kana-extra-toggles{display:flex;gap:var(--padding);margin:var(--padding);justify-self:center;align-self:center}[_nghost-%COMP%]     x-card>.content>#kana-extra-toggles>p-togglebutton{width:50px;height:50px}[_nghost-%COMP%]     x-card>.content>#kana-extra-toggles>p-togglebutton .p-togglebutton-content{padding:0;width:40px;height:42px}[_nghost-%COMP%]     x-card>.content>#kana-extra-toggles>p-togglebutton .p-togglebutton-label{display:none}[_nghost-%COMP%]     x-card>.content #start-button{margin-top:var(--padding)}[_nghost-%COMP%]     x-card>.content #start-button span{font-weight:900}@media(min-width:600px){[_nghost-%COMP%]     x-card>.content{--desktop-padding: calc(var(--padding) * 2);grid-template-columns:1fr 1fr;padding:var(--desktop-padding);padding-bottom:var(--padding)}[_nghost-%COMP%]     x-card>.content>section:first-of-type{border-bottom:none;padding-bottom:0;margin-bottom:0;padding-right:calc(var(--desktop-padding) + var(--padding));border-right:1px solid var(--border)}[_nghost-%COMP%]     x-card>.content>section:last-of-type{padding-left:calc(var(--desktop-padding) + var(--padding))}[_nghost-%COMP%]     x-card>.content>#kana-extra-toggles, [_nghost-%COMP%]     x-card>.content #start-button{grid-column:1/span 2}}@media(max-width:599px){[_nghost-%COMP%]     x-card{width:calc(100vw - var(--padding));max-width:100%;padding:calc(var(--padding) / 2)}[_nghost-%COMP%]     x-card>.content>section{width:100%;max-width:100%}[_nghost-%COMP%]     x-card>.content>section>fieldset.char-table{width:100%}[_nghost-%COMP%]     x-card>.content>#kana-extra-toggles{flex-wrap:wrap;justify-content:center;gap:calc(var(--padding) / 2)}[_nghost-%COMP%]     x-card>.content #start-button{padding:calc(var(--spacing) * 3) calc(var(--spacing) * 6);margin-bottom:calc(var(--padding) * 2)}}"],changeDetection:0})};export{ue as default};
