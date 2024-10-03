<template>
  <div class="container">
    <h3 class="centered-title">Developed By आयुष मोरे !</h3>
    <div class="row-container">
      <!-- Plugin 1 -->
      <my-element></my-element>
      <!-- Plugin 2 -->
      <calculator-card></calculator-card>
      <!-- Plugin 3 -->
      <openstreetmap-app></openstreetmap-app>
    </div>
    <br />
    <!-- Plugin 4 -->
    <div class="youtube-wrapper">
      <youtube-app></youtube-app>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    import('../components/lit/MyElement.js');
    import('../components/lit/CalculatorCard.js');
    import('../components/lit/OpenStreetMapApp.js');
    import('../components/lit/YoutubePlayer.js');
  }
}
</script>


<style scoped>
.centered-title {
  text-align: center;
}

.container {
  display: flex;
  background-color: #ffffff;

  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.row-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  border: 2px solid green;
}

.row-container>* {
  padding: 20px;
  border-right: 2px solid lightgreen;
}

.row-container>*:last-child {
  border-right: none;
}

.youtube-wrapper {
  margin: 0 auto;
  width: fit-content;
  padding: 20px;
  border: 2px solid lightgreen;
}
</style>
