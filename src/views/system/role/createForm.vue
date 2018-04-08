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
                <FormItem label="角色名:" :label-width="80">
                    <Input v-model="formItem.roleName" placeholder="角色名" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="角色描述:" :label-width="80">
                    <Input v-model="formItem.roleDesc" placeholder="角色描述" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="菜单权值:" :label-width="80">
                    <InputNumber :max="999" :min="0" v-model="formItem.access" placeholder="菜单权值"></InputNumber>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
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
        };
    },
    watch: {},
    methods: {
    },
    mounted() {},
    activated() {}
};
</script>
