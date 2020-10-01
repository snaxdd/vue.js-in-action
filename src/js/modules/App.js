'use strict';

import Vue from 'vue/dist/vue.min';
import axios from 'axios';

Vue.config.devtools = true;

var webstore = new Vue({
  el: '#app',
  data: {
    sitename: 'Vue.js Pet Depot',
    showProduct: true,
    products: [],
    cart: [],
    order: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
      state: '',
      method: 'Home Address',
      business: 'Business Address',
      home: 'Home Address',
      gift: 'Do Not Send As A Gift',
      sendGift: 'Send As A Gift',
      dontSendGift: 'Do Not Send As A Gift'
    },
    states: {
      AL: 'Alabama',
      AR: 'Arizona',
      CA: 'California',
      NV: 'Nevada'
    }
  },
  filters: {
    formatPrice: function (price) {
      if (!parseInt(price)) { return ''; }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split('').reverse();
        var index = 3;

        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ',');
          index += 4;
        }

        return '$' + priceArray.reverse().join('');
      } else {
        return '$' + (price / 100).toFixed(2);
      }
    }
  },
  created: function() {
    axios.get('../../../products.json')
      .then((responce) => {
        this.products = responce.data.products;
        console.log(this.products);
      });
  },
  methods: {
    addToCart: function () {
      this.cart.push(this.product.id);
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    submitForm() {
      alert('Submit');
    },
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    }
  },
  computed: {
    cartItemCount: function () {
      return this.cart.length || '';
    },
    canAddToCart: function() {
      return this.products.availableInventory > this.cartItemCount;
    }
  }
});

