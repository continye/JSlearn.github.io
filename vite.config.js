import { defineConfig,loadEnv } from "vite";

export default defineConfig(({command,mode})=>{
    const env = loadEnv(mode,process.cwd(),'');
    console.log(import.meta.env,process.cwd());
    return {
        base:'/JSlearn.github.io/',
        // clearScreen:true,
        // envPrefix:"APP_"
        server:{
            // port:3000,
            // strictPort:true
            open:"index.html",
             proxy: {
                "https://continye.github.io": {
                    target: "https://dashscope.aliyuncs.com",
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        // logLevel:"silent",
        envDir:'dirname'
    }
})
