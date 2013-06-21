//>>built
define("epi/cms/command/DeleteContent",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","epi","epi/dependency","epi/cms/contentediting/ContentActionSupport","epi/shell/command/_Command","epi/shell/command/_SelectionCommandMixin","epi/i18n!epi/cms/nls/episerver.cms.command"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1([_7,_8],{label:_9.movetotrash,iconClass:"epi-iconTrash",wasteBasketId:null,postscript:function(){this.inherited(arguments);this.wasteBasketId=this.wasteBasketId||_5.resolve("epi.cms.Application").getWastebasketPage();},_execute:function(){var _a=this.selection.data[0].data,_b=this.clipboard&&this.clipboard.data,_c=_b&&_b.length==1&&_b[0],_d=(_c!=null&&_c.data!=null)?this.model.isAncestor(_a,_c.data):false;if(this.model&&_a){_2.when(this.model.move?this.model.move(_a,{contentLink:this.wasteBasketId,isWastebasket:true}):this.model.remove(_a),_3.hitch(this,function(_e){if(_e&&_e.isSuccess===true){_2.when(_d,_3.hitch(this,function(_f){if(_f===true){this.clipboard.clear();}}));if(this.model.onDeleted){this.model.onDeleted(_a);}}}));}},_onModelChange:function(){var _10=this.model,_11=this.selection.data,_12=false;if(_10&&_11.length==1){var _13=_11[0];_12=_13.type=="epi.cms.contentdata"&&this._validateDelete(_13.data);}this.set("canExecute",_12);},_validateDelete:function(_14){return !_14.isDeleted&&this.model.canDelete(_14);}});});