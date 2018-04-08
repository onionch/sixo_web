<style lang="less">
@import "../../../styles/common.less";

.amap-wrapper {
    //   width: 100%;
    height: 500px;
}
.tip {
    // background-color: #fff;
    padding: 0 10px;
    // border: 1px solid silver;
    // box-shadow: 3px 4px 3px 0px silver;
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: 5px;
    border-radius: 3px;
    line-height: 36px;
}
</style>

<template>
    <div>
        <Row>
            <Card>
                <Row :gutter="24">
                    <Col span="3">
                    <!-- <Input v-model="searchForm.geofence" placeholder="围栏查询" size="large">
                    <Button slot="append" type="primary" icon="ios-search" @click="btnClick"></Button>
                    </Input> -->
                    <Button type="info" long @click="startMap" icon="ionic" size="large">启动地图</Button>
                    </Col>
                    <Col span="3" offset="18">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加围栏</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="24">
            <Table highlight-row border :height=400 :columns="userCol" :data="userData"></Table>
            <div style="margin: 10px;overflow: hidden">
                <Row>
                    <Col span="6">
                    <span>当前第{{currentPage}}页(总共{{totalPage}}页)，每页显示20条记录</span>
                    </Col>
                    <Col span="4" offset="14">
                    <ButtonGroup shape="circle">
                        <Button type="ghost" @click="lastPage">
                            <Icon type="chevron-left"></Icon>
                            上一页
                        </Button>
                        <Button type="ghost" @click="nextPage">
                            下一页
                            <Icon type="chevron-right"></Icon>
                        </Button>
                    </ButtonGroup>
                    </Col>
                </Row>
            </div>
            </Col>
        </Row>
        <Modal v-model="showCreateForm" width="900" height="600" :styles="{top: '20px'}" @on-ok="ok" @on-cancel="cancel">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="information-circled"></Icon>
                <span>{{ modalTitle }}</span>
            </p>
            <Row>
                <Col span="5">
                <Form ref="formItem" :model="formItem">
                    <Row>
                        <Col span="24">
                        <FormItem label="围栏名称:" prop="name">
                            <Input v-model="formItem.name"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                        <FormItem label="圆形围栏中心点:" prop="center">
                            <Input v-model="formItem.center" :disabled="circleDisabled"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                        <FormItem label="圆形围栏半径:" prop="radius">
                            <Input v-model="formItem.radius" :disabled="circleDisabled"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                        <FormItem label="多边形围栏坐标点:" prop="points">
                            <Input v-model="formItem.points" :disabled="!circleDisabled"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <!-- <Row>
                            <Col span="24">
                            <FormItem label="围栏监控状态:" prop="enable">
                                <Input v-model="formItem.enable"></Input>
                            </FormItem>
                            </Col>
                        </Row> -->
                    <Row>
                        <Col span="24">
                        <FormItem label="过期日期:" prop="valid_time">
                            <DatePicker type="date" format="yyyy-MM-dd" @on-change="timerPicker" v-model="formItem.valid_time" placeholder="Select date"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
                    <!-- <Row>
                            <Col span="24">
                            <FormItem label="一周监控日期的重复模式:" prop="repeat">
                                <Input v-model="formItem.repeat"></Input>
                            </FormItem>
                            </Col>
                        </Row> -->
                    <!-- <Row>
                            <Col span="24">
                            <FormItem label="指定日期列表:" prop="fixed_date">
                                <TimePicker  @on-change="timerPicker"  type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                            </FormItem>
                            </Col>
                        </Row> -->
                    <!-- <Row>
                            <Col span="24">
                            <FormItem label="一天内围栏监控时段:" prop="time">
                                <Input v-model="formItem.time"></Input>
                            </FormItem>
                            </Col>
                        </Row> -->
                    <Row>
                        <Col span="24">
                        <FormItem label="围栏描述信息:" prop="desc">
                            <Input v-model="formItem.desc"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <!-- <Row>
                            <Col span="24">
                            <FormItem label="配置触发围栏所需动作:" prop="alert_condition">
                                <Input v-model="formItem.alert_condition"></Input>
                            </FormItem>
                            </Col>
                        </Row> -->
                </Form>
                </Col>
                <Col span="18" offset="1">
                <div class="amap-wrapper" id="amap_id">
                </div>
                <div class="tip">
                    <Button type="info" @click="drawCircle">配置圆形围栏</Button>
                    <Button type="success" @click="drawPolygon">配置多边形围栏</Button>
                </div>
                <!-- <div class="tip">
                        省： <Select v-model="selectedProvince" style="width:100px" @on-change="search('province')">
                                <Option v-for="item in provinces" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        市： <Select v-model="selectedCity" style="width:100px" @on-change="search('city')">
                                <Option v-for="item in citys" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        区： <Select v-model="selectedDistrict" style="width:100px" @on-change="search('district')">
                                <Option v-for="item in districts" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        街道：<Select v-model="selectedStreet" style="width:100px" @on-change="search('street')">
                                <Option v-for="item in streets" :value="item.value" :key="item.value">{{ item.label }}</Option>
                             </Select>
                    </div> -->
                </Col>
            </Row>
        </Modal>

        <Modal v-model="showMapForm" width="900" height="600" :styles="{top: '20px'}" @on-ok="ok" @on-cancel="cancel">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="information-circled"></Icon>
                <span>{{ mapTitle }}</span>
            </p>
            <Row>
                <Col span="6">
                <Input v-model="searchForm.gps" placeholder="gps" clearable></Input>
                </Col>
                <Col span="6" offset="1">
                <Button type="info" @click="checkPoints">检测GPS</Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <div class="amap-wrapper" id="amap_show_id">
                </div>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
