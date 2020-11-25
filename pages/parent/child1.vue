<template>
    <div class="home">
        <h1>child1{{foobar}}</h1>        
        <nuxt-link to="/">首页</nuxt-link>      
    </div>
</template>

<script>
// import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'
export default {
    name: 'child1',
    props:["foobar"],
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