<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>PetCare.ai - Your Pet's Health, One Message Away</title>
  <meta name="description" content="AI-powered pet health triage via WhatsApp. Get instant diagnosis and connect to verified vets in 2 minutes." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Open Graph -->
  <meta property="og:title" content="PetCare.ai - Your Pet's Health, One Message Away" />
  <meta property="og:description" content="AI-powered pet health triage via WhatsApp. Get instant diagnosis and connect to verified vets in 2 minutes." />
  <meta property="og:type" content="website" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" />
</svelte:head>

{@render children()}
