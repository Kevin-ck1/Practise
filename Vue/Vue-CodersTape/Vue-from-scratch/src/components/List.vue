<template>
    <div>
        <p>{{dropdownResult}}</p>
        <dropdown @updateOption="optionUpdate" ></dropdown>
    </div>
</template>

<script>

import Dropdown from './Dropdown';

export default {

    name: "List",

    components: {
        Dropdown,
    },

    data: function(){
       return {
            dropdownResult: "Choose Option"
       }
    },

    methods:{
        optionUpdate(value){
            this.dropdownResult = value;
        },
    },
}
</script>

<style>

</style>