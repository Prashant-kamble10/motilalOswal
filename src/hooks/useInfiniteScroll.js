import { useEffect } from "react";

export default function useInfiniteScroll(callback, hasMore, loading) {
  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && hasMore && !loading) {
        callback();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore, loading]);
}
