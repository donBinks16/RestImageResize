//>>built
define("epi/cms/contentediting/command/BlockMoveDown",["dojo/_base/declare","epi","epi/shell/command/_Command"],function(_1,_2,_3){return _1("epi.cms.contentediting.command.BlockMoveDown",[_3],{name:"movedown",label:_2.resources.action.movedown,tooltip:_2.resources.action.movedown,iconClass:"epi-iconDown",category:"menuWithSeparator",postscript:function(){this.inherited(arguments);},_execute:function(){this.model.moveDown();return this.inherited(arguments);},_onModelChange:function(){this.set("canExecute",this.model&&!this.model.get("isBottom"));}});});