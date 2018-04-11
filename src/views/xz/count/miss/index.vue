<style lang="less">
@import "../../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <Form ref="searchForm" :model="searchForm" :label-width="80">
                    <Row :gutter="24">
                        <Col span="6">
                            <FormItem label="开始时间">
                                <DatePicker type="datetime" placeholder="选择开始时间" :editable="false" v-model="searchForm.start_time" style="width:100%;" format="yyyy-MM-dd HH:mm:ss" :clearable="false"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="结束时间">
                                <DatePicker type="datetime" placeholder="选择结束时间" :editable="false" v-model="searchForm.end_time" style="width:100%;" format="yyyy-MM-dd HH:mm:ss" :clearable="false"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="24">
                        <Col span="6">
                            <FormItem label="统计类型">
                                <Select v-model="searchForm.category" clearable>
                                    <Option v-for="item in countTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="4" offset="2">
                            <Button type="info" long icon="plus-round" size="large">查询</Button>
                        </Col>
                    </Row>
                </form>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <div v-show="searchForm.category==1">
                    <Row :gutter="24">
                        <Col span="12">
                            <Table stripe :columns="col1" :data="data1"></Table>                        
                        </Col>
                        <Col span="12">
                            <Table stripe :columns="col2" :data="data2"></Table>                        
                        </Col>
                    </Row>
                </div>
                <div v-show="searchForm.category==2">
                    <Row>
                        <Table stripe :columns="col3" :data="data3"></Table>
                    </Row>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
export default {
    name: "count",
    components: {},
    data() {
        return {
            searchForm: {
                category:1
            },
            countTypes: [
                { label: "全部", value: 1 },
                { label: "部门", value: 2 }
            ],
            col1:[
                {
                    title: "缺证部门总数",
                    key: "category"
                },
                {
                    title: "缺证部门占比",
                    key: "numbers"
                },
                {
                    title: "缺证岗位总数",
                    key: "staff_pie"
                },
                {
                    title: "缺证岗位占比",
                    key: "cert_pie"
                },
                {
                    title: "缺证总数",
                    key: "total"
                }
            ],
            data1:[
            ],
            col2:[
                {
                    title: "证书类型",
                    key: "category"
                },
                {
                    title: "缺证数量",
                    key: "numbers"
                }
            ],
            data2:[
            ],
            col3:[
                {
                    title: "部门",
                    key: "position_name"
                },
                {
                    title: "缺证数量",
                    key: "numbers"
                }
            ],
            data3:[]
        };
    },
    mounted(){
        
    }
};
</script>