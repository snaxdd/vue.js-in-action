'use strict';

import Vue from 'vue/dist/vue.min';

Vue.config.devtools = true;

var webstore = new Vue({
  el: '#app',
  data: {
    sitename: 'Vue.js Pet Depot',
    product: {
      id: 1001,
      title: 'Cat Food, 25lb bag',
      description: 'A 25 pound bag of <em>irresistible</em>,' +
        'organic goodness for your cat.',
      price: 2000,
      image: 'src/assets/images/product-fullsize.png'
    },
    cart: []
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
  methods: {
    addToCart: function () {
      this.cart.push(this.product.id);
    }
  },
  computed: {
    cartItemCount: function () {
      return this.cart.length || '';
    }
  }
});