<template>
<div>
    <p>Pokemon Data:</p>
    <p>Name: {{ pokemon_data[0].name }}</p>
    <p v-for="pokemon_abilities in pokemon_data[0].abilities" :key="pokemon_abilities.abilities">
        Abilities:
        {{ pokemon_abilities.ability }}
    </p>
    <p>Height: {{ pokemon_data[0].height }}</p>
    <p>Weight: {{ pokemon_data[0].weight }}</p>
    <p>Species: {{ pokemon_data[0].species }}</p>
</div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const pokemon_data = await app.$axios.$get(
      "pokemon/data?pokemon=" + app.context.route.params.pokemon
    );
    return {
      pokemon_data
    };
  },
  data() {
    return {
      pokemon_data: ""
    };
  }
};
</script>
