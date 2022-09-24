<template>
    <select name="dropdown" id="dropdown" v-model="selectedOption" @change="optionChange">
        <option value="null" disabled>Please Select </option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
    </select>
</template>

<script>
export default {
    name: "Dropdown",

    data:function(){
        return{
            selectedOption: "null",
        }
    },

    methods: {
        optionChange(event){
            this.$emit('updateOption',event.target.value);
        },
    },
}
</script>