import{s as a,c as l}from"./assets/bi_check2-circle-3cbed83a.js";/* empty css                      */import{i as s}from"./assets/vendor-77e16229.js";const t=document.querySelector(".form");t.addEventListener("submit",r=>{r.preventDefault();const o=document.querySelector('[name="delay"]').value,i=document.querySelector('input[name="state"]:checked').value;new Promise((e,c)=>{setTimeout(()=>{i==="fulfilled"?e(`Fulfilled promise in ${o}ms`):c(`Rejected promise in ${o}ms`)},o)}).then(e=>{s.success({title:"",message:e,backgroundColor:"#59A10D",messageColor:"#ffffff",position:"topRight",iconUrl:a})}).catch(e=>{s.error({title:"",message:e,backgroundColor:"#EF4040",messageColor:"#ffffff",position:"topRight",iconUrl:l})}),t.reset()});
//# sourceMappingURL=commonHelpers2.js.map
