<script lang="ts">
  import Hero from '$lib/components/landing/Hero.svelte';
  import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
  import Features from '$lib/components/landing/Features.svelte';
  import Testimonials from '$lib/components/landing/Testimonials.svelte';
  import Pricing from '$lib/components/landing/Pricing.svelte';
  import CTA from '$lib/components/landing/CTA.svelte';
  import Footer from '$lib/components/landing/Footer.svelte';
  import Navbar from '$lib/components/landing/Navbar.svelte';
</script>

<div class="min-h-screen bg-background">
  <Navbar />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
    <Testimonials />
    <Pricing />
    <CTA />
  </main>
  <Footer />
</div>
