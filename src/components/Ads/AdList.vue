<template>
    <v-container>
        <v-layout row v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">My ads</h1>
                <v-card
                        class="elevation-8 mb-3"
                        v-for="ad in myAds"
                        :key="ad.id"
                >
                    <v-layout row>
                        <v-flex xs5>
                            <v-img
                                :src="ad.imageSrc"
                                height="180px"
                            >
                            </v-img>
                        </v-flex>
                        <v-flex xs7>
                            <v-card-text>
                                <h2 class="text--primary mb-2">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="primary"
                                        :to="'/ad/' + ad.id"
                                >Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="text-xs-center">
                <h1 class="text--secondary mb-3">You haven't ads yet</h1>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 class="text-xs-center pt-5">
                <v-progress-circular
                        indeterminate
                        :size="70"
                        :width="5"
                        color="primary"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    computed: {
      myAds () {
        return this.$store.getters.myAds
      },
      loading () {
        return this.$store.getters.loading
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