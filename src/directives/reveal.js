const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
      )
    : null

// v-reveal: 元素进入视口时上浮淡入，可传数字控制延迟（毫秒）
export default {
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    if (binding.value) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    if (!observer) {
      el.classList.add('is-revealed')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
