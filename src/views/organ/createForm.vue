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
                <FormItem label="简称:" :label-width="80">
                    <Input v-model="formItem.shortName" placeholder="简称" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="全称:" :label-width="80">
                    <Input v-model="formItem.fullName" placeholder="全称" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="所属分部:" :label-width="80">
                    <Input v-model="formItem.belongPart" placeholder="所属分部" clearable></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <FormItem label="上级部门:" :label-width="80">
                    <Input v-model="formItem.fatherDepartment" placeholder="上级部门" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="协办人:" :label-width="80">
                    <Input v-model="formItem.principal" placeholder="协办人" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="负责人:" :label-width="80">
                    <Input v-model="formItem.leader" placeholder="负责人" clearable></Input>
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
