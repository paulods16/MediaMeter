<template>
  <div class="pa-4 mt-4">
    <v-card outlined>
      <v-btn @click="AddData()" absolute fab top right small color="primary">
        <v-icon>mdi-plus-thick</v-icon>
      </v-btn>

      <v-carousel hide-delimiters height="450">
        <v-carousel-item
          v-for="(item,i) in itemPics"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>

      
      <div class="ml-2" style="font-weight: 700; font-size: 18px">Users</div>

      <v-text-field v-model="search" label="Search" outlined dense style="width: 30%" hide-details class="ml-2"></v-text-field>
      <!-- {{AllData}} -->
      <v-simple-table fixed-header class="pa-2">
        <thead>
          <tr>
            <th style="text-align: center; background-color: #a8a9ad;">First Name</th>
            <th style="text-align: center; background-color: #a8a9ad;">Last Name</th>
            <th style="text-align: center; background-color: #a8a9ad;">Account Type</th>
            <th style="text-align: center; background-color: #a8a9ad;">Username</th>
            <th style="text-align: center; background-color: #a8a9ad;">Password</th>
            <th style="text-align: center; background-color: #a8a9ad;">Physical Address</th>
            <th style="text-align: center; background-color: #a8a9ad;">Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in AllData" :key="index" style="text-align: center;" @dblclick="UpdateUser(item)">
            <td>{{item.Firstname}}</td>
            <td>{{item.Lastname}}</td>
            <td>{{item.AccountType}}</td>
            <td>{{item.Username}}</td>
            <td>*****</td>
            <td>{{item.PhysicalAddress}}</td>
            <td>
              <v-btn fab x-small @click="SoftDelete(item)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <a-tooltip placement="left">
          <template #title>
              <span>Recycle Bin</span>
          </template>
              <v-btn
                  fab
                  right
                  fixed
                  large
                  class="elevation-8"
                  color="yellow darken-2"
                  elevation="6"
                  @click="recycleDialog = true"
                  style="position:fixed; bottom:20px; right:17px; background-color:#e19e1e; color:#FFF; text-align: center;"
              >
                  <v-icon color="black"> mdi-recycle </v-icon>
              </v-btn>
      </a-tooltip>
    </v-card>

    <!-- Add and Update --> 
    <v-dialog v-model="formDialog" width="450px">
      <v-card>
        <v-card-title style="color: white; height: 35px; background-color: #1d73e2;">
          <div class="mt-n4">
              <span v-if="userAction == 'ADD'"
                style="font-family: impact;
                font-size: 19px;
                color: white;">
                Add Data
              </span>

              <span v-if="userAction == 'UPDATE'"
                style="font-family: impact;
                font-size: 19px;
                color: white;">
                Update Data
              </span>
          </div>
          <v-spacer></v-spacer>
          <v-icon class="mt-n3" @click="formDialog = false" color="white">mdi-close-thick</v-icon>
        </v-card-title>
        
        <div class="pa-2">
          <v-text-field v-model="toAdd.Firstname" outlined dense label="First Name" hide-details autocomplete="off" class="my-2"></v-text-field>
          <v-text-field v-model="toAdd.Lastname" outlined dense label="Last Name" hide-details autocomplete="off" class="my-2"></v-text-field>
          <v-autocomplete v-model="toAdd.AccountType" outlined dense label="Accout Type" hide-details :items="accTypeItems" autocomplete="off" class="my-2"></v-autocomplete>
          <v-row no-gutters class="my-2">
            <v-col cols="6">
              <v-text-field v-model="toAdd.Username" outlined dense label="Username" hide-details autocomplete="off" class="mr-1"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="toAdd.Password" outlined dense label="Password" hide-details autocomplete="off" class="ml-1"></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="toAdd.PhysicalAddress" outlined dense label="Physical Address" hide-details autocomplete="off" class="my-2"></v-text-field>

          <v-btn @click="Save()" block color="primary" v-if="userAction == 'ADD'">Save</v-btn>
          <v-btn @click="Update()" block color="primary" v-if="userAction == 'UPDATE'">Update</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="recycleDialog" max-width="730px">
      <v-card>
          <v-card-title style="color: white; height: 35px; background-color: #e19e1e;">
              <div class="mt-n4">
                  <span
                      style="font-family: impact;
                      font-size: 19px;
                      color: black;">
                      Recycle Bin
                  </span>
              </div>
              <v-spacer></v-spacer>
              <v-icon class="mt-n3" @click="recycleDialog = false">mdi-close-thick</v-icon>
          </v-card-title>

          <template>
              <v-row no-gutters>
                  <v-col cols="8">
                      <div class="ml-4 mt-2" style="font-family: impact; font-size: 15px; color: black;">Total Deleted : {{allDeleted.length}}</div>
                  </v-col>
                  <v-col cols="4">
                      <!-- <div class="mt-2"> 
                      <a-button type="primary" size="small">Restore all</a-button>
                      <a-button type="danger" size="small" @click="deleteAll()">Delete all</a-button>
                      </div> -->
                  </v-col>
              </v-row>
              
              <div style="height: 470px;" class="px-4">
                  <v-simple-table
                      height="450px"
                      fixed-header
                      class="elevation-3 table-bordered mt-2"
                      style="border: 1px solid rgba(70, 70, 70, 0.4); width: 100%;">
                      <template v-slot:default>
                          <thead>
                              <tr>
                                  <th style="text-align: center; background-color: #434343; color: white;">Full Name</th>
                                  <th style="text-align: center; background-color: #434343; color: white;">Delete Reason</th>
                                  <th style="text-align: center; background-color: #434343; color: white;">Deleted By</th>
                                  <th style="text-align: center; background-color: #434343; color: white;">Deleted Date</th>
                                  <th style="text-align: center; background-color: #434343; color: white;">Actions</th>
                              </tr>
                          </thead>

                          <tbody>
                            <tr v-for="(item,index) in allDeleted" :key="index">
                              <td style="text-align: center;">
                                  <span>{{ item.Firstname }}&nbsp;{{ item.Lastname }}</span>
                              </td>
                              <td>
                                {{ item.DeleteReason }}
                              </td>
                              <td>
                                {{ item.UpdatedBy }}
                              </td>
                              <td>
                                {{ item.DeletedDate }}
                              </td>
                              <td>
                                <a-tooltip placement="bottom">
                                  <template #title>
                                      <span>Restore</span>
                                  </template>
                                      <v-icon color="green" style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" @click="singleRestore(item)">mdi-recycle</v-icon>
                                </a-tooltip>

                                <a-tooltip placement="bottom">
                                  <template #title>
                                      <span>Permanent Delete</span>
                                  </template>
                                      <v-icon color="red" style="text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" @click="singleDel(item)">mdi-trash-can</v-icon>
                                </a-tooltip>
                              </td>
                            </tr>
                          </tbody>

                          
                      </template>
                  </v-simple-table>
              </div>
          </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="toDeleteDialog" persistent width="400px">
      <v-card>
          <v-card-title style="color: white; height: 35px; background-color: #e19e1e;">
              <div class="mt-n4">
                  <span 
                      style="font-family: impact;
                      font-size: 19px;
                      color: black;">
                      Delete Record
                  </span>
              </div>
              <v-spacer></v-spacer>
              <div style="margin-top: -17px">
                  
                  <v-icon @click="closeDel()">mdi-close-thick</v-icon>
              </div>
          </v-card-title>
          <div>
              
              <v-row no-gutters>
                  <v-col>
                      <v-textarea v-model="toAdd.DisposedReason" outlined dense class="ma-1" label="Reason" filled color="black" no-resize hide-details rows="5" autocomplete="off"></v-textarea>
                  </v-col>
              </v-row>
              <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-1 title-btn" fill color="#55d42b" height="28px" @click="saveSoftDelete()" style="text-transform: capitalize;">
                      <v-icon>mdi-content-save</v-icon>Save
                  </v-btn>
              </v-row>
          </div> 
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import shortid from "shortid";
import moment from 'moment'
export default {
  data() {
    return {
      toDeleteDialog: false,
      allDeleted: [
        {Firstname: 'Test', Lastname: 'Test Lastname', DeleteReason: 'Reason test', UpdatedBy: 'Paulo', DeletedDate: '2022-01-10'}
      ],
      recycleDialog: false,
      AllData: [
        {Firstname: 'Paulo', Lastname: 'Delos Santos', AccountType: 'Admin', Username: 'Paul', Password: '*****', PhysicalAddress: 'Caloocan'}
      ],
      search: '',
      formDialog: false,
      userAction: '',
      toAdd: {},
      accTypeItems: [
        'Admin',
        'User'
      ],
      itemPics: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],


      

    }
  },//end of data
  created() {
      this.onload()
      
  },//End of Created
  watch: {
    recycleDialog(val){
      if(val){
          this.getAllDeleted()
      }
    },
  },//End of watch
  computed:{

  },
  methods: {
    closeDel(){
      this.toDeleteDialog = false
    },
    saveSoftDelete(){
      this.toAdd.DeletedDate = moment().format("YYYY-MM-DD hh:mm:ss");
      this.toAdd.UpdatedBy = 'TEST'

      axios.post(`${this.api}DeleteData`, this.toAdd).then(() => {
        // console.log(item)
        this.onload()
      })
    },
    SoftDelete(item){
      this.toDeleteDialog = true
      this.toAdd = item
    },
    singleRestore(item){
      axios.post(`${this.api}single_restore`, item).then(()=>{
        this.recycleDialog = false
        this.onload()
      })
    },
    getAllDeleted(){
      axios.get(`${this.api}getToRestoreData`).then((res) => {
        this.allDeleted = res.data
      })
    },
    onload(){
      axios.get(`${this.api}getAllData`).then((res) => {
        this.AllData = res.data
        // .filter(r => {
        //   return r.DeletedDate == null
        // })
      });
    },
    AddData(){
      this.userAction = 'ADD'
      this.formDialog = true
      this.toAdd = {}
    },
    Save(){
      this.toAdd.UserCode = shortid.generate();

      axios.post(`${this.api}insertUser`, this.toAdd).then(() => {
        console.log(this.toAdd)
      })
      this.formDialog = false
      this.toAdd = {}
      this.onload()
    },
    UpdateUser(item){
      this.userAction = 'UPDATE'
      this.formDialog = true
      this.toAdd = item
      console.log(item)
    },
    Update(){
      axios.post(`${this.api}updateUserInfo`, this.toAdd).then(() => {
        console.log(this.toAdd)
      })
      this.formDialog = false
      this.onload()
    },
    
      
  },//end of methods
}
</script>

<style scoped>
/* th {
  background-color: #a8a9ad;
  text-align: center;
} */
</style>