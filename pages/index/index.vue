<template>
    <div class="home">
        <h1>index</h1>       
        <p>foobar：{{foobar}}</p>
        <nuxt-link to="/">首页</nuxt-link>
    </div>
</template>

<script>
// import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'
export default {
    name: 'index',
    props: ['foobar'],
    data () {
        return {
        }
    },
    computed:{

    },
    methods:{
        
    }
}
</script>