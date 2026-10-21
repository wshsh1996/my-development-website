<template>
  <div class="ambient" aria-hidden="true">
    <div class="ambient__grid"></div>
    <div class="ambient__beam"></div>
    <span class="ambient__orb ambient__orb--indigo"></span>
    <span class="ambient__orb ambient__orb--cyan"></span>
    <span class="ambient__orb ambient__orb--violet"></span>
    <div class="ambient__vignette"></div>
  </div>
</template>

<style scoped>
.ambient {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.ambient__grid {
  position: absolute;
  inset: -1px;
  background-image:
    linear-gradient(rgba(123, 146, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 146, 255, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse 78% 62% at 50% 0%, #000 12%, transparent 82%);
  mask-image: radial-gradient(ellipse 78% 62% at 50% 0%, #000 12%, transparent 82%);
  opacity: 0.7;
}

.ambient__beam {
  position: absolute;
  top: -420px;
  left: 50%;
  width: 900px;
  height: 720px;
  transform: translateX(-50%);
  background: conic-gradient(
    from 180deg at 50% 50%,
    transparent 0deg,
    rgba(99, 102, 241, 0.22) 60deg,
    rgba(34, 211, 238, 0.16) 120deg,
    transparent 200deg
  );
  filter: blur(60px);
  opacity: 0.7;
}

.ambient__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
  will-change: transform;
}

.ambient__orb--indigo {
  top: 8%;
  left: -140px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.55), transparent 68%);
  animation: drift-a 22s ease-in-out infinite;
}

.ambient__orb--cyan {
  top: 32%;
  right: -180px;
  width: 460px;
  height: 460px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 68%);
  animation: drift-b 26s ease-in-out infinite;
}

.ambient__orb--violet {
  bottom: -220px;
  left: 32%;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.32), transparent 70%);
  animation: drift-a 30s ease-in-out infinite reverse;
}

.ambient__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 120% 90% at 50% 40%, transparent 40%, rgba(3, 5, 12, 0.65) 100%);
}

@keyframes drift-a {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(60px, 40px, 0) scale(1.08);
  }
}

@keyframes drift-b {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-70px, -30px, 0) scale(1.05);
  }
}

@media (max-width: 768px) {
  .ambient__beam {
    width: 620px;
    height: 520px;
  }
}
</style>
