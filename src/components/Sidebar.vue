<template>
    <div>
        <!-- <v-card height="350px"> -->
        <v-navigation-drawer absolute permanent left>
            <template v-slot:prepend>
                <v-card height="150px" class="mx-auto">
                    <!-- <v-list-item two-line> -->
                    <v-row align="center" justify="center" class="mx-auto">
                        <v-col cols="12" sm="8" md="4">
                            <v-list-item-avatar>
                                <img src="https://randomuser.me/api/portraits/women/81.jpg">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>Jane Smith</v-list-item-title>
                                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                            </v-list-item-content>
                            <!-- </v-list-item> -->
                        </v-col>
                    </v-row>
                </v-card>
            </template>

            <v-divider></v-divider>

            <!-- <v-list dense> -->
            <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!-- </v-list> -->
        </v-navigation-drawer>
        <!-- </v-card> -->
    </div>
</template>

<script>
    export default {
        name: "sidebar",
        data() {
            return {
                items: [{
                        title: "Dashboard",
                        icon: "dashboard"
                    },
                    {
                        title: "Schedules",
                        icon: "schedule"
                    },
                    {
                        title: "Clients",
                        icon: "mdi-account-group-outline"
                    }
                ]
            };
        }
    };
</script>