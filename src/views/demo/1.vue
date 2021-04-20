<template>
    <div>
        <h2>《前端开发核心知识进阶》- 闭包 demo</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup () {
        var array = []
        function createNodes () {
            let div
            let i = 100
            let frag = document.createDocumentFragment()
            for(; i > 0; i--) {
                div = document.createElement('div')
                div.appendChild(document.createTextNode(`${i}`))
                frag.appendChild(div)
            }

            document.body.appendChild(frag)
        }

        function badCode () {
            array.push([...Array(10000).keys()])
            createNodes()
            setTimeout(badCode, 1000)
        }

        badCode()
    }
})
</script>

<style scoped>

</style>
