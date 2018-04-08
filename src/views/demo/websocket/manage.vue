<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <Row :gutter="24">
                    <Col span="3">
                    <Button type="info" long icon="plus-round" @click="connect" size="large">建立连接</Button>
                    </Col>
                    <Col span="3">
                    <Button type="info" long icon="plus-round" @click="disconnect" size="large">断开连接</Button>
                    </Col>
                </Row>
                <Row :gutter="24" class="margin-top-10">
                    <Col span="3">
                    <Button type="info" long icon="plus-round" @click="sendMsg" size="large">发送消息</Button>
                    </Col>
                    <Col span="3">
                    <Input v-model="sendMessage" placeholder="发送消息" size="large"></Input>
                    </Col>
                </Row>
            </Card>
        </Row>

        <Row class="margin-top-10">
            <Card>
                <Row>
                    <Col span="24">
                        <span>当前连接：</span>
                        <ul>
                            <li style="float:left;" v-for="line in linkUsers">
                                {{line}}
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <ul>
                            <li v-for="line in lines">
                                {{line}}
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import util from "../../../libs/util.js";
export default {
    name: "websocket",
    components: {},
    data() {
        return {
            lines: [],
            ws: null,
            sendMessage: "",
            linkUsers:[]
        };
    },
    methods: {
        connect() {
            this.lines = [];
            this.ws = new WebSocket("ws://127.0.0.1:8080/chat?userName=cc");
            this.ws.onopen = () => {
                // Web Socket 已连接上，使用 send() 方法发送数据
            };
            this.ws.onmessage = evt => {
                let receivedMsg = evt.data;
                this.lines.push("接受到服务端的信息...：" + receivedMsg);
            };
            this.ws.onclose = () => {
                // 关闭 websocket
                this.lines.push("连接已关闭...");
            };
            this.linkedList();
        },
        disconnect() {
            if (this.ws != null) {
                this.ws.close();
                this.ws = null;
            } else {
                this.$Message.info("连接不存在，或已经关闭。");
            }
            this.linkedList();
        },
        sendMsg() {
            if (this.ws != null) {
                if (this.sendMessage != "") {
                    this.ws.send(this.sendMessage);
                    this.sendMessage = "";
                } else {
                    this.$Message.info("请输入要发送的消息。");
                }
            } else {
                this.$Message.info("连接不存在，请重连。");
            }
        },
        linkedList(){
            util.ajax.get("/message").then(rsp => {
                if (rsp.data.code == 200) {
                    this.linkUsers=rsp.data.data
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        }
    },
    mounted() {
        this.linkedList();
    }
};
</script>
