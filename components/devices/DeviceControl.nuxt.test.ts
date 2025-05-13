import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DeviceControl from "components/devices/DeviceControl.vue";

const createDevice = (overrides = {}) => ({
  id: 1,
  name: 'Lamp',
  status: 'on',
  brightness: 50,
  temperature: null,
  ...overrides,
})

describe('DeviceControl.vue', () => {
  it('renders power and brightness controls for light devices', () => {
    const wrapper = mount(DeviceControl, {
      props: {
        device: createDevice(),
        roomId: 101,
        updating: false,
      },
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('input[type="range"]').exists()).toBe(true)
  })

  it('renders temperature control for thermostat devices', () => {
    const wrapper = mount(DeviceControl, {
      props: {
        device: createDevice({ brightness: null, temperature: 22 }),
        roomId: 101,
        updating: false,
      },
    })

    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    expect(wrapper.find('input[type="range"]').exists()).toBe(false)
  })

  it('emits update when power toggle is changed', async () => {
    const wrapper = mount(DeviceControl, {
      props: {
        device: createDevice({ brightness: null }),
        roomId: 101,
      },
    })

    const toggle = wrapper.find('input[type="checkbox"]')
    await toggle.setValue(false)

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')![0][0]).toEqual({ status: 'off' })
  })

  it('emits update when brightness is changed', async () => {
    const wrapper = mount(DeviceControl, {
      props: {
        device: createDevice(),
        roomId: 101,
      },
    })

    const slider = wrapper.find('input[type="range"]')
    await slider.setValue(80)

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')![0][0]).toEqual({ brightness: 80 })
  })

  it('emits update when temperature is changed and clamps value', async () => {
    const wrapper = mount(DeviceControl, {
      props: {
        device: createDevice({ brightness: null, temperature: 22 }),
        roomId: 101,
      },
    })

    const input = wrapper.find('input[type="number"]')
    await input.setValue('50')

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')![0][0]).toEqual({ temperature: 40 })
  })

  it('disables inputs when updating is true', () => {
    const wrapper = mount(DeviceControl, {
      props: {
        device: createDevice(),
        roomId: 101,
        updating: true,
      },
    })

    expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('input[type="range"]').attributes('disabled')).toBeDefined()
  })
})
