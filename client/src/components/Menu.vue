<template>
    <div id="menu">
        <v-app>
            <v-container>
            <v-row justify="center" >
                <v-col cols="12" sm="4">
        
                    <v-btn
                        block
                        color="primary"
                        class="ma-2"
                        v-if="$store.state.user.priviledge === 'Advisor'"
                        :to="{
                            name: 'newsale'
                        }"
                        >New Sale
                    </v-btn>
                    
                    <v-btn 
                        block
                        v-if="$store.state.user.priviledge != 'Advisor'"
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'blanks'
                        }"
                        >Blank Stock
                    </v-btn>
            
                     <!--v-if="!$store.state.user.priviledge === 'Advisor'"-->
                    <v-btn
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'transactions'
                        }"
                        >Transactions
                    </v-btn>

                    <v-btn
                        block
                        v-if="$store.state.user.priviledge === 'Manager'"
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'customers'
                        }"
                        >Customers
                    </v-btn>

                    <v-btn
                        v-if="$store.state.user.priviledge === 'Admin'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'users'
                        }"
                        >Users
                    </v-btn>

                    <v-btn
                        v-if="$store.state.user.priviledge === 'Manager'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'commission'
                        }"
                        >Commission
                    </v-btn>

                    <v-btn
                        block
                        color="primary"
                        class="ma-2"
                        @click="toggle = !toggle"
                        >Reports
                    </v-btn>

                    <v-btn
                        v-if="toggle && $store.state.user.priviledge === 'Manager'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'reportInterGl'
                        }"
                        >Global Inter Reports
                    </v-btn>

                    <v-btn
                        v-if="toggle && $store.state.user.priviledge === 'Manager'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'reportDomGl'
                        }"
                        >Global Domestic Reports
                    </v-btn>

                    <v-btn
                        v-if="toggle && $store.state.user.priviledge != 'Admin'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'reportInterInd'
                        }"
                        >Individual Inter Reports
                    </v-btn>

                    <v-btn
                        v-if="toggle && $store.state.user.priviledge != 'Admin'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'reportDomInd'
                        }"
                        >Individual Domestic Reports
                    </v-btn>

                    <v-btn
                        v-if="toggle && $store.state.user.priviledge === 'Admin'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'reportBlank'
                        }"
                        >Blank Stock reports
                    </v-btn>
                </v-col>
            </v-row>
            </v-container>
        </v-app>
    </div>
</template>


<script>
export default {
    components: {
    },
    data() {
        return {
            toggle: false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>