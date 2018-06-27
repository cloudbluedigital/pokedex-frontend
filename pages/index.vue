<template>
  <section class="container-fluid">
    <div class="pull-right">
        <search/>
    </div>
    <div class="container text-center">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody v-for="pokemons in pokemon.data" :key="pokemons.id">
          <tr>
            <td><nuxt-link :to="'/pokemon/'  + pokemons.name">{{ pokemons.name }}</nuxt-link></td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" @click="getPokemon(pokemon.prev_page_url)" href="javascript:void(0)" aria-label="Previous">
                  <span aria-hidden="true">«</span>
              </a>
          </li>
          <li class="page-item" @click="getSpecificPage(pokemon.current_page - 2)" v-if="this.pokemon.current_page - 2 <= this.pokemon.last_page && this.pokemon.current_page > 2">
            <a class="page-link" href="javascript:void(0)">{{ this.pokemon.current_page - 2 }}</a>
          </li>
          <li class="page-item" @click="getSpecificPage(pokemon.current_page - 1)" v-if="this.pokemon.current_page - 1 < this.pokemon.last_page  && this.pokemon.current_page > 1">
            <a class="page-link" href="javascript:void(0)">{{ this.pokemon.current_page - 1 }}</a>
          </li>
          <li class="page-item active" @click="getSpecificPage(pokemon.current_page)" v-if="this.pokemon.current_page <= this.pokemon.last_page">
            <a class="page-link" href="javascript:void(0)">{{ this.pokemon.current_page}}</a>
          </li>
          <li class="page-item" @click="getSpecificPage(pokemon.current_page + 1)" v-if="this.pokemon.current_page + 1 <= this.pokemon.last_page">
            <a class="page-link" href="javascript:void(0)">{{ this.pokemon.current_page + 1 }}</a>
          </li>
          <li class="page-item" @click="getSpecificPage(pokemon.current_page + 2)" v-if="this.pokemon.current_page + 2 < this.pokemon.last_page">
            <a class="page-link" href="javascript:void(0)">{{ this.pokemon.current_page + 2 }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" @click="getPokemon(pokemon.next_page_url)" href="javascript:void(0)" aria-label="Next">
                  <span aria-hidden="true">»</span>
              </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import Search from "~/components/search.vue";

export default {
  components: {
    Search
  },
  async asyncData({ app }) {
    const pokemon = await app.$axios.$get("pokemon?page=1");
    return {
      pokemon
    };
  },
  data() {
    return {
      pokemon: ""
    };
  },
  methods: {
    async getPokemon(url) {
      const newPokemon = await this.$axios.$get(url);
      this.pokemon = newPokemon;
    },
    async getSpecificPage(page) {
      const newPagePokemon = await this.$axios.$get("pokemon?page=" + page);
      this.pokemon = newPagePokemon;
    }
  }
};
</script>
