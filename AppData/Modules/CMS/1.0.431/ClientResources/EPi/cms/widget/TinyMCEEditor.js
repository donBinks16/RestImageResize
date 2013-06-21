//>>built
require({cache:{"url:epi/cms/widget/templates/TinyMCEEditor.html":"<div id=\"widget_${id}\" style=\"position: relative; display: inline-block;\">\r\n    <div style=\"display: inline-block\" data-dojo-attach-point=\"stateNode, tooltipNode\">\r\n        <textarea data-dojo-attach-point=\"editorFrame\" id=\"${id}_editorFrame\" style=\"border: none;\"></textarea>\r\n    </div>\r\n    <div data-dojo-attach-point=\"dndOverlay\" style=\"background: rgba(0, 0, 0, 0.01); position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: none\"></div>\r\n</div>\r\n"}});define("epi/cms/widget/TinyMCEEditor",["dojo/_base/config","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/dom-style","dojo/dom-class","dojo/io/script","dijit/_Widget","dijit/_TemplatedMixin","dijit/_CssStateMixin","dijit/Tooltip","epi/shell/dnd/Target","epi/shell/layout/_LayoutWidget","epi/cms/widget/_HasChildDialogMixin","epi/cms/widget/_UserResizable","epi/shell/widget/_ValueRequiredMixin","epi/cms/widget/_DndStateMixin","dojo/text!./templates/TinyMCEEditor.html","epi/i18n!epi/cms/nls/tinymce"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13){return _2("epi.cms.widget.TinyMCEEditor",[_d,_9,_e,_f,_a,_10,_11],{baseClass:"epiTinyMCEEditor",width:null,height:null,value:null,intermediateChanges:true,templateString:_12,settings:null,routes:epi.routes,_registerIframeHandle:null,_mousedownResizeHandle:null,dirtyCheckInterval:10000,autoResizable:false,isResized:false,tinymceRendered:null,dropTarget:null,readOnly:false,_dirtyCheckTimeout:null,constructor:function(_14){_3.mixin(this,_14);this.tinymceRendered=new _4();},postMixInProperties:function(){if(this.autoResizable){this.height=0;}},postCreate:function(){if(!window.tinymce){var _15=this.routes.getActionPath({moduleArea:"Util",path:_1.isDebug?"Editor/tinymce/tiny_mce_src.js":"Editor/tinymce/tiny_mce.js"});dojo.io.script.get({url:_15,load:_3.hitch(this,function(){tinymce.addI18n({en:_13});setTimeout(_3.hitch(this,this._initTinyMCE),1);}),error:function(){}});}else{setTimeout(_3.hitch(this,this._initTinyMCE),1);}this.dropTarget=new _c(this.dndOverlay,{accept:["fileurl","link"],createItemOnDrop:false,readOnly:this.readOnly});this.connect(this.dropTarget,"onDropData","_onDropData");this.connect(this.dndOverlay,"onmousemove","_onOverlayMouseMove");this.inherited(arguments);},destroy:function(){dijit.unregisterIframe(this._registerIframeHandle);this.disconnect(this._mousedownResizeHandle);this._cancelDirtyCheckInterval();this.inherited(arguments);},canAccept:function(){return !_6.contains(this.dndOverlay,"dojoDndTargetDisabled");},_onDndStart:function(){_5.set(this.dndOverlay,"display","block");this.inherited(arguments);},_onDndCancel:function(){_5.set(this.dndOverlay,"display","none");this.inherited(arguments);},_onDndDrop:function(){_5.set(this.dndOverlay,"display","none");this.inherited(arguments);},_onOverlayMouseMove:function(evt){this._dragPosition={x:evt.pageX,y:evt.pageY};},_onDropData:function(_16,_17,_18,_19){var _1a=_16?(_16.length?_16[0]:_16):null;if(!_1a){return;}if(this.parent&&!this.parent.editing){var _1b=this.parent.watch("editing",_3.hitch(this,function(){if(this.parent.editing){_1b.unwatch();this._dropDataProcessor(_1a);}}));this.onFocus();return;}this._dropDataProcessor(_1a);},_dropDataProcessor:function(_1c){_4.when(_1c.data,_3.hitch(this,function(_1d){var _1e=_1c.type;var _1f;var ed=this.getEditor();if(_1e.indexOf("link")!=-1){if(!ed.selection.isCollapsed()){ed.focus();ed.execCommand("CreateLink",false,_1d.url);return;}else{_1f="<a href=\""+_1d.url+"\">"+_1d.text+"</a>";}}else{if(_1e.indexOf("fileurl")!=-1){var _20=/^\S+\.*(jpg|jpeg|jpe|ico|gif|bmp|png)$/;if(_1d.toLowerCase().match(_20,"i")){_1f="<img src=\""+_1d+"\" alt=\"\" />";}else{var _21=_1d;var _22=_1d.lastIndexOf("/");if(_22>-1){_21=decodeURI(_1d.substring(_22+1,_1d.length));}_1f="<a target=\"_blank\" href=\""+_1d+"\">"+_21+"</a>";}}}if(_1f){var s=ed.selection;ed.focus();s.setContent(_1f);ed.undoManager.add();this._onChange(ed.getContent());}}));_5.set(this.dndOverlay,"display","none");},focus:function(){this._set("state","Focused");var ed=this.getEditor();if(ed!=null){this._focused=true;ed._gainedFocus=true;_4.when(this.tinymceRendered,_3.hitch(this,function(){tinymce.execCommand("mceFocus",false,this.editorFrame.id);}));}},validate:function(){return this.inherited(arguments);},getEditor:function(){return (typeof tinymce!=="undefined"&&tinymce!=null?tinymce.get(this.editorFrame.id):null);},resizeEditor:function(){var ed=this.getEditor();var _23=0;var _24=(tinymce.isIE?document.body.clientHeight:window.innerHeight)-200;var _25=(tinymce.isIE?document.body.clientWidth:window.innerWidth)-200;var d=ed.getDoc(),b=d.body,DOM=tinymce.DOM,_26=this.height,_27=this.width,_28,_29;_28=b.scrollHeight;_29=b.scrollWidth;if(_28>_23){_26=_28;}if(_28>_24){_26=_24;}if(_29>_25){_27=_25;}DOM.setStyle(ed.contentWindow.frameElement,"height",_26+80+"px");if(ed.getBody().scrollWidth!=ed.getBody().offsetWidth){var _2a=20;if(_26==_24){_2a=30;}DOM.setStyle(ed.contentWindow.frameElement,"width",ed.getBody().scrollWidth+_2a+"px");}this.isResized=true;},_setValueAttr:function(_2b){var _2c=(_2b===null||_2b===undefined);this._emptyRawValue=_2c;this._rawValue=_2b;this.value=_2b;if(_2c){this.value="";}var _2d=function(t){var _2e=t.getEditor();if(_2e!=null){_2e.setContent(t.value);}this._started&&setTimeout(_3.hitch(t,t.validate),0);};_4.when(this.tinymceRendered,_3.hitch(this,function(){_2d(this);}));},_getValueAttr:function(){if(this._emptyRawValue){return this._rawValue;}else{return this.value;}},_initTinyMCE:function(){this.settings=_3.mixin(this.settings,{mode:"exact",width:this.width,height:this.height,setup:_3.hitch(this,this._setupEditorEventHandling),relative_urls:false,elements:this.editorFrame.id,readonly:this.readOnly});this.editorFrame.value=this.value||"";if(typeof tinymce!=="undefined"){tinymce.dom.Event.domLoaded=true;tinymce.init(this.settings);this._startDirtyCheckInterval();}else{console.error("Couldn't initialize the editor");}},_onPostRender:function(ed){if(this.tinymceRendered.fired!==0){this.tinymceRendered.resolve();this._registerIframeHandle=dijit.registerIframe(ed.contentWindow.frameElement);this._handlePopupMenu(ed);this._handlePopupWindow(ed);this._handleResize(ed);}},_handlePopupWindow:function(ed){ed.windowManager.onOpen.add(_3.hitch(this,function(){this.isShowingChildDialog=true;}));ed.windowManager.onClose.add(_3.hitch(this,function(){this.focus();this.isShowingChildDialog=false;}));},_handlePopupMenu:function(ed){var _2f;for(var i in ed.controlManager.controls){_2f=ed.controlManager.controls[i];if(_2f.onRenderMenu){_2f.onRenderMenu.add(_3.hitch(this,function(_30,_31){_31.onShowMenu.add(_3.hitch(this,function(){this.isShowingChildDialog=true;}));_31.onHideMenu.add(_3.hitch(this,function(){this.isShowingChildDialog=false;}));}));}}},_handleResize:function(ed){var _32=dojo.byId(ed.id+"_resize");this._mousedownResizeHandle=this.connect(_32,"onmousedown",function(){this.onResizeStart();var _33,_34;var _35=_3.hitch(this,function(){this.onResizeStop();this.onLayoutChanged();this.disconnect(_33);this.disconnect(_34);});_33=this.connect(dojo.doc,"onmouseup",_35);_34=this.connect(ed.getDoc(),"onmouseup",_35);});},_setupEditorEventHandling:function(ed){ed.onPreInit.add(_3.hitch(this,function(){this.connect(ed.getBody(),"ondrop",function(evt){ed.undoManager.typing=true;setTimeout(function(){ed.undoManager.typing=false;ed.undoManager.add();},500);});}));ed.onInit.add(function(){ed.undoManager.add();});ed.onSetContent.add(_3.hitch(this,function(ed,e){this.onSetContent(ed);}));ed.onPostRender.add(_3.hitch(this,function(ed,e){this._onPostRender(ed);}));ed.onKeyUp.add(_3.hitch(this,function(ed,e){this.onKeyUp();}));ed.onChange.add(_3.hitch(this,function(ed,e){this._onChange(ed.getContent());}));ed.onRemove.add(_3.hitch(this,function(ed){this.onEditorRemoved(ed);}));ed.onRedo.add(_3.hitch(this,function(ed,_36){this.onRedo(ed,_36);}));ed.onUndo.add(_3.hitch(this,function(ed,_37){this.onUndo(ed,_37);}));ed.onBeforeExecCommand.add(_3.hitch(this,function(ed,cmd,ui,val,a){if(cmd==="mceFullScreen"){this.isShowingChildDialog=!this.isShowingChildDialog;}}));},onSetContent:function(ed){if(this.isResized){this._hasPendingChanges=this.value!=ed.getContent()||this._hasPendingChanges;}if(this.autoResizable&&!this.isResized){setTimeout(_3.hitch(this,function(){this.resizeEditor();}),200);}else{if(!this.isResized){this.isResized=true;}}this.onLayoutChanged();},onEditorRemoved:function(ed){},onKeyUp:function(){if(this._checkTimeout){clearTimeout(this._checkTimeout);}var ed=this.getEditor();if(ed){this._hasPendingChanges=ed.undoManager.typing;}this._checkTimeout=setTimeout(_3.hitch(this,this._dirtyCheck),2000);},_onChange:function(val){this.value=val;this._emptyRawValue=false;if(this.validate()){this._hasPendingChanges=false;this.onChange(this.value);}},onChange:function(val){},_onBlur:function(){this._focused=false;if(this.get("state")==="Focused"){this._set("state","");}this.displayMessage(null);var ed=this.getEditor();if(ed&&ed.undoManager&&ed.undoManager.typing){ed.undoManager.typing=0;ed.undoManager.add();}if(this._hasPendingChanges){var val=ed.getContent();if(!this.intermediateChanges){this._onChange(val);}else{this.value=val;this._emptyRawValue=false;}}this.inherited(arguments);},_cancelDirtyCheckInterval:function(){if(this._dirtyCheckTimeout){clearTimeout(this._dirtyCheckTimeout);this._dirtyCheckTimeout=null;}},_startDirtyCheckInterval:function(){if(this._destroyed||!this.intermediateChanges){return;}this._cancelDirtyCheckInterval();this._dirtyCheck();this._dirtyCheckTimeout=setTimeout(_3.hitch(this,this._startDirtyCheckInterval),this.dirtyCheckInterval);},_dirtyCheck:function(){var ed=this.getEditor();if(ed){if(this._hasPendingChanges){this._onChange(ed.getContent());}}},onRedo:function(ed,_38){this._hasPendingChanges=true;},onUndo:function(ed,_39){this._hasPendingChanges=true;}});});