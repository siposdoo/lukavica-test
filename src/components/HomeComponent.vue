<template>
    <div class="col-md-10 container-fluid">
    
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Make payment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                    </div>
                    <form @submit.prevent="startCalculate" class="mb-3">
                        <div class="modal-body">
                            <div class="col-md-12 text-center">
                                <div class="form-group">
                                    <input type="text" v-on:keyup="clearRes" v-model="amounttoc" class="form-control bg-dark text-white" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Change</button>
                                </div>
                                <p v-if="this.messages.length">
                                    <b>Success !!</b>
                                    <ul class="list-group">
                                        <li v-for="message in this.messages" v-bind:key="message" class="list-group-item list-group-item-success mb-3">{{ message }}</li>
                                    </ul>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Coin Value</th>
                                                <th scope="col">Nmbr. of Coins</th>
                                                <th scope="col">Row Sum</th>
    
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="rez in res">
                                  
                                    <tr v-if="rez.counter>0" v-bind:key="rez.id">
                                      
                                      <td>{{ rez.value }} $ </td>  <td> x {{ rez.counter }}</td> <td> {{ rez.counter* rez.value }} $</td>
                                    </tr>
</template>
    </tbody>
    <tfoot>
    <tr>
      <th scope="col"> </th>
      <th scope="col"> </th>
      <th scope="col">Total:{{ this.totalsu }}</th>
       
    </tr>
  </tfoot>
  </table>
                </p>
                <p v-if="this.errors.length">
                    <b>Warning !!</b>
                    <ul class="list-group">
                      <li v-for="error in this.errors" v-bind:key="error"  class="list-group-item list-group-item-warning mb-3">{{ error }}</li>
                    </ul>
                    <table class="table table-striped">
                    <thead>
    <tr>
      <th scope="col">Coin Value</th>
      <th scope="col">Nmbr. of Coins</th>
      <th scope="col">Row Sum</th>
       
    </tr>
  </thead>
    <tbody>
<template v-for="rez in res">
    <tr v-if="rez.counter>0" v-bind:key="rez.id">
    
        <td>{{ rez.value }} $ </td>
        <td> x {{ rez.counter }}</td>
        <td> {{ parseFloat(rez.counter* rez.value).toFixed(2) }} $</td>
    </tr>
</template>
    </tbody>
    <tfoot>
      <tr>
      <th colspan="2"></th>
      <th   scope="col">Total:{{ this.totalsu }} $</th>
       
    </tr>
    <tr>
      
      <th colspan="3" scope="col">Missing</th>
       
    </tr>
    <tr>
      
      <th   colspan="3" scope="col"> {{ parseFloat(this.amounttoc).toFixed(2) }} - {{this.totalsu}} =  {{ (parseFloat(this.amounttoc).toFixed(2) -this.totalsu).toFixed(2) }} $</th>
       
    </tr>
  </tfoot>
  </table>
                    
                </p>
            </div>
             
             
            </div>
            <div class="modal-footer">
                
            </div>
          </form>
        </div>
      </div>
    </div>
   <div v-if="!this.$store.getters.coinsByVal.length >0" class="alert alert-warning fade in alert-dismissible show">
 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true" style="font-size:20px">×</span>
  </button>    <strong>Warning!</strong> Please click on "Setup state" to init. first state for coins.
</div>
  <a href="#" v-if="this.$store.getters.coinsByVal.length >0" v-on:click="showmodal()" class="btn btn-sq-lg btn-primary">
                
                Pres to make  <br>Payment
            </a>
  <div class="row">
     <div class="col-12">
       <div class="card-block">
    <div class="row">
    
        <coinbox :coin="coin" v-for="coin in coins" :key="coin.id"></coinbox>   
 </div>
          </div>
    </div>
  </div> 
</div>
</template>

<script>
import JQuery from 'jquery'
let $ = JQuery
import coinbox from '@/components/CoinStateBoxComponent.vue'
export default {
    components: {
        coinbox
    },
    mounted() {

        this.coins = this.$store.getters.coinsByVal

    },
    data() {
        return {
            errors: [],
            totalsu: 0,
            messages: [],
            res: [],
            coins: [],
            amounttoc: ''



        }
    },
    methods: {
        clearRes() {
            this.totalsu = 0
            this.errors = []
            this.messages = []
        },
        showmodal() {
            $("#exampleModal").modal('show');
        },
        startCalculate() {
            this.totalsu = 0
            this.errors = []
            this.messages = []
            let a = parseFloat(this.amounttoc).toFixed(2)
            let acceptor = []
            this.coins.forEach(element => {
                let counter = 0;
                let tmpacc = [];
                while (a / element.value >= 1 && element.counts - counter > 0 && element.counts != 0 && a != 0) {
                    a = parseFloat(a - (element.value)).toFixed(2)

                    counter++;
                }
                tmpacc.value = element.value;
                tmpacc.id = element.id;

                tmpacc.counter = counter;
                tmpacc.counts = element.counts;
                tmpacc.totalc = element.counts;



                acceptor.push(tmpacc)

            });
            if (a == 0.0) {
                this.messages.push('Your order is completed');
                acceptor.forEach(element => {
                    this.totalsu += element.value * element.counter
                    this.$store.commit({
                        type: 'updateCoins',
                        id: element.id,
                        value: element.value,
                        counts: element.counts - element.counter,

                    })
                });
                this.res = acceptor;
            } else {
                acceptor.forEach(element => {

                    this.totalsu += element.value * element.counter


                });

                this.res = acceptor;

                this.errors.push('Your order is not completed, please insert correct amount');
            }

            this.totalsu = parseFloat(this.totalsu).toFixed(2)
        }
    }
}
</script>