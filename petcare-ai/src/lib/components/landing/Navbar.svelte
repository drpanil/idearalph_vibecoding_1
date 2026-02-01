<script lang="ts">
  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 md:h-18">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <span class="text-2xl">🐾</span>
        <span class="font-display font-bold text-xl text-text-primary">PetCare.ai</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#how-it-works" class="text-text-secondary hover:text-primary transition-colors">How It Works</a>
        <a href="#features" class="text-text-secondary hover:text-primary transition-colors">Features</a>
        <a href="#pricing" class="text-text-secondary hover:text-primary transition-colors">Pricing</a>
        <a href="/vet" class="text-text-secondary hover:text-primary transition-colors">For Vets</a>
        <a href="#cta" class="btn-primary text-sm py-2 px-6">Chat Now</a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 text-text-primary"
        onclick={toggleMenu}
        aria-label="Toggle menu"
      >
        {#if isMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="md:hidden py-4 border-t border-border">
        <div class="flex flex-col gap-4">
          <a href="#how-it-works" class="text-text-secondary hover:text-primary transition-colors" onclick={toggleMenu}>How It Works</a>
          <a href="#features" class="text-text-secondary hover:text-primary transition-colors" onclick={toggleMenu}>Features</a>
          <a href="#pricing" class="text-text-secondary hover:text-primary transition-colors" onclick={toggleMenu}>Pricing</a>
          <a href="/vet" class="text-text-secondary hover:text-primary transition-colors" onclick={toggleMenu}>For Vets</a>
          <a href="#cta" class="btn-primary text-center" onclick={toggleMenu}>Chat Now</a>
        </div>
      </div>
    {/if}
  </div>
</nav>
