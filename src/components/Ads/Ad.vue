<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <v-card v-if="!loading">
                    <v-img :src="ad.imageSrc"
                           height="300px"
                    >
                    </v-img>
                    <v-card-text>
                        <h1 class="text--primary mb-2">{{ad.title}}</h1>
                        <p class="text--secondary">{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <EditAdModal :ad="ad" v-if="isOwner"></EditAdModal>
                        <BuyModal :ad="ad"></BuyModal>
                    </v-card-actions>
                </v-card>
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import EditAdModal from './EditAdModal'
  import BuyModal from '../Shared/BuyModal'
  export default {
    components: {
      EditAdModal,
      BuyModal
    },
    props: ['id'],
    computed: {
      ad () {
        const id = this.id
        return this.$store.getters.adById(id)
      },
      loading () {
        return this.$store.getters.loading
      },
      isOwner () {
        if (this.$store.getters.user !== null) {
          return this.ad.ownerId === this.$store.getters.user.id
        }
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