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
                <FormItem label="资源别名:" :label-width="80">
                    <Input v-model="formItem.resName" placeholder="资源别名" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="资源描述:" :label-width="80">
                    <Input v-model="formItem.resDesc" placeholder="资源别名" clearable></Input>
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
