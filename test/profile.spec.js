require('jsdom-global')
import { mount } from '@vue/test-utils'
import Profile from '@/pages/profile/index.vue'

import ProfileId from '@/pages/profile/_id.vue'

describe('Profile', () => {
    test('Is a vue instance', () => {
        const wrapper = mount(Profile)
        expect(wrapper.vm).toBeTruthy()
    });
});

describe('Profile:id', () => {
    test('Is a vue instance', () => {
        const wrapper = mount(ProfileId)
        expect(wrapper.vm).toBeTruthy()
    });
});