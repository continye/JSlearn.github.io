import classes from './style.module.css'
import classes2 from './style1.module.css'

import getImg from './request';
import OpenAI from "openai";

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

const openai = new OpenAI({
  apiKey: "sk-8b4b10cdc7a342a9b38447bef1863649",
  dangerouslyAllowBrowser: true, // 允许在浏览器中使用 API
  baseURL: "/compatible-mode/v1",
});

// 存储对话的上下文
let messages = [{ role: "system", content: "You are a helpful assistant." }];

// 处理发送消息
async function sendMessage(userInput) {
  // 将用户的消息添加到对话上下文中
  messages.push({ role: "user", content: userInput });

  try {
    // 调用 OpenAI 的 chat completion 接口
    const response = await openai.chat.completions.create({
      model: "qwen-max", // 使用的模型
      messages: messages,
    });

    // 获取助手的回复
    const assistantMessage = response.choices[0].message.content;

    // 将助手的回复添加到对话上下文中
    messages.push({ role: "assistant", content: assistantMessage });

    // 更新对话显示区域
    updateChatBox(userInput, assistantMessage);
  } catch (error) {
    console.error("Error during API call:", error);
  }
}

// 更新对话显示区域
function updateChatBox(userMessage, assistantMessage) {
  const chatBox = document.getElementById("chat-box");

  // 添加用户消息
  const userDiv = document.createElement("div");
  userDiv.classList.add("chat-content");
  userDiv.textContent = `用户: ${userMessage}`;
  chatBox.appendChild(userDiv);

  // 添加助手消息
  const assistantDiv = document.createElement("div");
  userDiv.classList.add("chat-content");
  assistantDiv.textContent = `助手: ${assistantMessage}`;
  chatBox.appendChild(assistantDiv);

  // 滚动到最新的消息
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 绑定发送按钮事件
document.getElementById("send-button").addEventListener("click", () => {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim()) {
    sendMessage(userInput);
    document.getElementById("user-input").value = ""; // 清空输入框
  }
});



