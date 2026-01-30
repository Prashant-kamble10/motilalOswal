import { useEffect, useRef } from "react";

export default function useInfiniteScroll(callback, hasMore, loading) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          callback();
        }
      },
      {
        rootMargin: "200px", 
        threshold: 0.01,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [callback, hasMore, loading]);

  return observerTarget;
}
