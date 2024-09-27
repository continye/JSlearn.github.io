import classes from './style.module.css'
import classes2 from './style1.module.css'

import getImg from './request';

import './style.css'
console.log(classes.name,classes2.name);

const hello = document.querySelector('h1');

hello.className = classes.name;
console.log('./src', import.meta.url);
// console.log(import.meta.resolve('/sss'));
console.log(import.meta.dirname);
console.log(import.meta.filename);

console.log(import.meta.env);


console.log("hello");



window.onload = ()=>{
    const img = Promise.resolve(getImg()).then(res =>{
        // 这里将得到的图片流转换成blob类型
        const blob = new Blob([res.data], {
            type: 'image/jpeg',
        });
        //浏览器允许使用URL.createObjectURL()方法，针对Blob对象产生一个临时URL
        //这个URL以Blob://开头，表明一个Blob对象
        const url = window.URL.createObjectURL(blob);
        
        const image = document.createElement('img');
        //图片onload触发后将销毁URL对象，释放内存
        image.onload = (e) => window.URL.revokeObjectURL(img.src);
        image.src = url;
        document.body.appendChild(image);
        console.log(img.data);
    
        // // 将Blob转换为Base64字符串
        // const reader = new FileReader();
        // reader.readAsDataURL(blob);
        // reader.onloadend = function() {
        // const base64String = reader.result;
    
        //   // 设置CSS背景
        //   const imga = document.getElementById('imga');
        //   imga.style.width = "400px";
        //   imga.style.height = "400px";

        //   imga.style.backgroundImage = `url(${base64String})`;
        // }
    });

}




