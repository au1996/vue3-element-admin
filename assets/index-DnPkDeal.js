import{r,Q as F,h as D,j as a,M as e,G as s,a7 as t,am as I,an as E,ao as S,ap as U,i as m,$ as z,E as k,K}from"./vue-DMw5Nt_d.js";import{_ as L}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{E as N}from"./element-plus-7YaSf0MG.js";const _=u=>(I("data-v-53c20b84"),u=u(),E(),u),R={class:"login-wrap"},q={class:"login-content"},M=_(()=>a("div",{class:"login-title"},"系统登录",-1)),T={class:"login-btn"},j=_(()=>a("p",{class:"login-tips"},"用户名: admin 密码: 123",-1)),G=_(()=>a("p",{class:"login-tips"},"用户名: editor 密码: 456",-1)),P={__name:"index",setup(u){const y=S(),C=U(),c=r(!1),f=r(null),n=r(!0),i=r("password"),o=F({username:"",password:""}),b=F({username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}),g=()=>{n.value?i.value="text":i.value="password",n.value=!n.value},v=async()=>{f.value.validate(B=>{B?(c.value=!0,C.dispatch("user/login",o).then(()=>{y.push("/")}).finally(()=>{c.value=!1})):N.error("请输入用户名和密码")})};return(B,l)=>{const p=t("Icon"),h=t("el-input"),w=t("el-form-item"),V=t("el-button"),x=t("el-form");return m(),D("div",R,[a("div",q,[M,e(x,{ref_key:"loginFormRef",ref:f,class:"login-form",model:o,rules:b,"status-icon":""},{default:s(()=>[e(w,{prop:"username"},{default:s(()=>[e(h,{modelValue:o.username,"onUpdate:modelValue":l[0]||(l[0]=d=>o.username=d),placeholder:"用户名"},{prepend:s(()=>[e(p,{name:"UserFilled",size:"14"})]),_:1},8,["modelValue"])]),_:1}),e(w,{prop:"password"},{default:s(()=>[e(h,{modelValue:o.password,"onUpdate:modelValue":l[1]||(l[1]=d=>o.password=d),placeholder:"密码",type:i.value,onKeyup:z(v,["enter"])},{prepend:s(()=>[n.value?(m(),k(p,{key:0,name:"Lock",size:"14",onClick:g})):(m(),k(p,{key:1,name:"Unlock",size:"14",onClick:g}))]),_:1},8,["modelValue","type"])]),_:1}),a("div",T,[e(V,{type:"primary",loading:c.value,onClick:v},{default:s(()=>[K("登录")]),_:1},8,["loading"])]),j,G]),_:1},8,["model","rules"])])])}}},H=L(P,[["__scopeId","data-v-53c20b84"]]);export{H as default};
