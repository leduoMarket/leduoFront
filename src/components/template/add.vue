<template>
  <el-input
    placeholder="请输入内容"
    v-model="input"
    clearable>
  </el-input>

</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                input: '',
            }
        }
    }
</script>

<style scoped>

</style>
