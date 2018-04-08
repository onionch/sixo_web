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
                    <Col span="6">
                        <Input v-model="searchForm.gps" placeholder="gps" clearable></Input>
                    </Col>
                    <Col span="2">
                        <Button type="primary" @click="btnClick">检测地址</Button>
                    </Col>
                    <Col span="2">
                        <Button type="info" @click="getClickPoint">点选地址</Button>
                    </Col>
                    <Col span="6" offset="8">
                        <Input v-model="searchForm.polygon" placeholder="polygon" clearable></Input>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="24">
                    <div class="amap-wrapper" id="amap_id">
                    </div>
                    <div class="tip">
                        <!-- <Button type="info" @click="drawCircle">配置圆形围栏</Button> -->
                        <Button type="success" @click="drawPolygon">配置多边形围栏</Button>
                        <Button type="error" @click="clearMap">清除覆盖物</Button>
                    </div>             
                </Col>
            </Row>
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
            searchForm: {
                polygon:""
            },
            formItem: {},
            path: []
        };
    },
    methods: {
        drawPolygon() {
            var mouseTool = new AMap.MouseTool(this.map);
            var drawPolygon = mouseTool.polyline();
            var that = this;
            AMap.event.addListener(mouseTool, "draw", function(e) {
                //添加事件
                //添加事件
                var points = e.obj.getPath();
                var str = "";
                for (var index in points) {
                    str +=
                        points[index]["lng"] + "," + points[index]["lat"] + ";";
                }
                that.searchForm["polygon"] = str;
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
        clearMap(){
            this.map.clearMap();
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
        btnClick() {
            if (this.path.length > 0) {
                if (this.searchForm.gps != null && this.searchForm.gps != "") {
                    this.map.clearMap();
                    var gps = this.searchForm.gps.split(",");
                    var marker1 = new AMap.Marker({
                        map: this.map,
                        position: gps
                    });
                    var polygon = new AMap.Polygon({
                        map: this.map,
                        fillOpacity: 0.4,
                        path: this.path
                    });
                    var marker1InPolygon = polygon.contains(
                        marker1.getPosition()
                    );
                    this.$Message.info("检测结果：" + marker1InPolygon);
                } else {
                    this.$Message.error("请先输入检测地址。");
                }
            } else {
                this.$Message.error("请先在地图配置多边形。");
            }
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
        initAmap() {
            this.map = new AMap.Map("amap_id", {
                resizeEnable: true,
                center: [116.30946, 39.937629],
                zoom: 11
            });
            this.map.addControl(new AMap.ToolBar());
            this.map.addControl(new AMap.Scale());
        }
    },
    mounted() {
        this.initAmap();
    }
};
</script>
