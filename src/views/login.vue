<style lang="less">
@import "./login.less";

</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-header">
            <Row type="flex">
                <Col span="10">
                <div style="margin-top:2%;">
                    <a href="#" class="logo"></a>
                    <div class="login-middle-card-title">
                        川西钻探公司持证管理系统
                    </div>
                </div>
                </Col>
            </Row>
        </div>
        <div class="login-middle">
            <div class="login-con">
                <Card class="login-middle-card">
                    <p slot="title">
                        欢迎登录
                    </p>
                    <div class="form-con">
                        <Form ref="loginForm" :model="form" :rules="rules">
                            <FormItem prop="userName">
                                <Row>
                                    <Col span="18" offset="3">
                                    <Input v-model="form.userName" size="large" placeholder="请输入用户名" clearable>
                                    <span slot="prepend">
                                        <Icon :size="16" type="person"></Icon>
                                    </span>
                                    </Input>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem prop="password">
                                <Row>
                                    <Col span="18" offset="3">
                                    <Input type="password" v-model="form.password" size="large" placeholder="请输入密码" clearable>
                                    <span slot="prepend">
                                        <Icon :size="14" type="locked"></Icon>
                                    </span>
                                    </Input>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span="18" offset="3">
                                    <Button @click="handleSubmit" type="success" size="large" long>登录</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
        <div class="login-footer">
            通讯地址：四川省成都市泰安街1号川庆钻探工程有限公司人事处干部流动科
        </div>
    </div>
</template>

<script>
import util from "../libs/util.js";
import Cookies from "js-cookie";
export default {
    data() {
        return {
            form: {
                userName: "admin",
                password: "admin"
            },
            rules: {
                userName: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        verifyLogin() {
            var params = {};
            params["username"] = this.form.userName;
            params["password"] = this.form.password;
            // util.ajax.post('/tokens', params).then(rsp => {
            //     if (rsp.data.code == 200) {
            Cookies.set("user", this.form.userName);
            //         Cookies.set('token', rsp.data.data.token);
            //         Cookies.set('uId', rsp.data.data.uId);
            //         this.$store.commit('setAvator', '');
            //         this.menuList();
            //     } else {
            //         this.$Message.error('账户校验失败,请检查后重新输入!');
            //     }
            // });
            this.$router.push({
                name: "home_index"
            });
        },
        handleSubmit() {
            var that = this;
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    that.verifyLogin();
                }
            });
        },
        menuList() {
            // util.ajax
            //     .get('/menuList/' + this.form.userName)
            //     .then(res => {
            //         if (res.data.code == 200) {
            //             var data = res.data.data;
            //             var authMenu = [];
            //             for (var index in data) {
            //                 authMenu.push(data[index]['url']);
            //             }
            //             Cookies.set('authMenu', authMenu);
            //             this.$router.push({
            //                 name: 'home_index'
            //             });
            //         } else {
            //             this.$Message.error('菜单拉取失败');
            //         }
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
        }
    }
};
</script>

<style>

</style>
