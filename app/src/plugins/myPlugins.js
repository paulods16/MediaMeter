const myPlugin = {
 install(Vue){
     Vue.mixin({
         data:()=>({
             api: process.env.VUE_APP_URL, // access .env file "VUE_APP_URL" w/c is url to server side script
         }),
         methods:{

         },
         computed:{

         }           
     })
 }
}
export default myPlugin