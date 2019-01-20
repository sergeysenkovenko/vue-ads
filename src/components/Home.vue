<template>
    <div v-if="!loading">
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                            v-for="ad in promoAds"
                            :key="ad.id"
                            :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn class="warning" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                    xs12
                    sm6
                    md4
                    v-for="ad in ads"
                    :key="ad.id"
                >
                    <v-card>
                        <v-img
                                :src="ad.imageSrc"
                                aspect-ratio="2"
                        ></v-img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ ad.title }}</h3>
                                <div>{{ ad.description }}</div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" :to="'/ad/' + ad.id">Show More</v-btn>
                            <v-btn raised color="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout>
                <v-flex xs-12 class="text-xs-center pt-5">
                    <v-progress-circular
                            indeterminate
                            :size="70"
                            :width="5"
                            color="primary"
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
      computed: {
        ads () {
          return this.$store.getters.ads
        },
        promoAds () {
          return this.$store.getters.adsPromo
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
        padding-top:8px;
    }
    .car-link{
        position: absolute;
        bottom: 60px;
        left:50%;
        transform: translateX(-50%);
    }
</style>