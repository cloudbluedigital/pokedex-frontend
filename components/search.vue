<template>
  <ais-index
    app-id="6T2JTPORZZ"
    api-key="34b7aa57dd6499bc1d224a2a8ff631c9"
    index-name="pokemon"
    :auto-search=false
  >
    <ais-search-box></ais-search-box>
    <ais-results>
      <template slot-scope="{ result }">
        <p  @click="getData($event)">
          <ais-highlight :result="result" attribute-name="name"></ais-highlight>
        </p>
      </template>
    </ais-results>
  </ais-index>
</template>

<script>
import Search from "~/components/search.vue";

export default {
  data() {
    return {
      pokemons: ""
    };
  },
  methods: {
    async getData(event) {
      var value = $(event.target).closest("p");
      this.pokemons = value[0].outerText;
      this.$router.push("/pokemon/" + this.pokemons);
    }
  }
};
</script>