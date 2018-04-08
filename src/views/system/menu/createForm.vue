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
        <Form ref="formItem" :model="formItem" :label-width="60">
                <Row>
                    <Col span="16" offset="4">
                    <FormItem label="菜单名" prop="menuName">
                        <Input v-model="formItem.menuName"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16" offset="4">
                    <FormItem label="访问路径" prop="url">
                        <Input v-model="formItem.url"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16" offset="4">
                    <FormItem label="权限值" prop="access">
                        <InputNumber :max="999" :min="0" v-model="formItem.access" placeholder="权限值"></InputNumber>
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
                        var data = res.data.data;
                        for (var index in data) {
                            this.roles.push({
                                value: data[index]["id"],
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
