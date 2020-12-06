/*import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const swrOptions = { suspense: false, dedupingInterval: 0 };

const TestingWrapper = ({ children }) => {
  return (
    <SWRConfig {...swrOptions}>
      <Router>
        {children}
      </Router>
    </SWRConfig>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: TestingWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }*/
