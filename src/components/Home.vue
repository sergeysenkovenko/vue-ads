<template>
    <div v-if="!loading && ads.length !== 0">
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
                    <v-card height="100%">
                        <v-img
                                :src="ad.imageSrc"
                                aspect-ratio="2"
                        ></v-img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-2" height="100%">{{ ad.title }}</h3>
                                <div class="text">{{ ad.description }}</div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" :to="'/ad/' + ad.id">Show More</v-btn>
                            <BuyModal :ad="ad"></BuyModal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else-if="!loading && ads.length === 0">
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-xs-center">
                    <h1 class="text--secondary">No ads posted yet</h1>
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
    import BuyModal from '../components/Shared/BuyModal'
    export default {
      components: {
        BuyModal
      },
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
    .text{
        height: 40px;
        overflow: hidden;
    }
    .headline{
        height: 32px;
        overflow: hidden;
    }
</style>