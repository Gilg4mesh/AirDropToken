<template>
  <div id="app">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Web3
          </h1>
          <div  v-if="web3">
            <h2 class="subtitle">
              connected
            </h2>
            <div v-if="accounts.length > 0">
              <p>Accounts:</p>
              <p v-html="accounts.join('<br>')"></p>
            </div>
          </div>
          <div v-else>
            <h2 class="subtitle">
              not connected
            </h2>
            <div>
              <input v-model="host" placeholder="Please enter ethereum host">
              <button class="button" v-on:click="connect">Connect</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Token application
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>

    <section class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            AirDrop application
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>

    <div class="modal" v-bind:class="{ 'is-active': isAlert }">
      <div class="modal-card" v-bind:class="alertClass">
        <header class="modal-card-head">
          <p class="modal-card-title">Yo Alert</p>
          <button class="delete" aria-label="close" v-on:click="closeAlert"></button>
        </header>
        <section class="modal-card-body">
          {{ alertMsg }}
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import config from './config'
import Web3 from 'web3'

export default {
  name: 'app',
  data () {
    return {
      web3: null,
      host: 'http://localhost:8545',
      tokenAbi: [],
      tokenAddress: '',
      tokenContract: {},
      airDropAbi: [],
      airDropAddress: '',
      AirDropContract: {},
      isAlert: false,
      alertMsg: '',
      alertClass: '',
      accounts: []
    }
  },
  created () {
    const FunTokenContract = require('./contracts/FunToken.json')
    const AirDropContract = require('./contracts/AirDrop.json')

    this.tokenAbi = FunTokenContract.abi
    this.airDropAbi = AirDropContract.abi
  },
  methods: {
    connect () {
      if (this.host && this.host === 'http://localhost:8545') {
        try {
          this.web3 = new Web3(new Web3.providers.HttpProvider(this.host))
          this.getAccounts()
          this.alert('Web3 is connected, start to get accounts on ganache-cli', 'is-danger')
        } catch (err) {
          this.alert(err.message, 'is-danger')
        }
      } else {
        this.alert('Sorry, we only support localhost in demo version', 'is-danger')
      }
    },
    getAccounts () {
      this.web3.eth.getAccounts(function (err, accounts) {
        if (err) {
          this.alert(err.message, 'is-danger')
          return
        }
        this.accounts = accounts
      }.bind(this))
    },
    alert (alertMsg, alertClass) {
      this.isAlert = true
      this.alertMsg = alertMsg
      this.alertClass = alertClass
    },
    closeAlert () {
      this.isAlert = false
    }
  }
}
</script>
