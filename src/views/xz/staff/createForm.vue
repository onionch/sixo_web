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
                <Col span="4">
                <FormItem label="姓名:" :label-width="50">
                    <Input v-model="formItem.name" placeholder="姓名" clearable></Input>
                </FormItem>
                </Col>
                <Col span="4">
                <FormItem label="部门:" :label-width="50">
                    <Input v-model="formItem.name" placeholder="部门" clearable></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="联系电话:" :label-width="80">
                    <Input v-model="formItem.name" placeholder="联系电话" clearable></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="4">
                <FormItem label="性别:" :label-width="50">
                    <Select v-model="formItem.sex" size="large" placeholder="性别" clearable>
                        <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="职称:" :label-width="50">
                    <Select v-model="formItem.post" size="large" placeholder="职称" clearable>
                        <Option v-for="item in posts" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="最高学历:" :label-width="80">
                    <Select v-model="formItem.degree" size="large" placeholder="学历" clearable>
                        <Option v-for="item in degrees" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="7">
                <FormItem label="身份证号:" :label-width="75">
                    <Input v-model="formItem.name" placeholder="身份证号" clearable></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="身份证有效期:" :label-width="100">
                    <Row>
                        <Col span="11">
                        <FormItem prop="date">
                            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                        <FormItem prop="time">
                            <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                        </FormItem>
                        </Col>
                    </Row>
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
    props: {},
    data() {
        return {
            degrees: [
                { label: "本科", value: 0 },
                { label: "硕士", value: 1 },
                { label: "博士", value: 2 },
                { label: "专科", value: 3 }
            ],
            posts: [
                { label: "初级工程师", value: 0 },
                { label: "中级工程师", value: 1 },
                { label: "高级工程师", value: 2 }
            ],
            sexs: [{ label: "男", value: 0 }, { label: "女", value: 1 }],
            certCol: [],
            certData: [],
            formItem: {
                input: ""
            }
        };
    },
    watch: {},
    methods: {
        rowClick(row, index) {},
        rowClassName(row, index) {}
    },
    mounted() {},
    activated() {}
};
</script>
