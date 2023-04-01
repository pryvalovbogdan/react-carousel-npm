import { renderHook } from '@testing-library/react-hooks';
import { useResize } from '../src/hooks/useResize';

describe('useResize', () => {
  it('should update the selected value when the width changes', () => {
    const ref = { current: { offsetWidth: 1000 } };
    const setSelected = jest.fn();
    const cardWidth = 200;

    const { rerender } = renderHook(({ ref, setSelected, cardWidth }) => useResize({ ref, setSelected, cardWidth }), {
      initialProps: { ref, setSelected, cardWidth },
    });

    expect(setSelected).toHaveBeenCalledWith(5);

    // simulate a resize event by changing the offsetWidth of the ref
    ref.current.offsetWidth = 800;
    rerender({ ref, setSelected, cardWidth });

    expect(setSelected).toHaveBeenCalledWith(5);
  });

  it('should not update the selected value when the width is zero', () => {
    const ref = { current: { offsetWidth: 0 } };
    const setSelected = jest.fn();
    const cardWidth = 200;

    renderHook(() => useResize({ ref, setSelected, cardWidth }));

    expect(setSelected).not.toHaveBeenCalled();
  });
});
