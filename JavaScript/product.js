import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'zhang-hexschool',
            tempProduct: {},
            products: [],
        };
    },
    methods: {
        //驗證是否登入
        loginCheck() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getData();
                })//驗證成功 -> 執行 getData，渲染出產品列表
                .catch((error) => {
                    alert(error.response.data.message);//驗證失敗 -> 取得 message 的字串
                    window.location = 'index.html';//驗證失敗 -> 導回登入頁面
                })
        },
        //取得後台產品列表
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((response) => {
                    this.products = response.data.products;
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        },
        //展開每一個產品
        openProduct(item){
            this.tempProduct = item;
        }
    },
    mounted() {
        //取得Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        //有正確取得token，放入headers
        //console.log(token);
        axios.defaults.headers.common.Authorization = token;
        //如何夾帶驗證資訊過去呢？下次發送 axios 預設把 token 內容直接加到 headers 裡面
        this.loginCheck();//執行驗證
    },
}).mount('#app');