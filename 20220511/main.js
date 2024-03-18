let pageData ={
    productName:"自家種蔬菜水果，讓您吃得健康",
    productDescription:"多樣蔬果，任你挑選",
    imgSrc: ["apple.jpg", "banana.jpg", "carrot.jpg", "pineapple.jpg", "pumpkin.jpg", "tomato.jpg", "farm.jpg",],
    h2ClassController:{
        centered:true,
        colorFont:true
    },
    pStyleController:{
        'margin-left':'50px',
         color:'white',
        'font-size':'20px',
        'font-style':'italic',
        'text-align':'center'
    },
    imageStyleController:{
        margin:'auto',
        display:'block',
        width:'50%'
    },
    
       // centered:true
    
    productClasses:[
        {
            name: '阿嬤的香甜蘋果',
            price:125,
            productAvailable:50,
            earlyBird:true
        },
        {
            name:'阿嬤的有機香蕉',
            price: 35,
            productAvailable:6,
            earlyBird:true
        },
        {
            name:'阿嬤的沒有土味紅蘿蔔',
            price:40,
            productAvailable:30,
            earlyBird:false
        },
        {
            name: '阿嬤的不會刺舌頭鳳梨',
            price: 43,
            productAvailable: 30,
            earlyBird: false
        },
        {
            name: '阿嬤的胖南瓜',
            price: 43,
            productAvailable: 30,
            earlyBird: true
        },
        {
            name: '阿嬤的大番茄',
            price: 35,
            productAvailable: 2,
            earlyBird: false
        },

    ],
    selectedIndex:6,
    imageAlt:"",
    name:"",
    number:0,
    note:'',
    showBooktable:false,
    summary:''




};
let pageMethods={
    Book(N){
        this.showBooktable=true;
        if (N =='阿嬤的香甜蘋果'){
            this.selectedIndex=0;
        }
        else if (N =="阿嬤的有機香蕉"){
            this.selectedIndex=1;
        }
        else if (N =='阿嬤的沒有土味紅蘿蔔'){
            this.selectedIndex=2;
        }
        else if (N == '阿嬤的不會刺舌頭鳳梨') {
            this.selectedIndex = 3;
        }
        else if (N == '阿嬤的胖南瓜') {
            this.selectedIndex = 4;
        }
        else if (N == '阿嬤的大番茄') {
            this.selectedIndex = 5;
        }
        console.log(N);
        this.imageAlt=this.productClasses[this.selectedIndex].name;

    },
    displaySummary(){
        if (this.productClasses[this.selectedIndex].productAvailable>=this.number){
            this.productClasses[this.selectedIndex].productAvailable
             = this.productClasses[this.selectedIndex].productAvailable-this.number;

        }
        else{
            this.number = this.productClasses[this.selectedIndex].productAvailable;
            this.productClasses[this.selectedIndex].productAvailable=0;
        }
        this.summary += `${this.name} - ${this.productClasses[this.selectedIndex].name}
        ${this.number} 個。備註: ${this.note}/`;
        //判斷有沒有賣完
        
        //console.log(this.productClasses[this.selectedIndex].productAvailable);
    }

}


const App = Vue.createApp({
    data(){
        return pageData;
    },
    methods: pageMethods, 
    //computed: pageComputed,
});

App.mount('#app');