import util from "../../../libs/util.js";
import AMap from "AMap";

export default {
    name: "user",
    components: {},
    data() {
        return {
            showMapForm: false,
            mapTitle: "当前围栏信息",
            selectedProvince: "",
            selectedCity: "",
            selectedDistrict: "",
            selectedStreet: "",
            searchForm: {
                gps:"",
            },
            userCol: [
                {
                    type: "index",
                    width: 60,
                    align: "center",
                    fixed: "left"
                },
                {
                    title: "名称",
                    key: "name",
                    width: 100,
                    fixed: "left"
                },
                // {
                //     title: "所在地区",
                //     width: 100,
                //     key: "adcode"
                // },
                // {
                //     title: "监控触发条件",
                //     width: 100,
                //     key: "alert_condition"
                // },
                {
                    title: "圆形围栏中心点",
                    width: 200,
                    key: "center"
                },
                {
                    title: "创建时间",
                    width: 150,
                    key: "create_time"
                },
                {
                    title: "激活状态",
                    width: 100,
                    key: "enable"
                },
                // {
                //     title: "指定日期",
                //     width: 100,
                //     key: "fixed_date"
                // },
                // {
                //     title: "全局id",
                //     width: 100,
                //     key: "gid"
                // },
                // {
                //     title: "围栏id",
                //     width: 100,
                //     key: "id"
                // },
                // {
                //     title: "开发者key",
                //     width: 100,
                //     key: "key"
                // },
                {
                    title: "多边形围栏点",
                    width: 150,
                    key: "points",
                    render: (h, params) => {
                        var points = params.row.points;
                        var pointsList = points.split(";");
                        return h(
                            "Poptip",
                            {
                                props: {
                                    trigger: "hover",
                                    title: "GPS围栏点",
                                    placement: "bottom"
                                }
                            },
                            [
                                h("Tag", "GPS围栏点"),
                                h(
                                    "div",
                                    {
                                        slot: "content"
                                    },
                                    [
                                        h(
                                            "ul",
                                            (function() {
                                                var liList = [];
                                                for (var id in pointsList) {
                                                    liList.push(
                                                        h(
                                                            "li",
                                                            {
                                                                style: {
                                                                    textAlign:
                                                                        "left",
                                                                    padding:
                                                                        "4px"
                                                                }
                                                            },
                                                            pointsList[id]
                                                        )
                                                    );
                                                }
                                                return liList;
                                            })()
                                        )
                                    ]
                                )
                            ]
                        );
                    }
                },
                {
                    title: "圆形围栏半径",
                    width: 100,
                    key: "radius"
                },
                {
                    title: "围栏监控重复星期",
                    width: 200,
                    key: "repeat"
                },
                {
                    title: "监控时段",
                    width: 200,
                    key: "time"
                },
                {
                    title: "过期日期",
                    width: 100,
                    key: "valid_time"
                },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    fixed: "right",
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.showUpdateFrom(params.row);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Poptip",
                                {
                                    props: {
                                        confirm: true,
                                        title: "您确定要删除这条数据吗?",
                                        transfer: true
                                    },
                                    on: {
                                        "on-ok": () => {
                                            this.user_delete(params.row.gid);
                                        }
                                    }
                                },
                                [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "error",
                                                size: "small"
                                            },
                                            style: {
                                                marginRight: "5px"
                                            }
                                        },
                                        "删除"
                                    )
                                ]
                            )
                        ]);
                    }
                }
            ],
            userData: [],
            formItem: {
                center: "",
                radius: "",
                points: "",
                fixed_date: "",
                valid_time: "",
                repeat: "Mon,Tues,Wed,Thur,Fri,Sat,Sun"
            },
            modalTitle: "",
            showCreateForm: false,
            roles: [],
            currentPage: 1,
            totalPage: 1,
            pageSize: 20,
            map: null,
            provinces: [],
            citys: [],
            districts: [],
            streets: [],
            polygons: [],
            district: null,
            circleDisabled: null
        };
    },
    methods: {
        timerPicker(time) {
            this.formItem.valid_time = time;
        },
        lastPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.user_list();
            } else {
                this.$Message.info("当前已经是第一页。");
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.user_list();
            } else {
                this.$Message.info("没有更多的数据了。");
            }
        },
        showCreateFrom() {
            this.modalTitle = "添加围栏";
            this.modalType = "create";
            this.clearFormItem();
            this.showCreateForm = true;
            this.initMap("amap_id");
        },
        initMap(div_id) {
            this.map = new AMap.Map(div_id, {
                resizeEnable: true,
                center: [116.30946, 39.937629],
                zoom: 12
            });
            this.map.addControl(new AMap.ToolBar());
            this.map.addControl(new AMap.Scale());
            //为地图注册click事件获取鼠标点击出的经纬度坐标
            var that=this;
            var clickEventListener = that.map.on("click", function(e) {
                that.searchForm.gps=e.lnglat.getLng() + "," + e.lnglat.getLat();
            });
        },
        getClickPoint() {
            this.map.on("click", function(e) {
                alert(
                    "您在[ " +
                        e.lnglat.getLng() +
                        "," +
                        e.lnglat.getLat() +
                        " ]的位置点击了地图！"
                );
            });
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改围栏";
            this.modalType = "update";
            this.formItem = row;
            this.showCreateForm = true;
            this.initMap("amap_id");
        },
        drawPolygon() {
            var mouseTool = new AMap.MouseTool(this.map);
            var drawPolygon = mouseTool.polyline();
            var that = this;
            AMap.event.addListener(mouseTool, "draw", function(e) {
                //添加事件
                var points = e.obj.getPath();
                var str = "";
                for (var index in points) {
                    str +=
                        points[index]["lng"] + "," + points[index]["lat"] + ";";
                }
                that.formItem["points"] = str;
                that.circleDisabled = true;
                that.formItem["radius"] = "";
                that.formItem["center"] = "";
            });
        },
        drawCircle() {
            var mouseTool = new AMap.MouseTool(this.map);
            var drawcircle = mouseTool.circle();
            var that = this;
            AMap.event.addListener(mouseTool, "draw", function(e) {
                //添加事件
                var center = e.obj.getCenter();
                that.formItem["radius"] = e.obj.getRadius();
                that.formItem["center"] = center.lng + "," + center.lat;
                that.circleDisabled = false;
                that.formItem["points"] = "";
            });
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        ok() {
            if (this.modalType == "create") {
                this.user_create(this.formItem);
            } else if (this.modalType == "update") {
                this.user_update(this.formItem);
            }
        },
        cancel() {
            this.showCreateForm = false;
            this.showMapForm = false;
        },
        user_list() {
            util.ajax.get("/genfence").then(rsp => {
                if (rsp.data.code == 200) {
                    var resutls = JSON.parse(rsp.data.data);
                    this.userData = resutls.data.rs_list;
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        user_create() {
            util.ajax.post("/genfence", this.formItem).then(rsp => {
                if (rsp.data.code == 200) {
                    var msg = JSON.parse(rsp.data.data);
                    if (msg.data.status != "0") {
                        this.$Message.error(msg.data.message);
                    } else {
                        this.$Message.success("创建围栏成功");
                    }
                } else {
                    this.$Message.error("系统错误!");
                }
                this.user_list();
            });
        },
        user_update(params) {
            util.ajax
                .put("/genfence/" + params.gid, this.formItem)
                .then(rsp => {
                    if (rsp.data.code == 200) {
                        var msg = JSON.parse(rsp.data.data);
                        if (msg.data.status != "0") {
                            this.$Message.error(msg.data.message);
                        } else {
                            this.$Message.success("更新围栏成功");
                        }
                    } else {
                        this.$Message.error("系统错误!");
                    }
                    this.user_list();
                });
        },
        user_delete(id) {
            util.ajax.delete("/genfence/" + id).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("删除围栏成功");
                } else {
                    this.$Message.error("系统错误!");
                }
                this.user_list();
            });
        },
        btnClick() {
            this.currentPage = 1;
            this.user_list();
        },
        clearFormItem() {
            this.formItem = {
                center: "",
                radius: "",
                points: "",
                fixed_date: "",
                valid_time: "",
                repeat: "Mon,Tues,Wed,Thur,Fri,Sat,Sun"
            };
        },
        buildPolygon(path) {
            var polygon = new AMap.Polygon({
                map: this.map,
                fillOpacity: 0.4,
                path: path
            });
        },
        buildCircle(center, radius) {
            var circle = new AMap.Circle({
                map: this.map,
                fillOpacity: 0.4,
                center: center,
                radius: radius
            });
        },
        startMap() {
            this.showMapForm = true;
            this.initMap("amap_show_id");
            for (var index in this.userData) {
                if (
                    this.userData[index]["points"] != null &&
                    this.userData[index]["points"] != ""
                ) {
                    var path = [];
                    var pointsList = this.userData[index]["points"].split(";");
                    for (var index in pointsList) {
                        if (pointsList[index] != "") {
                            var gps = pointsList[index].split(",");
                            path.push(gps);
                        }
                    }
                    this.buildPolygon(path);
                } else {
                    var center = this.userData[index]["center"].split(",");
                    this.buildCircle(
                        new AMap.LngLat(center[0], center[1]),
                        this.userData[index]["radius"]
                    );
                }
            }
        },
        checkPoints() {
            if (this.searchForm.gps != null && this.searchForm.gps != "") {
                var params = {};
                params["uid"] = "xaas1";
                params["diu"] = "35065ea4-9d94-46a9-8236-0f2f12cb5384";
                params["locations"] =
                    this.searchForm.gps +
                    "," +
                    Math.floor(new Date().getTime() / 1000);
                util.ajax.post("/genfence/status", params).then(rsp => {
                    if (rsp.data.code == 200) {
                        var msg = JSON.parse(rsp.data.data);
                        if (msg.data.status != "0") {
                            this.$Message.error(msg.data.message);
                        } else {
                            this.$Message.success("查询成功");
                            console.log(msg.data);
                            var event_list = msg.data.fencing_event_list;
                            if (event_list.length > 0) {
                                var str = "";
                                str +=
                                    "【设备与围栏行为】" +
                                    event_list[0]["client_action"] +
                                    "<br/>";
                                str +=
                                    "【设备与围栏状态】" +
                                    event_list[0]["client_status"] +
                                    "<br/>";
                                str +=
                                    "【设备与围栏交互时间】" +
                                    event_list[0]["enter_time"] +
                                    "<br/>";
                                str +=
                                    "【围栏名称】" +
                                    event_list[0]["fence_info"]["fence_name"] +
                                    "<br/>";
                                this.$Notice.open({
                                    title: "围栏交互信息",
                                    desc: str,
                                    duration: 0
                                });
                            } else {
                                this.$Notice.open({
                                    title: "围栏交互信息",
                                    desc:
                                        "距最近的围栏距离大于:" +
                                        msg.data["nearest_fence_distance"] +
                                        "米",
                                    duration: 0
                                });
                            }
                        }
                    } else {
                        this.$Message.error("系统错误!");
                    }
                });
            } else {
                this.$Message.error("请输入需要检测的地址先！");
            }
        }
    },
    mounted() {
        this.user_list();
    }
};
</script>
