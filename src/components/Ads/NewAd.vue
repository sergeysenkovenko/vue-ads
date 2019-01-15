<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form ref="form" v-model="valid" validation class="mb-3">
                    <v-text-field
                            name="title"
                            label="Ad title"
                            type="text"
                            v-model="title"
                            :rules="reqRules"
                    >
                    </v-text-field>
                    <v-textarea
                            name="description"
                            label="Ad description"
                            type="text"
                            v-model="description"
                            no-resize
                            :rules="reqRules"
                    >
                    </v-textarea>
                </v-form>
                <v-layout>
                    <v-flex xs12>
                        <v-btn
                                class="warning"
                        >
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row mt-3>
                    <v-flex xs12>
                        <img src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg" alt="" height="150">
                    </v-flex>
                </v-layout>

                <v-layout row mt-3>
                    <v-flex xs12>
                        <v-switch
                                label="Add to promo?"
                                v-model="promo"
                                color="primary"
                        ></v-switch>
                    </v-flex>
                </v-layout>

                <v-layout row mt-3>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                                class="primary"
                                :disabled="!valid"
                                @click="createAd"
                        >Create new ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        title: '',
        description: '',
        promo: false,
        reqRules: [
          v => !!v || 'Description is required'
        ]
      }
    },
    methods: {
      createAd () {
        if (this.$refs.form.validate()) {
          const ad = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            imgSrc: 'https://proglib.io/wp-content/uploads/2018/07/1_qnI8K0Udjw4lciWDED4HGw.png'
          }

          this.$store.dispatch('createAd', ad)
        }
      }
    }
  }
</script>