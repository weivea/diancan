/**
 * Created by weijianli on 14/11/3.
 */
//餐馆后台通信

//1.初始请求(初始化有多少张桌子)，，
var request={
    type:'init-table'
};
var back=[
    {
        groupId:'xxx',
        groupName:'xxx',
        tables:[
        {tableID:'xxx',tableNum:'xxx'},//tableID为唯一编号，tableNum为设置编号(餐馆设置)
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'}
        ]
    },
    {
        groupId:'xxx',
        groupName:'xxx',
        tables:[
        {tableID:'xxx',tableNum:'xxx'},//tableID为唯一编号，tableNum为设置编号(餐馆设置)
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'}
        ]
    },
    {
        groupId:'xxx',
        groupName:'xxx',
        tables:[
        {tableID:'xxx',tableNum:'xxx'},//tableID为唯一编号，tableNum为设置编号(餐馆设置)
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'},
            {tableID:'xxx',tableNum:'xxx'}
        ]
    }
];
//2.轮询请求
var request={
    type:'ask-state'
};
var back=[
    'tableID',//需要更新状态的tableID
    'tableID',
    'tableID',
    'tableID',
    'tableID',
    'tableID'
];
//3.餐桌具体信息请求
var request={
    type:'ask-detail',
    tableID:'xxx'
};
var back={
    menus:[//看到了，这里有三个，相当于点了三次，
        {
            markinfo:'暂定时间戳（提交点餐时的））',
            menu:[
                {title:'鸡翅膀',num:2},
                {title:'鸭翅膀',num:2},
                {title:'鸟翅膀',num:2},
                {title:'狗头',num:2},
                {title:'鸡翅膀',num:2},
                {title:'鸡翅膀',num:2}
            ],
            sub_price:'上面菜品的总价',
            theId:'xxx',//该子菜单唯一标识
            is_printed:false//是否被打印过，
        },
        {
            markinfo:'暂定时间戳（提交点餐时的））',
            menu:[
                {title:'鸡翅膀',num:2},
                {title:'鸭翅膀',num:2},
                {title:'鸟翅膀',num:2},
                {title:'狗头',num:2},
                {title:'鸡翅膀',num:2},
                {title:'鸡翅膀',num:2}
            ],
            sub_price:'上面菜品的总价',
            theId:'xxx',//该子菜单唯一标识
            is_printed:false//是否被打印过，
        },
        {
            markinfo:'暂定时间戳（提交点餐时的））',
            menu:[
                {title:'鸡翅膀',num:2},
                {title:'鸭翅膀',num:2},
                {title:'鸟翅膀',num:2},
                {title:'狗头',num:2},
                {title:'鸡翅膀',num:2},
                {title:'鸡翅膀',num:2}
            ],
            sub_price:'上面菜品的总价',
            theId:'xxx',//该子菜单唯一标识
            is_printed:false//是否被打印过，
        }
    ],
    all_price:'所有点菜的总价钱',
    message:[//（点餐用户发起的临时消息，如呼叫，各类临时服务描述）后台只发新鲜消息给前台，发送过的不在发送
        '消息描述',
        'lallaalalal',
        'lallaalalal',
        'lallaalalal',
        'lallaalalal',
        'lallaalalal'
    ]
};
//4.操作请求
var request={
    type:'o-c-table',//开关桌
    tableID:'xxx'
};
var back={
    state:'yes or no'
};
//、、、、、、、、
var request={
    type:'menu-printed',//告诉主机该菜单已打印
    theId:'xxx'
};
var back={
    state:'OK'
};

//设置界面通信//////////////////
//菜单数据结构
var menudata = [
    {
        grunpName:'比如荤菜',
        grunpId:'zzz',
        grunpMenu:[
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'}
        ]
    },
    {
        grunpName:'比如蔬菜',
        grunpId:'zzz',
        grunpMenu:[
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'}
        ]
    },
    {
        grunpName:'小吃',
        grunpId:'zzz',
        grunpMenu:[
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'},
            {price:28,theName:'xxx',theId:'xxx'}
        ]
    }
];

//菜单设置界面///////////////////////////////////////////////////////////////
//1,添加菜单
//a:在现有组添加菜名
var postdata =[
    {"grunpId":"zzz","data":{"price":"83","theName":"猪肉","theId":"add"}},
    {"grunpId":"zzz","data":{"price":"33","theName":"肌肉","theId":"add"}}
];
//b:添加新组，新组中的菜单
var postdata = [
    {
        "grunpName":"新添加组名",
        "grunpId":"add",
        "grunpMenu":[
            {"price":"23","theName":"新添加组下的菜名","theId":"add"},
            {"price":"32","theName":"新添加组下的菜名2","theId":"add"}
        ]
    },
    {
        "grunpName":"新添加组名2",
        "grunpId":"add",
        "grunpMenu":[
            {"price":"12","theName":"新添加组下的菜名","theId":"add"},
            {"price":"34","theName":"新添加组下的菜名2","theId":"add"}
        ]
    }
];

//2,修改菜单
//a.修改组名
var postdata = [
    {"grunpId":"zzz","grunpName":"比如dsdsd"},
    {"grunpId":"zzz","grunpName":"比如蔬菜ddd"}
];
//b.修改菜单名
var postdata = [
    {"grunpId":"zzz","data":{"price":28,"theName":"修改1","theId":"xxx"}},
    {"grunpId":"zzz","data":{"price":28,"theName":"修改2","theId":"xxx"}}
];
//3,删除菜单
//a.删除组
var postdata = [{"groupId":"zzz"},{"groupId":"zzz"}];//Id数组
//b.删除组内菜单
var postdata = [
    {"groupId":"zzz","theId":"xxx"},
    {"groupId":"zzz","theId":"xxx"}
];



//餐桌设置界面///////////////////////////////////////////////////////////////
//1,添加餐桌
//a:在现有组添加餐桌
var postdata1 = [
    {"grunpId":"aaa","data":{"theName":"dewer"}},
    {"grunpId":"sss","data":{"theName":"lkjhjhjk"}}
];
//b.添加新组，新组中的餐桌
var postdata = [
    {
        "grunpName":"新加组",
        "grunpId":"add",
        "grunpMenu":[
            {"theName":"新加组新餐桌"},
            {"theName":"新加组新餐桌2"}
            //........
        ]
    }
];
////2,修改餐桌
//a.修改组名
var postdata = [
    {"grunpId":"aaa","grunpName":"大房间修改1"},
    {"grunpId":"sss","grunpName":"小房间修改2"}
];
//b.修改餐桌名
var postdata = [
    {"grunpId":"sss","data":{"theName":"xdgdfgxx修改","theId":"xxx"}},
    {"grunpId":"aaa","data":{"theName":"xssdxx修改","theId":"xxx"}}
];
//3,删除菜单
//a.删除组
var postdata = [{"groupId":"zzz"},{"groupId":"zzz"}];//Id数组
//b.删除组内菜单
var postdata = [
    {"groupId":"zzz","theId":"xxx"},
    {"groupId":"zzz","theId":"xxx"}
];