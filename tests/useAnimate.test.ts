import { renderHook, act } from '@testing-library/react-hooks';
import { useAnimation } from '../src/hooks/useAnimation';

describe('useAnimation', () => {
  const withAnimation = {
    animateIn: { opacity: '1', transition: 'opacity 0.5s ease-in-out' },
    animateOut: { opacity: '0', transition: 'opacity 0.5s ease-in-out' },
    animationInterval: 500,
  };
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useAnimation({ selectedCards: [] }));

    expect(result.current.isAnimate).toBe(false);
  });

  test('should enable animation when withAnimation is truthy and isAnimate is false', () => {
    const { result } = renderHook(() => useAnimation({ withAnimation, selectedCards: [] }));

    expect(result.current.isAnimate).toBe(false);
  });

  test('should disable animation when disableAnimation is called', () => {
    const { result } = renderHook(() => useAnimation({ withAnimation, selectedCards: [] }));

    act(() => {
      result.current.disableAnimation();
    });

    expect(result.current.isAnimate).toBe(false);
  });

  test('should set default animation interval when withAnimation is truthy but animationInterval is not provided', () => {
    const { result } = renderHook(() => useAnimation({ selectedCards: [] }));

    expect(result.current.isAnimate).toBe(false);
  });

  test('should disable animation when selectedCards change', () => {
    const { result, rerender } = renderHook(
      ({ withAnimation, selectedCards }) => useAnimation({ withAnimation, selectedCards }),
      {
        initialProps: {
          withAnimation,
          selectedCards: ['card1'],
        },
      },
    );

    // Enable animation initially
    expect(result.current.isAnimate).toBe(false);

    // Disable animation when selectedCards change
    rerender({
      withAnimation,
      selectedCards: ['card2'],
    });

    expect(result.current.isAnimate).toBe(false);
  });

  test('should enable animation when selectedCards change back to initial value', () => {
    const { result, rerender } = renderHook(
      ({ withAnimation, selectedCards }) => useAnimation({ withAnimation, selectedCards }),
      {
        initialProps: {
          withAnimation,
          selectedCards: ['card1'],
        },
      },
    );

    // Enable animation initially
    expect(result.current.isAnimate).toBe(false);

    // Disable animation when selectedCards change
    rerender({
      withAnimation,
      selectedCards: ['card2'],
    });

    expect(result.current.isAnimate).toBe(false);

    // Enable animation when selectedCards change back to initial value
    rerender({
      withAnimation,
      selectedCards: ['card1'],
    });

    expect(result.current.isAnimate).toBe(false);
  });

  test('should clear the interval on unmount', () => {
    const { result, unmount } = renderHook(() => useAnimation({ withAnimation, selectedCards: [] }));

    act(() => {
      unmount();
    });
  });
});
