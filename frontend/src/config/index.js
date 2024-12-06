export const registerFormControls=[
    {
        name:'email',
        label:"email",
        placeholder:"enter your email ",
        componentType:"input",
        type:"email",
        unique:true
    },
    {
        name:'userName',
        label:"user Name",
        placeholder:"enter your name ",
        componentType:"input",
        type:"text",
        unique:true
    },
    {
        name:'age',
        label:"age",
        placeholder:"enter your age ",
        componentType:"input",
        type:"number",
    },
    {
        name:'password',
        label:"password",
        placeholder:"enter your password ",
        componentType:"input",
        type:"password",
    }
];

export const loginFormControls=[
    {
        name:'email',
        label:"email",
        placeholder:"enter your email ",
        componentType:"input",
        type:"email",
    },
    {
        name:'password',
        label:"password",
        placeholder:"enter your password ",
        componentType:"input",
        type:"password",
    }
];
export const addProductFromElement=[
    {
    label:'Title',
    name:'title',
    componentType:'input',
    type:'text',
    placeholder:'Enter Product Title'
    },
    {
    label:'Description',
    name:'description',
    componentType:'input',
    type:'text',
    placeholder:'Enter Product description'
    },
    {
    label:'Category',
    name:'category',
    componentType:'select',
    options:[
        {id:"men",label:'Men'},
        {id:'women',label:'Women'},
        {id:'kids',label:'Kids'},
        {id:'accessories',label:'Accessories'},
        {id:'footwear',label:'Footwear'},
        ],
    },
    {
    label:'Price',
    name:'price',
    id:'price',
    componentType:'input',
    type:'number',
    placeholder:'Enter Product price'
    },
    {
    label:'sale Price',
    name:'salePrice',
    componentType:'input',
    type:'number',
    placeholder:'Enter Product Sale Price'
    },
    {
    label:'Stock',
    name:'stock',
    componentType:'input',
    type:'number',
    placeholder:'Enter Total Stock'
    },

];
export const shopingHeaderMenuItems=[
    {id:'home',
    lable:'Home',
    path:'/shop/home'
    },
    {
        id:'men',
        lable:'Men',
        path:'/shop/list'
    },
    {
        id:'women',
        lable:'Women',
        path:'/shop/list'
    },
    {
        id:'kids',
        lable:'Kids',
        path:'/shop/list'
    },
    {
        id:'accessories',
        lable:'Accessories',
        path:'/shop/list'
    },
    {
        id:'footware',
        lable:'Footware',
        path:'/shop/list'
    },
];
export const filterOptions={
    category:[
        {
            id:'men',
            label:'Men'

        },
        {
            id:'women',
            label:'Women'
        },
        {
            id:'kids',
            label:'Kids'
        },
        {
            id:'footwear',
            label:'Footwear'
        },
    ]
}
export const sortOptions=[
    {id:"price-lowtohigh",lable:"price low to high"},
    {id:"price-hightolow",lable:"price high to low"},
    {id:"title-atoz",lable:"title A to Z"},
    {id:"title-ztoa",lable:"title Z to A"},
];
export const categoryOptionMap={
    "men":"Men",
    "women":"Women",
    "kids":"Kids",
    "footwear":"Footwear"
}
export const addressFormControls=[
    {
        label:'Address',
        name:'address',
        componentType:'input',
        type:'text',
        placeholder:'enter your address'
    },
    {
        label:'Pincode',
        name:'pincode',
        componentType:'input',
        type:'Number',
        placeholder:'enter pincode'
    },
    {
        label:'Phone',
        name:'phone',
        componentType:'input',
        type:'Number',
        placeholder:'enter your Phone Number'
    },
    {
        label:'City',
        name:'city',
        componentType:'input',
        type:'text',
        placeholder:'enter your destination'
    },
   
]

