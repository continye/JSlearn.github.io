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
                "/": {
                    target: "https://dashscope.aliyuncs.com/compatible-mode/v1",
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: { '^/': '' },
                },
            },
        },
        // logLevel:"silent",
        envDir:'dirname'
    }
})
