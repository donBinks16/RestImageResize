//>>built
define("epi/shell/widget/Application",["dojo","dijit","epi","epi/dependency","epi/routes","dijit/_Widget","dijit/layout/ContentPane","dojo/store/JsonRest","dojo/store/Memory"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1.declare("epi.shell.widget.Application",_7,{viewNodes:null,_componentController:null,constructor:function(){this.viewNodes=[];},postMixInProperties:function(){this.inherited(arguments);this._componentController=_4.resolve("epi.shell.controller.Components");},postCreate:function(){this.inherited(arguments);this.viewNodes=[this.containerNode];},startup:function(){this.inherited(arguments);_1.when(this._componentController.loadComponents(this.viewNodes),_1.hitch(this,function(_a){_1.forEach(this.viewNodes,function(_b){var _c=_1.byId(_b);var _d=_2.getEnclosingWidget(_c);if(_d){if(_1.isFunction(_d.resize)){_d.resize();}}});_1.forEach(_a,function(_e){if(_1.isFunction(_e.resize)){_e.resize();}});}),function(e){console.error(e.stack||e);});}});});