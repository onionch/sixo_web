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
        <Form :model="formItem">
            <Row>
                <Col span="6">
                <FormItem label="角色:" :label-width="40">
                    <Select v-model="formItem.roleId" clearable>
                        <Option v-for="item in roles" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="资源:" :label-width="40">
                    <Select v-model="formItem.resId" clearable>
                        <Option v-for="item in resources" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                <FormItem label="允许的操作:" :label-width="80">
                    <Select v-model="formItem.operator" clearable multiple>
                        <Option v-for="item in operators" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
                return {
                    operator: []
                };
            }
        }
    },
    data() {
        return {
            roles: [],
            resources: [],
            operators: [
                { value: "get", label: "查询" },
                { value: "post", label: "新增" },
                { value: "put", label: "更新" },
                { value: "delete", label: "删除" }
            ],
            roleSelect: ""
        };
    },
    watch: {},
    methods: {
        roleList() {
            util.ajax
                .get("/role")
                .then(res => {
                    if (res.data.code == 200) {
                        var data = res.data.data;
                        for (var index in data) {
                            this.roles.push({
                                value: data[index]["id"],
                                label: data[index]["roleDesc"]
                            });
                        }
                    }else{
                        this.$Message.error("角色拉取失败");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        resourceList() {
            util.ajax
                .get("/resource")
                .then(res => {
                    if (res.data.code == 200) {
                        var data = res.data.data;
                        for (var index in data) {
                            this.resources.push({
                                value: data[index]["id"],
                                label: data[index]["resDesc"]
                            });
                        }
                    } else {
                        this.$Message.error("资源拉取失败");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.roleList();
        this.resourceList();
    },
    activated() {}
};
</script>
