<template>
    <div class="mt-6 flex justify-center" >
        <input type="text" 
        :placeholder="template" 
        class="w-56 text-2xl bg-gray-300 p-3 rounded-lg focus:outline-none"
        v-model="number">
    </div>
</template>

<script>
export default {
    name: 'telephone',

    props: [
        'template'
    ],

    data: function(){
        return {
            number: '',
            format: '',
            regex: '^',
        }
    },

    
    mounted() {
        let x = 1;

        this.format = this.template.replace(/x+/g, ()=>'$'+x++ );

        this.template.match(/x+/g).forEach((char, key)=>{
           // console.log(char.length);
           //console.log(key);
           this.regex += '(\\d{' + char.length + '})?';
           //console.log(this.regex);
        });
    },
        
    watch: {
        number(){
            this.number = this.number.replace(/[^0-9]/g, '')
            //.replace(/^(\d{3})(\d{3})?(\d{4})?/g,'($1) $2-$3')
            .replace(new RegExp(this.regex, 'g'), this.format)
            .substr(0, this.template.length);
            
        },
    },

}
</script>

<style>

</style>