<style lang="less">
.content {
    height: 400px;
}
.top .title {
    font-size: 24px;
    font-weight: bold;
    color: #505050;
    line-height: 70px;
}
em {
    font-style: normal;
    width: 98px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #585858;
}
.item {
    font-size: 14px;
    color: #1d1d1d;
    line-height: 30px;
}
.cert-info {
    margin-top: 25px;
}
.base-info {
}

.info-h {
    color: rgb(102, 102, 102);
    padding: 0px 0px 17px;
    font: bold 24px/26px;
}
</style>

<template>
    <div>
        <Form ref="formItem" :model="formItem" :label-width="50">
                <Row>
                    <Col span="16" >
                    <FormItem label="用户名" prop="userName">
                        <Input v-model="formItem.userName"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <FormItem label="姓名" prop="realName">
                        <Input v-model="formItem.realName"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <FormItem label="密码" prop="userPassword">
                        <Input v-model="formItem.userPassword"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <FormItem label="角色" prop="userRole">
                        <Select v-model="formItem.roleSerialNum" clearable>
                            <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <FormItem label="邮箱" prop="mailAddr">
                        <Input v-model="formItem.mailAddr"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <FormItem label="电话" prop="phoneNum">
                        <Input v-model="formItem.phoneNum"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
    </div>
</template>

<script>
import util from "../../../libs/util.js";
export default {
    name: "createForm",
    components: {},
    props: {
        formItem: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            roles: []
        };
    },
    watch: {},
    methods: {
        roleList() {
            util.ajax
                .get("/roles")
                .then(res => {
                    if (res.data.code == 200) {
                        var data = res.data.data.list;
                        for (var index in data) {
                            this.roles.push({
                                value: data[index]["serialNum"],
                                label: data[index]["roleDesc"]
                            });
                        }
                    } else {
                        this.$Message.info("角色获取失败!");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.roleList();
    },
    activated() {}
};
</script>
