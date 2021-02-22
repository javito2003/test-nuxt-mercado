require('jsdom-global')
import { mount } from '@vue/test-utils'
import Market from '@/pages/market/index.vue'

describe('Market', () => {
    test('Is a vue instance', () => {
        const wrapper = mount(Market)
        expect(wrapper.vm).toBeTruthy()
    });
});