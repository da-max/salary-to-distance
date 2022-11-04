import { act, fireEvent, render, screen } from '@testing-library/react'
import SearchDropdown from './SearchDropdown'
import { vi } from 'vitest'
import { ISuggestion } from '../../hook/useSearch'

describe('SearchDropdown', function () {
    it('should contains dropdown', function () {
        render(
            <SearchDropdown
                onSelect={() => null}
                suggestions={[
                    {
                        text: 'Test',
                        magicKey: 'test',
                        isCollection: false,
                    },
                ]}
                open={false}
            />
        )
        expect(document.querySelector('.dropdown')).toBeInstanceOf(
            HTMLDivElement
        )
    })

    it('should be open when props open true', function () {
        render(
            <SearchDropdown
                onSelect={() => null}
                suggestions={[
                    {
                        text: 'Test',
                        magicKey: 'test',
                        isCollection: false,
                    },
                ]}
                open={true}
            />
        )
        expect(document.querySelector('.dropdown-open')).toBeInstanceOf(
            HTMLDivElement
        )
    })

    it('should be close when props open false', function () {
        render(
            <SearchDropdown
                onSelect={() => null}
                suggestions={[
                    {
                        text: 'Test',
                        magicKey: 'test',
                        isCollection: false,
                    },
                ]}
                open={false}
            />
        )
        expect(document.querySelector('.dropdown-open')).toBeNull()
    })

    it('should contains suggest text', function () {
        render(
            <SearchDropdown
                onSelect={() => null}
                suggestions={[
                    {
                        text: 'Test',
                        magicKey: 'test',
                        isCollection: false,
                    },
                ]}
                open={false}
            />
        )
        expect(screen.getByText('Test')).toBeInstanceOf(HTMLAnchorElement)
    })
    it('should onSelect call when item is clicked', function () {
        const onSelect = vi.fn((s: ISuggestion) => null)
        render(
            <SearchDropdown
                onSelect={onSelect}
                suggestions={[
                    {
                        text: 'Test',
                        magicKey: 'test',
                        isCollection: false,
                    },
                ]}
                open={true}
            />
        )
        const item = screen.getByText('Test')
        act(() => {
            fireEvent.click(item)
        })
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith<[ISuggestion]>({
            text: 'Test',
            magicKey: 'test',
            isCollection: false,
        })
    })
})
