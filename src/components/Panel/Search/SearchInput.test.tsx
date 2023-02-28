import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react'
import SearchInput from './SearchInput'
import { suggestionElement } from '../../../test/constants'
import { vi } from 'vitest'
import { MemoryRouter, RouterProvider } from 'react-router-dom'
import routes from '../../../routes'

describe('SearchInput', function () {
    const labelName: string = 'My Label Test'
    beforeEach(() => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/salary-to-distance']}>
                    <SearchInput
                        keyParam={'DEPARTURE'}
                        onValid={() => null}
                        placeholder={'test'}
                        beforeChildren={labelName}
                    />
                </MemoryRouter>
            )
        })
    })

    afterEach(cleanup)

    it('should contains label', function () {
        expect(screen.getByText(labelName)).not.toBeNull()
    })

    it('should contains input', function () {
        expect(
            document.querySelector<HTMLInputElement>('input')
        ).toBeInstanceOf(HTMLInputElement)
    })

    it('should input is type text', function () {
        expect(document.querySelector('input[type="text"]')).toBeInstanceOf(
            HTMLInputElement
        )
    })

    it('should input contains placeholder', function () {
        expect(screen.getByPlaceholderText('test')).toBeInstanceOf(
            HTMLInputElement
        )
    })

    it('should value change when input', async () => {
        const input: HTMLInputElement =
            screen.getByPlaceholderText<HTMLInputElement>('test')
        act(() => {
            fireEvent.change(input, {
                target: { value: 'this is a test' },
            })
        })
        expect(input.value).toBe('this is a test')
    })

    it('should open dropdown when change input', async function () {
        const input: HTMLInputElement =
            screen.getByPlaceholderText<HTMLInputElement>('test')
        const dropdown: HTMLDivElement | null =
            document.querySelector<HTMLDivElement>('.dropdown')
        if (dropdown) {
            await act(() => {
                fireEvent.change(input, {
                    target: { value: 'this is a test' },
                })
            })
            await waitFor(() => expect(dropdown).toHaveClass('dropdown-open'))
        }
    })

    it('should fill value and close dropdown when select', async function () {
        const input: HTMLInputElement =
            screen.getByPlaceholderText<HTMLInputElement>('test')
        const dropdown = document.querySelector('.dropdown')
        await act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
        })
        const dropdownEntry = screen.getByText(suggestionElement.text, {
            exact: true,
        })
        await act(() => {
            fireEvent.click(dropdownEntry)
        })
        await waitFor(() =>
            expect(input).toHaveValue(dropdownEntry.textContent)
        )
        await waitFor(() => expect(dropdown).not.toHaveClass('dropdown-open'))
    })

    it('should call onValid if location is fill', async function () {
        cleanup()
        const spy = vi.fn(() => null)
        render(
            <MemoryRouter initialEntries={['/salary-to-distance']}>
                <SearchInput
                    keyParam={'ARRIVAL'}
                    onValid={spy}
                    placeholder={'onValid test'}
                    beforeChildren={'My onValid test'}
                />
            </MemoryRouter>
        )
        const input: HTMLInputElement =
            screen.getByPlaceholderText<HTMLInputElement>('onValid test')
        const dropdown = document.querySelector('.dropdown')
        await act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
        })
        const dropdownEntry = screen.getByText(suggestionElement.text, {
            exact: true,
        })
        act(() => {
            fireEvent.click(dropdownEntry)
        })
        await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
    })
})
