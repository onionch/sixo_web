import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '川西钻探公司持证管理系统'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: resolve => {
                require(['@/views/own-space/own-space.vue'], resolve);
            }
        }, {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: resolve => {
                require(['@/views/message/message.vue'], resolve);
            }
        },
        {
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: resolve => {
                require(['@/views/home/home.vue'], resolve);
            }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/base',
        icon: 'briefcase',
        title: '证书管理',
        name: 'staff',
        component: Main,
        children: [
            {
                path: 'category',
                title: '证书类型',
                name: 'base_cert_diy',
                component: resolve => {
                    require(['@/views/xz/cert/category/index.vue'], resolve);
                }
            },
            {
                path: 'cert',
                title: '证书列表',
                name: 'base_cert_list',
                component: resolve => {
                    require(['@/views/xz/cert/list/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/organ',
        icon: 'briefcase',
        title: '人员组织',
        name: 'organ',
        component: Main,
        children: [
            {
                path: 'staff',
                title: '员工管理',
                name: 'organ_staff',
                component: resolve => {
                    require(['@/views/xz/staff/index.vue'], resolve);
                }
            },
            {
                path: 'organ',
                title: '组织机构',
                name: 'organ_management',
                component: resolve => {
                    require(['@/views/organ/manage.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/count',
        icon: 'briefcase',
        title: '证书统计',
        name: 'count',
        component: Main,
        children: [
            {
                path: 'own',
                title: '持证统计',
                name: 'count_own',
                component: resolve => {
                    require(['@/views/xz/count/own/index.vue'], resolve);
                }
            },
            {
                path: 'miss',
                title: '缺证统计',
                name: 'count_miss',
                component: resolve => {
                    require(['@/views/xz/count/miss/index.vue'], resolve);
                }
            }
        ]
    }
    , {
        path: '/system',
        icon: 'gear-b',
        title: '系统设置',
        name: 'system',
        component: Main,
        children: [
            {
                path: 'user',
                title: '用户管理',
                name: 'system_user',
                component: resolve => {
                    require(['@/views/system/user/index.vue'], resolve);
                }
            }, {
                path: 'role',
                title: '角色管理',
                name: 'system_role',
                component: resolve => {
                    require(['@/views/system/role/index.vue'], resolve);
                }
            }, {
                path: 'function',
                title: '权限管理',
                name: 'system_function',
                component: resolve => {
                    require(['@/views/system/function/index.vue'], resolve);
                }
            },
            {
                path: 'organ',
                title: '部门管理',
                name: 'system_organ',
                component: resolve => {
                    require(['@/views/system/organ/index.vue'], resolve);
                }
            }, 
            {
                path: 'menu',
                title: '菜单管理',
                name: 'system_menu',
                component: resolve => {
                    require(['@/views/system/menu/index.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter, otherRouter, locking, ...appRouter,
    page500,
    page403,
    page404
];
