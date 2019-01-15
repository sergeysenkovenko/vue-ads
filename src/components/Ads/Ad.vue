<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <v-card>
                    <v-img :src="ad.imgSrc"
                           height="300px"
                    >
                    </v-img>
                    <v-card-text>
                        <h1 class="text--primary mb-2">{{ad.title}}</h1>
                        <p class="text--secondary">{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="warning">Edit</v-btn>
                        <v-btn color="primary">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      ad () {
        const id = this.id
        return this.$store.getters.adById(id)
      }
    }
  }
</script>

<style scoped>
    .v-card__actions{
        padding: 16px;
        padding-top: 8px;
    }
</style>