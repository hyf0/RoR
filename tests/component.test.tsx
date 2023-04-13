import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '~/src/App'

describe(`App.tsx`, () => {
  it('should mounted without errors', async () => {
    // ARRANGE
    const result = render(<App />)

    // ACT
    // noop

    // ASSERT
    expect(result.baseElement).toMatchSnapshot()
  })
})
