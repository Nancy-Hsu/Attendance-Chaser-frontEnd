import{r as f,g as P,o as w,c as m,d as s,f as n,v as d,w as g,F as b,T as a,h as i,i as u,j as v}from"./index-325963ef.js";const y=s("h2",{class:"fw-bold"}," 更改密碼 ",-1),k=s("small",null,"請先輸入您的密碼在進行更改",-1),C=["onSubmit"],U={class:"form-group mt-3 mb-2"},$=s("label",{for:"oldPassword"},"Origin Password",-1),x={class:"form-group mb-2"},A=s("label",{for:"newPassword"},"New Password",-1),T={class:"form-group mb-2"},V=s("label",{for:"newPasswordCheck"},"New Password",-1),I=s("div",{class:"form-group mt-3"},[s("button",{type:"submit",class:"btn btn-primary"},"確定更改")],-1),N={__name:"userEdit",setup(p){const e=f({oldPassword:"",newPassword:"",newPasswordCheck:""}),c=P(()=>e.newPassword===e.newPasswordCheck);async function l(){try{for(let h in e)if(!e[h]){a.error("請填上所有欄位");return}if(!c.value){a.error("請確認新密碼兩者相同");return}const t=await i.getCurrentUser(),{currentUser:o}=t.data,r=o.id,_=await i.putUser({userId:r,formData:e});a.success(_.data.message)}catch(t){console.log(t),a.error(t.response.data.message);return}}return(t,o)=>(w(),m(b,null,[y,k,s("form",{onSubmit:g(l,["prevent"])},[s("div",U,[$,n(s("input",{type:"password",class:"form-control",id:"oldPassword",placeholder:"your origin password","onUpdate:modelValue":o[0]||(o[0]=r=>e.oldPassword=r),required:""},null,512),[[d,e.oldPassword]])]),s("div",x,[A,n(s("input",{type:"password",class:"form-control",id:"newPassword",placeholder:"your new password","onUpdate:modelValue":o[1]||(o[1]=r=>e.newPassword=r),required:""},null,512),[[d,e.newPassword]])]),s("div",T,[V,n(s("input",{type:"password",class:"form-control",id:"newPasswordCheck",placeholder:"confirm new password","onUpdate:modelValue":o[2]||(o[2]=r=>e.newPasswordCheck=r)},null,512),[[d,e.newPasswordCheck]])]),I],40,C)],64))}},R={class:"container py-5"},B=s("h1",{class:"mt-1"}," 首頁 - 個人資料 ",-1),E={class:"row"},S={class:"col-md-5"},q={class:"col-md-6"},F={__name:"setting",setup(p){const e={id:2,account:"000002",email:"RogahnAusten@example.com",employeeId:"000002",name:"Rogahn Austen",isRemote:!0,createdAt:"2022-12-28T14:13:57.000Z",updatedAt:"2022-12-28T14:13:57.000Z"};return(c,l)=>(w(),m("div",R,[B,s("div",E,[s("div",S,[u(v,{user:e})]),s("div",q,[u(N)])])]))}};export{F as default};