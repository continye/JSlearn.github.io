import axios from "axios";

const request = axios.create({
    baseURL:"https://images.pexels.com/photos/23698640/pexels-photo-23698640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    timeout:1000
})



function getImg(){
    return request({
        method:"get",
        responseType:"arraybuffer"
    })
}


export default getImg;