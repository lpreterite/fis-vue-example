"use strict";

import '../common';
import Vue from 'vue';
import VueRouter from 'vue-router';
import route from './route';
import layout from './pages/common/layout';


Vue.config.delimiters = ['{%', '%}'];
Vue.config.debug = true;

Vue.use(require('vue-animated-list'));

//routes
Vue.use(VueRouter);
var router = new VueRouter();
router.map(route);

router.start({ components:{ layout } }, "#app");