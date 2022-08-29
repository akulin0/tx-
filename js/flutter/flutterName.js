
import Vue from 'vue';
/^(.).*(.)$/
Vue.filter('mobile', (v = '') => v.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2'));
Vue.filter('idcard', (v = '') => v.replace(/^(\d{4})\d*([\dxX]{4})$/, '$1**********$2'));
Vue.filter('addressNo', (v = '') => v.replace(/^(.{4}).*(.{4})$/, '$1****$2'));
Vue.filter('remark', (v = '') => v.replace(/^(.{2}).*$/, '$1***'));
