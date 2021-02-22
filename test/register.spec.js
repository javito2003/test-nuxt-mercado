import {shallowMount} from '@vue/test-utils'
import Register from '@/pages/register.vue'
import flushPromises from 'flush-promises'

const $router = {
    replace: jest.fn()
}

describe('Register', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Register, {
            mocks: {
                $router
            },
            data(){
                return{
                    email: "1@2.com",
                    name: "Peron",
                    surname: "peronsurname",
                    password: "1234"
                }
            }
        })
    })    
    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('Sends to secret route if promise resolvers', async() => {
        wrapper.find("form").trigger("submit");
        // wrapper.vm.pressed();
        await flushPromises();
        expect($router.replace).lastCalledWith({ name: "secret" });
    });
});