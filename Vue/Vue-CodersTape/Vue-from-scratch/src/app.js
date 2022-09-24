import Vue from 'vue';
import Accordian from './components/Accordian.vue';
import List from "./components/List.vue";


new Vue ({
    el: "#app",

    components:{
        Accordian,
        List,
    },

    data: {
        items:[
            {id:"1", title:'Tiltle 1', description:'Description for tab 1' },
            {id:"2", title:'Tiltle 2', description:'Description for tab 2' },
            {id:"3", title:'Tiltle 3', description:'Description for tab 3' },
        ]
    },

});