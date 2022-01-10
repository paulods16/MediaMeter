<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      dark
      color="blue-grey darken-2"
      app
    >
      <v-list shaped dense>
        <template v-for="item in drawerItems">
          <v-list-group v-if="item.children" :key="item.text" v-model="item.model">
            <!-- Main Item with Dropdown -->
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <!-- Main Item with Dropdown Child -->
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              @click="visitPage(child.name)"
            >
              <v-list-item-action>
                <v-icon></v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <!-- Main Item only -->
          <v-list-item v-else :key="item.text" link @click="visitPage(item.name)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <!-- Footer -->
      <v-footer padless fixed min-height="10">
        <v-container>
          <span class="ma-2" style="font-size: 12px"> v1.0.0</span>
        </v-container>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue-grey darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title class="m1-0 pl-4" style="width: 300px">
        <span class="hidden-sm-and-down"
          ><i>Paulo Delos Santos Exam</i></span
        >
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    menu: false,
    drawer: false,

    drawerItems: [
      {
        icon: "mdi-home",
        text: "Home",
        name: "Home",
      },


     
    ],
  }),

  methods: {
    visitPage(page) {
      this.$router.push(page).catch(() => {});
    },
  },
};
</script>
