<template>
    <v-dialog max-width="500px" width="100%" v-model="modal">
        <v-btn color="primary" slot="activator">Buy</v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">Confirm your order</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    name="name"
                                    label="Your name"
                                    type="text"
                                    v-model="name"
                            >
                            </v-text-field>
                            <v-text-field
                                    name="phone"
                                    label="Your phone"
                                    type="text"
                                    v-model="phone"
                            >
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    class="warning"
                                    @click="onCancel"
                                    :disabled="localLoading"
                            >Cancel
                            </v-btn>
                            <v-btn
                                    class="primary"
                                    @click="onCheckout"
                                    :disabled="localLoading"
                                    :loading="localLoading"
                            >Checkout
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['ad'],
    data () {
      return {
        modal: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      onCancel () {
        this.name = ''
        this.phone = ''
        this.modal = false
      },
      onCheckout () {
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
            .finally(() => {
              this.name = ''
              this.phone = ''
              this.localLoading = false
              this.modal = false
            })
        }
      }
    }
  }
</script>