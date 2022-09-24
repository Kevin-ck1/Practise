 <template>
    <div>
        <p>{{item.title + "Kevin" }}</p> 
        <span @click="toggle =! toggle">Details</span>
        <p v-if="toggle">{{item.description}}</p>
        <br>  
    </div>
</template>

<script>
export default {
    name: "Accordion",

    props:['item'],

    data(){
        return {
            toggle: false,
        };
    },
}
</script>

