//>>built
define("epi/cms/contentediting/command/SendForReview",["dojo/_base/declare","dojo/topic","epi/cms/contentediting/ContentActionSupport","epi/cms/contentediting/command/_ChangeContentStatus","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons"],function(_1,_2,_3,_4,_5){return _1("epi.cms.contentediting.command.SendForReview",[_4],{name:"sendforreview",label:_5.sendforreview.label,executingLabel:_5.sendforreview.executinglabel,tooltip:_5.sendforreview.title,iconClass:"epi-iconCheckmark",action:_3.action.CheckIn,_execute:function(){_2.publish("/epi/cms/action/disableundoredoactions");return this.inherited(arguments);},_onModelChange:function(){this.inherited(arguments);var _6=this.model.contentData,_7=((_6.status===_3.versionStatus.CheckedOut)||(_6.status===_3.versionStatus.Rejected)||(_6.status===_3.versionStatus.Published&&_6.isCommonDraft))&&this.model.canChangeContent(this.action),_8=_7&&(_6.status!==_3.versionStatus.Published);this.set("canExecute",_8);this.set("isAvailable",_7);}});});