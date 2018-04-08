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
                    <FormItem label="标题" prop="title">
                        <Input v-model="formItem.title"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <FormItem label="内容" prop="text">
                        <Input v-model="formItem.text"></Input>
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
        
    },
    mounted() {
        
    },
    activated() {}
};
</script>
