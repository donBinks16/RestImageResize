//>>built
define("epi/cms/component/ContextHistory",["dojo/_base/declare","dojo/_base/lang","epi/cms/core/ContentReference","epi/cms/widget/_GridWidgetBase","epi/dependency"],function(_1,_2,_3,_4,_5){return _1("epi.cms.component.ContextHistory",[_4],{postMixInProperties:function(){var _6=_5.resolve("epi.shell.ContextHistory");this.store=_6.store;this.inherited(arguments);},buildRendering:function(){this.inherited(arguments);var _7=_2.mixin({columns:{name:{renderCell:_2.hitch(this,this._renderContentItem)}},store:this.store,selectionMode:"single"},this.defaultGridMixin);this.grid=new this._gridClass(_7,this.domNode);this.grid.set("showHeader",false);},startup:function(){this.inherited(arguments);this.fetchData();},contextChanged:function(){this.inherited(arguments);this.grid.set("sort","dateAdded",true);},fetchData:function(){var _8=_5.resolve("epi.cms.Application");var _9=_8.getWastebasketPage();this.grid.set("query",{uri:new RegExp("epi\\.cms\\.contentdata:///([^"+_9+"]|\\d{2,})")});this.grid.set("sort","dateAdded",true);}});});