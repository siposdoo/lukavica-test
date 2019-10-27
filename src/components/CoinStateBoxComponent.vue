<template>
    <div class="col-xl-4 col-lg-4 col-12  mt-4">
           <!-- Card -->
<div class="card promoting-card">

  <!-- Card content -->
  <div class="card-body d-flex flex-row">

    <!-- Avatar -->
    <img src="https://www.pinpng.com/pngs/m/3-37898_gold-coin-png-photos-edward-vii-1906-coin.png" class="rounded-circle mr-3" height="50px" width="50px" alt="avatar">

    <!-- Content -->
    <div>

      <!-- Title -->
      <h4 class="card-title font-weight-bold mb-2">{{coin.value}} $</h4>
      <!-- Subtitle -->
      <p class="card-text"><i class="far fa-clock pr-2"></i>In machine: {{coin.counts}}</p>

    </div>

  </div>

   

</div>
<!-- Card -->
        </div>
 
 
</template>
<style>
.collapse-content .fa.fa-heart:hover {
  color: #f44336 !important;
}
.collapse-content .fa.fa-share-alt:hover {
  color: #0d47a1 !important;
}
</style>
<script>
// @ is an alias to /src
 

export default {
  name: 'coinbox',
  props: {
    coin: Object,
  
  }
  
}
</script>