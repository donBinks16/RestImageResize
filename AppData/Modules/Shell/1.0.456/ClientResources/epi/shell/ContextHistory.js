//>>built
define("epi/shell/ContextHistory",["dojo/_base/declare","dojo/_base/lang","dojo/store/Memory","dojo/store/Observable","dojo/topic"],function(_1,_2,_3,_4,_5){return _1(null,{store:null,constructor:function(_6){_2.mixin(this,_6);this.store=_4(this.createStore());},postscript:function(){_5.subscribe("/epi/shell/context/changed",_2.hitch(this,this.onContextChanged));},onContextChanged:function(_7,_8,_9){if(_8&&_8.trigger!="internal"){this.store.put(this.createStoreItem(_7),{overwrite:true});if(this.store.data.length>100){this.store.data.shift();}}},createStoreItem:function(_a){return {publicUrl:_a.publicUrl,id:_a.versionAgnosticUri,uri:_a.versionAgnosticUri,name:_a.name,typeIdentifier:_a.dataType,dateAdded:new Date()};},createStore:function(){return new _3({data:[],idProperty:"uri"});}});});