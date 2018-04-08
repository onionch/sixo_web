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
                apiurl: "http://xxxxxxx/",
                arr: [],
                token: "xxsss"
            };
        }
    };
</script>