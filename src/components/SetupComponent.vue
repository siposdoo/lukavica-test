<template>
    <div>
    
        <div class="container">
    
            <h2>Coins {{totalc}}</h2>
    
            <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#exampleModal">Add new</button>
    
            <button v-on:click="randomfill()" type="button" class="btn btn-primary ml-3 mb-3">Fill random :)</button>
    
    
    
            <!-- Modal -->
    
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    
                <div class="modal-dialog" role="document">
    
                    <div class="modal-content">
    
                        <div class="modal-header">
    
                            <h5 class="modal-title" id="exampleModalLabel">Add new coin</h5>
    
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    
                  <span aria-hidden="true">&times;</span>
    
                </button>
    
                        </div>
    
                        <form @submit.prevent="addCoin()" class="mb-3">
    
                            <div class="modal-body">
    
                                <div class="form-group">
    
                                    <input type="text" v-model="coin.value" placeholder="Value in format 0.1,0.2,1.0,2.0 ..." class="form-control" />
    
                                </div>
    
                                <div class="form-group">
    
                                    <input type="number" v-model="coin.counts" placeholder="Nmbr. of coins" class="form-control">
    
                                </div>
    
                            </div>
    
                            <div class="modal-footer">
    
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    
                                <button type="submit" class="btn btn-primary">Save</button>
    
                            </div>
    
                        </form>
    
                    </div>
    
                </div>
    
            </div>
    
    
    
    
    
            <div v-bind:class="{'page-item':true, 'bg-warning':(coin.counts >0 && coin.counts<5), 'bg-dark':(coin.counts === 0), 'bg-primary':(coin.counts !== 0)}" class="card card-body mb-2  text-white" v-for="coin in this.$store.getters.coins" v-bind:key="coin.id">
    
                <div class="row">
    
                    <div class="col-md-6 float-left">
    
                        <div class="float-left col-md-6 "><span>Value</span>
    
                            <h3>{{coin.value}} $</h3>
    
                        </div>
    
                        <div class="float-left col-md-6"><span>Coins</span>
    
                            <h3>{{coin.counts}}</h3>
    
                        </div>
    
                    </div>
    
                    <div class="col-md-6 float-right">
    
                        <button @click="editCoin(coin);" class="btn btn-warning mr-2 mb-2 float-right">Change</button>
    
    
    
                        <button @click="delCoin(coin.id);" class="btn btn-danger mr-2 mb-2 float-right">Delete</button>
    
                    </div>
    
                </div>
    
            </div>
    
        </div>
    
    </div>
</template>
<script>
import JQuery from 'jquery'
let $ = JQuery
export default {
    data() {
        return {

            totalc: 0,
            democoins: [0.1, 0.2, 0.3, 0.5, 1.0, 5.0],
            coin: {
                id: "",
                value: "",
                counts: ""
            },


            edit: false
        };
    },
    created() {

    },
    methods: {
        randomfill() {
            this.democoins.forEach(element => {
                this.$store.commit({
                    type: 'addToCoins',
                    id: '_' + Math.random().toString(36).substr(2, 9),
                    value: element,
                    counts: Math.floor(Math.random() * (+86 - +2)) + +2,

                })
            });
        },
        delCoin(idC) {

            this.$store.commit({
                type: 'deleteCoin',
                id: idC,


            })

        },
        addCoin() {

            if (this.edit === false) {

                this.coin.id = '_' + Math.random().toString(36).substr(2, 9);
                let coin = this.coin

                this.$store.commit({
                    type: 'addToCoins',
                    id: coin.id,
                    value: coin.value,
                    counts: coin.counts,

                })


                this.coin.id = "";
                this.coin.value = "";
                this.coin.counts = "";
                $("#exampleModal").modal("hide");



            } else {


                let coin = this.coin

                this.$store.commit({
                    type: 'updateCoins',
                    id: coin.id,
                    value: coin.value,
                    counts: coin.counts,

                })


                this.coin.id = "";
                this.coin.value = "";
                this.coin.counts = "";
                this.edit = false;
                $("#exampleModal").modal("hide");

            }
        },
        editCoin(coin) {
            this.edit = true;
            this.coin.id = coin.id;
            this.coin.value = coin.value;
            this.coin.counts = coin.counts;

            $("#exampleModal").modal("show");
        }
    }
};
</script>>