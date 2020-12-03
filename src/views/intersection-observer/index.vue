<template>
  <div class="intersection">
      <div class="form">
          选择需要触发的值：
          <label><input type="checkbox" v-model="threshold" :value="0"> 0</label>
          <label><input type="checkbox" v-model="threshold" :value="0.1"> 0.1</label>
          <label><input type="checkbox" v-model="threshold" :value="0.2"> 0.2</label>
          <label><input type="checkbox" v-model="threshold" :value="0.3"> 0.3</label>
          <label><input type="checkbox" v-model="threshold" :value="0.5"> 0.5</label>
          <label><input type="checkbox" v-model="threshold" :value="0.8"> 0.8</label>
          <label><input type="checkbox" v-model="threshold" :value="1.0"> 1.0</label>
      </div>
      
      <div class="info">
          <p>当前 threshold 的值是：{{threshold}};</p>
          <p>目标元素已显示：{{ (intersectionRatio * 100).toFixed(0) }} %</p>
          <p>回调函数触发次数：{{ count }}</p>
        </div>
      <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li class="hook">5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
      </ul>
  </div>
</template>

<script lang="ts">
let observerInstance
export default {
    data () {
        return {
            threshold: [0, 0.5, 0.8, 1],
            intersectionRatio: 0,
            count: 0
        }
    },
    mounted () {
        this.inputChange()
    },

    watch: {
        threshold (val) {
            this.inputChange()
        }
    },

    methods: {
        inputChange () {
            if (observerInstance) observerInstance.disconnect()
            let observer = this.observer()
            observer.observe(document.querySelector('.hook'))
        },

        observer () {
            observerInstance = new IntersectionObserver(entries=> {
                entries.forEach(entry => {
                    console.log('entry: ', entry);
                    if (entry.isIntersecting) {
                        entry.target.className += ' bg-red' 
                    } else {
                        entry.target.className = 'hook'
                    }
                    this.count++
                    this.intersectionRatio = entry.intersectionRatio
                })
            }, {
                root: document.querySelector('ul'),
                threshold: this.threshold
            });
            return observerInstance
        }
    }
}
</script>

<style>
.intersection {
    width: 700px;
    text-align: left;
}
.form {
    padding-left: 10px;
}
.form label{
    margin-right: 15px;
}
.info {
    padding: 1px 10px;
    margin-top: 10px;
    background-color: bisque;
}
ul {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    margin-top: 20px
}

ul li {
    width: 98%;
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: #000;
    background-color: rgb(228, 225, 222);
    margin-bottom: 20px;
}

.bg-red {
    background-color: #f80;
    color: #fff;
}
.hook {
    visibility: visible;
}
</style>