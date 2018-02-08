<template>
  <div id="app">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Web3
          </h1>

          <div v-if="web3">
            <h2 class="subtitle">
              connected
            </h2>
            <div v-if="accounts.length > 0">
              <p>Accounts:</p>
              <p v-for="(account, index) in accounts">
                Address: {{ account.address }}&nbsp;
                Balance: {{ account.balance }}<br>
              </p>
            </div>
          </div>

          <div v-else>
            <h2 class="subtitle">
              not connected
            </h2>
            <div class="field has-addons">
              <div class="control">
                <input class="input" v-model="host" placeholder="Please enter ethereum host">
              </div>
              <div class="control">
                <button class="button" v-on:click="connect">Connect</button>
              </div>
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

          <div v-if="web3 && tokenAddress && tokenContract">
            <h2 class="subtitle">
              funtoken address: {{ tokenAddress }}
            </h2>

            <div class="field has-addons">
              <div class="control">
                <input class="input" v-model="userAddress" placeholder="Please enter user address">
                <p>User token balance: {{ userBalance }}</p>
              </div>

              <div class="control">
                <button class="button" v-on:click="getBalanceOf(userAddress)">Get balance</button>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="input" v-model="allowanceAddressFrom" placeholder="Please enter allowance address from">
                <input class="input" v-model="allowanceAddressTo" placeholder="Please enter allowance address to">
                <p>Allowance[{{ allowanceAddressFrom }}][{{ allowanceAddressTo }}]: {{ allowance }}</p>
              </div>

              <div class="control">
                <button class="button" v-on:click="getAllowance(allowanceAddressFrom, allowanceAddressTo)">Get allowance</button>
              </div>
            </div>
          </div>

          <div v-else-if="web3">
            <h2 class="subtitle">
              deploy fun token on ganache-cli
            </h2>
            <div class="field has-addons">
              <div class="control">
                <!-- due to always return out of gas, just enter the address -->
                <!-- <button class="button" v-on:click="deployFunToken">Deploy</button> -->
                <input class="input" v-model="tokenAddress" placeholder="Please enter funtoken address">
                <button class="button" v-on:click="checkFunToken">Check</button>
              </div>
            </div>
          </div>

          <div v-else>
            <h2 class="subtitle">
              connect to web3 first
            </h2>
          </div>
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
      tokenContract: null,
      tokenBytecode: '',
      airDropAbi: [],
      airDropAddress: '',
      airDropContract: null,
      airdropBytecode: '',
      isAlert: false,
      alertMsg: '',
      alertClass: '',
      accounts: [],
      userAddress: '',
      userBalance: 0,
      allowanceAddressFrom: '',
      allowanceAddressTo: '',
      allowance: 0,
    }
  },
  created () {
    const FunTokenContract = require('./contracts/FunToken.json')
    const AirDropContract = require('./contracts/AirDrop.json')

    this.tokenAbi = FunTokenContract.abi
    this.tokenBytecode = FunTokenContract.bytecode
    this.airDropAbi = AirDropContract.abi
    this.airDropBytecode = AirDropContract.bytecode
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
        this.accounts = accounts.map(function (account) {
          return {
            address: account,
            balance: 0
          }
        })
        this.accounts.forEach(function (account, index) {
          this.getBalance(index)
        }.bind(this))
      }.bind(this))
    },
    getBalance (key) {
      let address = this.accounts[key].address || ''

      this.web3.eth.getBalance(address, function (err, balance) {
        if (err) {
          this.alert(err.message, 'is-danger')
          return
        }
        this.accounts[key].balance = balance
      }.bind(this))
    },
    alert (alertMsg, alertClass) {
      this.isAlert = true
      this.alertMsg = alertMsg
      this.alertClass = alertClass
    },
    closeAlert () {
      this.isAlert = false
    },
    // deployFunToken () {
    //   const estimateGas = this.web3.eth.estimateGas({ data: this.tokenBytecode })

    //   try {
    //     let contract = this.web3.eth.contract(this.tokenAbi).new(10000, 'Fun Token', 1, 'FT', { from: this.accounts[0].address, gasLimit: estimateGas })
    //   } catch (err) {
    //     this.alert(err.message, 'is-danger')
    //   }
    // },
    checkFunToken () {
      try {
        const tokenContract = this.web3.eth.contract(this.tokenAbi).at(this.tokenAddress)

        this.tokenContract = tokenContract
      } catch (err) {
        this.alert(err.message, 'is-danger')
      }
    },
    getBalanceOf (address) {
      try {
        const userBalance = this.tokenContract.balanceOf(address)

        this.userBalance = userBalance
      } catch (err) {
        this.alert(err.message, 'is-danger')
      }
    },
    getAllowance (addressFrom, addressTo) {
      try {
        const allowance = this.tokenContract.allowance.call(addressFrom, addressTo)

        this.allowance = allowance
      } catch (err) {
        this.alert(err.message, 'is-danger')
      }
    }
  }
}
</script>
