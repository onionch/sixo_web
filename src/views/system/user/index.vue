<template>
    <div>
        <VueUser :apiurl="apiurl" :token="token">
        </VueUser>
    </div>
</template>
<script>
    export default {
        name: "user",
        data() {
            return {
                apiurl: "http://127.0.0.1:22280/",
                token: "xxsss"
            };
        }
    };
</script>