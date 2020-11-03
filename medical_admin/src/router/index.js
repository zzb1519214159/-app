import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //使用vue-router这个第三方插件
const routes = [{ //我们要求这个路由的配置要放在路由表的最上方 //每一个对象就是一个路由
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/view/login'),
        meta: {
            title: ['登录']
        },
    },
    {
        path: '/homeIndex',
        name: 'homeIndex',
        redirect: '/patient/management',
        component: () =>
            import ('@/view/homeIndex'),
        children: [{
                path: '/patient',
                // redirect: '/patient/management',
                //   component: { // 这时路由页面正常显示, 但这时会嵌套一层router-view; 如果把component注释掉, 页面就空了
                //       render: h => h('router-view')
                //   },
                component: () =>
                    import ('@/view/patient'),
                meta: {
                    title: ['患者管理']
                },
                children: [{
                    path: 'management',
                    redirect: 'management/list',
                    component: () =>
                        import ('@/view/patient/management'),
                    children: [{
                            path: 'list',
                            name: 'managementList',
                            component: () =>
                                import ('@/view/patient/management/list'),
                            meta: {
                                title: ['患者管理', '录入患者']
                            },
                        },
                        {
                            path: 'addManagement',
                            name: 'addManagement',
                            component: () =>
                                import ('@/view/patient/management/addManagement'),
                            meta: {
                                title: ['患者管理', '录入患者', '新增患者']
                            },
                        },
                        {
                            path: 'particulars',
                            name: 'managementParticulars',
                            component: () =>
                                import ('@/view/patient/management/particulars'),
                            meta: {
                                title: ['患者管理', '录入患者', '患者详情']
                            },
                        },
                        {
                            path: 'follow',
                            name: 'follow',
                            component: () =>
                                import ('@/view/patient/management/follow'),
                            meta: {
                                title: ['患者管理', '录入患者', '随访']
                            },
                        }
                    ]
                }, {
                    path: 'register',
                    redirect: 'register/list',
                    component: () =>
                        import ('@/view/patient/register'),
                    children: [{
                        path: 'list',
                        name: 'registerList',
                        component: () =>
                            import ('@/view/patient/register/list'),
                        meta: {
                            title: ['患者管理', '注册用户']
                        },
                    }, {
                        path: 'particulars',
                        name: 'registerParticulars',
                        component: () =>
                            import ('@/view/patient/register/particulars'),
                        meta: {
                            title: ['患者管理', '注册用户', '查看详情']
                        },
                    }, ]
                }, {
                    path: 'disease',
                    redirect: 'disease/list',
                    component: () =>
                        import ('@/view/patient/disease'),
                    children: [{
                        path: 'list',
                        name: 'diseaseList',
                        component: () =>
                            import ('@/view/patient/disease/list'),
                        meta: {
                            title: ['患者管理', '患者病程管理']
                        },
                    }]
                }]
            },
            {
                path: '/doctor',
                component: () =>
                    import ('@/view/doctor'),
                meta: {
                    title: ['医生管理']
                },
                children: [{
                    path: 'entire',
                    redirect: 'entire/list',
                    component: () =>
                        import ('@/view/doctor/entire'),
                    children: [{
                        path: 'list',
                        name: 'entireList',
                        component: () =>
                            import ('@/view/doctor/entire/list'),
                        meta: {
                            title: ['医生管理', '全部医生']
                        },
                    }, {
                        path: 'addEntire',
                        name: 'addEntire',
                        component: () =>
                            import ('@/view/doctor/entire/addEntire'),
                        meta: {
                            title: ['医生管理', '全部医生', ' 新增编辑']
                        },
                    }]
                }, {
                    path: 'advice',
                    redirect: 'advice/list',
                    component: () =>
                        import ('@/view/doctor/advice'),
                    children: [{
                        path: 'list',
                        name: 'adviceList',
                        component: () =>
                            import ('@/view/doctor/advice/list'),
                        meta: {
                            title: ['医生管理', '医嘱记录']
                        },
                    }]
                }, {
                    path: 'earning',
                    redirect: 'earning/list',
                    component: () =>
                        import ('@/view/doctor/earning'),
                    children: [{
                        path: 'list',
                        name: 'list',
                        component: () =>
                            import ('@/view/doctor/earning/list'),
                        meta: {
                            title: ['医生管理', '医生收入管理']
                        },
                    }]
                }, ]

            }, {
                path: '/basics',
                name: 'basics',
                component: () =>
                    import ('@/view/basics'),
                meta: {
                    title: ['基础管理']
                },
                children: [{
                    path: 'hospital',
                    name: 'hospital',
                    redirect: 'hospital/list',
                    component: () =>
                        import ('@/view/basics/hospital'),
                    children: [{
                        path: 'list',
                        name: 'hospitalList',
                        component: () =>
                            import ('@/view/basics/hospital/list'),
                        meta: {
                            title: ['基础管理', '医院管理']
                        },
                    }, {
                        path: 'addHospital',
                        name: 'addHospital',
                        component: () =>
                            import ('@/view/basics/hospital/addHospital'),
                        meta: {
                            title: ['基础管理', '医院管理', '新增医院']
                        },
                    }, {
                        path: 'addOffice',
                        name: 'addOffice',
                        component: () =>
                            import ('@/view/basics/hospital/addOffice'),
                        meta: {
                            title: ['基础管理', '医院管理', ' 添加科室']
                        },
                    }]
                }, {
                    path: 'office',
                    name: 'office',
                    redirect: 'office/list',
                    component: () =>
                        import ('@/view/basics/office'),
                    children: [{
                        path: 'list',
                        name: 'officeList',
                        component: () =>
                            import ('@/view/basics/office/list'),
                        meta: {
                            title: ['基础管理', ' 科室管理']
                        },
                    }, {
                        path: 'sickness',
                        name: 'sickness',
                        component: () =>
                            import ('@/view/basics/office/sickness'),
                        meta: {
                            title: ['基础管理', ' 科室管理', '关联疾病']
                        },
                    }, {
                        path: 'drug',
                        name: 'drug',
                        component: () =>
                            import ('@/view/basics/office/drug'),
                        meta: {
                            title: ['基础管理', ' 科室管理', '关联药品']
                        },
                    }]
                }, {
                    path: 'remedy',
                    name: 'remedy',
                    redirect: 'remedy/list',
                    component: () =>
                        import ('@/view/basics/remedy'),
                    children: [{
                        path: 'list',
                        name: 'remedyList',
                        component: () =>
                            import ('@/view/basics/remedy/list'),
                        meta: {
                            title: ['基础管理', ' 药品管理']
                        },
                    }, {
                        path: 'addRemdy',
                        name: 'addRemdy',
                        component: () =>
                            import ('@/view/basics/remedy/addRemdy'),
                        meta: {
                            title: ['基础管理', ' 药品管理', "新增药品"]
                        },
                    }]
                }, {
                    path: 'illness',
                    name: 'illness',
                    redirect: 'illness/list',
                    component: () =>
                        import ('@/view/basics/illness'),
                    children: [{
                        path: 'list',
                        name: 'illnessList',
                        component: () =>
                            import ('@/view/basics/illness/list'),
                        meta: {
                            title: ['基础管理', ' 疾病管理']
                        },
                    }]
                }, ]
            }, {
                path: '/operation',
                component: () =>
                    import ('@/view/operation'),
                meta: {
                    title: ['运营管理']
                },
                children: [{
                    path: 'video',
                    name: 'video',
                    redirect: "video/list",
                    component: () =>
                        import ('@/view/operation/video'),
                    children: [{
                        path: 'list',
                        name: 'videoList',
                        component: () =>
                            import ('@/view/operation/video/list'),
                        meta: {
                            title: ['运营管理', '视频管理']
                        },
                    }, {
                        path: 'addVideo',
                        name: 'addVideo',
                        component: () =>
                            import ('@/view/operation/video/addVideo'),
                        meta: {
                            title: ['运营管理', '视频管理', '新增视频']
                        },
                    }]
                }]
            }, {
                path: '/system',
                component: () =>
                    import ('@/view/system'),
                children: [{
                    path: 'systemAnd',
                    name: 'systemAnd',
                    component: () =>
                        import ('@/view/system/systemAnd'),
                    meta: {
                        title: ['系统管理', '角色管理']
                    },
                }, {
                    path: 'user',
                    name: 'user',
                    component: () =>
                        import ('@/view/system/user'),
                    meta: {
                        title: ['系统管理', '系统用户管理']
                    },
                }, {
                    path: 'operation',
                    name: 'systemOperation',
                    component: () =>
                        import ('@/view/system/operation'),
                    meta: {
                        title: ['系统管理', '操作日志']
                    },
                }]
            },
        ]
    },
    //这个就是错误路由匹配， vue规定这个必须放在最下面，它必须将上面的路由全找一遍，找不到才用当前这个
    {   
        path: '*', // 404 页面
        name: 'error',
             component: () =>
            import ('@com/error') // 或者使用component也可以的
    },
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes //路由表  必写的
})
router.beforeEach((to, from, next) => {
        //   console.log(to) // 到哪个页面去？
        //   console.log(from) // 从哪个页面来？
        //   next() // 一个回调函数
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            //   document.title = to.meta.title[to.meta.title.length - 1] || '后台管理平台'
            //暂时写死   
            document.title = '后台管理平台'
        }
        next()
    })
    // / 路由拦截器
    // router.beforeEach(async (to, from, next) => {
    //   if (to.matched.some(record => record.meta.auth) && to.meta.auth) { // 判断该路由是否需要登录权限
    //     let token = localStorage.getItem('token');
    //     if (token) { // 获取当前的 token 是否存在
    //       next()
    //     } else {
    //       // 不存在 token，需要重新认证
    //       next({
    //         path: '/auth/login',
    //         query: {
    //           redirect: to.fullPath
    //         }
    //       })
    //     }
    //   }
    //   next();
    // });
export default router