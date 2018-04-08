webpackJsonp([4],{"+EgQ":function(e,t){},Fmaq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("TVG1"),r={name:"createForm",components:{},props:{formItem:{type:Object,default:function(){return{}}}},data:function(){return{}},watch:{},methods:{},mounted:function(){},activated:function(){}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Form",{attrs:{model:e.formItem}},[a("Row",[a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"角色名:","label-width":80}},[a("Input",{attrs:{placeholder:"角色名",clearable:""},model:{value:e.formItem.roleName,callback:function(t){e.$set(e.formItem,"roleName",t)},expression:"formItem.roleName"}})],1)],1),e._v(" "),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"角色描述:","label-width":80}},[a("Input",{attrs:{placeholder:"角色描述",clearable:""},model:{value:e.formItem.roleDesc,callback:function(t){e.$set(e.formItem,"roleDesc",t)},expression:"formItem.roleDesc"}})],1)],1),e._v(" "),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"菜单权值:","label-width":80}},[a("InputNumber",{attrs:{max:999,min:0,placeholder:"菜单权值"},model:{value:e.formItem.access,callback:function(t){e.$set(e.formItem,"access",t)},expression:"formItem.access"}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var n={name:"role",components:{createForm:a("VU/8")(r,s,!1,function(e){a("Uxga")},null,null).exports},data:function(){var e=this;return{searchForm:{},model1:"",showDetail:!1,showCreateForm:!1,showIdDetail:"",cityList:[],modalTitle:"",columns1:[{title:"角色名",key:"roleName"},{title:"角色描述",key:"roleDesc"},{title:"角色权值",key:"access"},{title:"创建日期",key:"created_date"},{title:"更新日期",key:"updated_date"},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.showUpdateFrom(a.row)}}},"编辑"),t("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗?",transfer:!0},on:{"on-ok":function(){e.deleteRole(a.row.serialNum)}}},[t("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"}},"删除")])])}}],formItem:{},modalType:"",tableData:[],currentPage:1,totalPage:1,pageSize:20}},methods:{lastPage:function(){this.currentPage>1?(this.currentPage--,this.roleList()):this.$Message.info("当前已经是第一页。")},nextPage:function(){this.currentPage<this.totalPage?(this.currentPage++,this.roleList()):this.$Message.info("没有更多的数据了。")},showCreateFrom:function(){this.modalTitle="添加角色",this.modalType="create",this.formItem={},this.showCreateForm=!0},showUpdateFrom:function(e){this.modalTitle="修改角色",this.modalType="update",this.formItem=e,this.showCreateForm=!0},rowClassName:function(e,t){return"table-info-pointer"},ok:function(){"create"==this.modalType?this.createRole(this.formItem):"update"==this.modalType&&this.updateRole(this.formItem)},cancel:function(){this.showCreateForm=!1},createRole:function(e){var t=this;o.a.ajax.post("/roles",e).then(function(e){200==e.data.code?t.$Message.info("角色创建成功!"):t.$Message.info("角色创建失败!"),t.roleList()})},updateRole:function(e){var t=this;o.a.ajax.put("/roles/"+e.serialNum,e).then(function(e){200==e.data.code?t.$Message.info("角色更新成功!"):t.$Message.info("角色更新失败!"),t.roleList()})},deleteRole:function(e){var t=this;o.a.ajax.delete("/roles/"+e).then(function(e){200==e.data.code?t.$Message.info("角色删除成功!"):t.$Message.info("角色删除失败!"),t.roleList()})},roleList:function(){var e=this,t={};null!=this.searchForm.roleName&&""!=this.searchForm.roleName&&(t.roleName=this.searchForm.roleName),t.page_index=this.currentPage,t.pageSize=this.pageSize;var a="";for(var r in t)a+=r+"="+t[r]+"&";o.a.ajax.get("/roles?"+a).then(function(t){if(200==t.data.code){var a=t.data.data.list;for(var r in e.totalPage=t.data.data.totalPage,a)a[r].created_date=o.a.formatDate(new Date(a[r].created_date),"yyyy-MM-dd hh:mm:ss"),a[r].updated_date=o.a.formatDate(new Date(a[r].updated_date),"yyyy-MM-dd hh:mm:ss");e.tableData=a}else e.$Message.info("角色获取失败!")}).catch(function(e){console.log(e)})},btnClick:function(){this.currentPage=1,this.roleList()}},mounted:function(){this.roleList()}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",[a("Card",[a("Row",{attrs:{gutter:24}},[a("Col",{attrs:{span:"6"}},[a("Input",{attrs:{placeholder:"角色名查询",size:"large"},model:{value:e.searchForm.roleName,callback:function(t){e.$set(e.searchForm,"roleName",t)},expression:"searchForm.roleName"}},[a("Button",{attrs:{slot:"append",type:"primary",icon:"ios-search"},on:{click:e.btnClick},slot:"append"})],1)],1),e._v(" "),a("Col",{attrs:{span:"3",offset:"15"}},[a("Button",{attrs:{type:"info",long:"",icon:"plus-round",size:"large"},on:{click:e.showCreateFrom}},[e._v("添加角色")])],1)],1)],1)],1),e._v(" "),a("Row",{staticClass:"margin-top-10"},[a("Col",{attrs:{span:"24"}},[a("Table",{attrs:{"row-class-name":e.rowClassName,border:"",height:"400",columns:e.columns1,data:e.tableData}}),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("Row",[a("Col",{attrs:{span:"6"}},[a("span",[e._v("当前第"+e._s(e.currentPage)+"页(总共"+e._s(e.totalPage)+"页)，每页显示20条记录")])]),e._v(" "),a("Col",{attrs:{span:"4",offset:"14"}},[a("ButtonGroup",{attrs:{shape:"circle"}},[a("Button",{attrs:{type:"ghost"},on:{click:e.lastPage}},[a("Icon",{attrs:{type:"chevron-left"}}),e._v("\n                                上一页\n                                ")],1),e._v(" "),a("Button",{attrs:{type:"ghost"},on:{click:e.nextPage}},[e._v("\n                                下一页\n                                "),a("Icon",{attrs:{type:"chevron-right"}})],1)],1)],1)],1)],1)],1)],1),e._v(" "),a("Modal",{attrs:{width:"888",styles:{top:"20px"}},on:{"on-ok":e.ok,"on-cancel":e.cancel},model:{value:e.showCreateForm,callback:function(t){e.showCreateForm=t},expression:"showCreateForm"}},[a("p",{staticStyle:{color:"#f60","text-align":"left"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v(e._s(e.modalTitle))])],1),e._v(" "),a("create-form",{attrs:{formItem:e.formItem}})],1)],1)},staticRenderFns:[]};var i=a("VU/8")(n,l,!1,function(e){a("+EgQ")},null,null);t.default=i.exports},Uxga:function(e,t){}});
//# sourceMappingURL=4.a25fe38e05199ba4eae6.js.map